using AEL.API.DATA;
using AEL.API.Domain;
using AEL.API.DTOMODEL;
using AEL.API.Repositories;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace AEL.API.Controllers
{
    [Route("api/book")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly TestApplicationDbContext _context;
        private readonly IBookRepository _bookRepository;
        private readonly IMapper _mapper;

        public BooksController(TestApplicationDbContext context, IBookRepository bookRepository, IMapper mapper)
        {
            this._context = context;
            this._bookRepository = bookRepository;
            this._mapper = mapper;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllBook()
        {
            // from database 
            var bookDomain = await _bookRepository.GetAllAsync();
            var bookDTO = _mapper.Map<List<BookDTO>>(bookDomain);
            return Ok(bookDTO);

        }

        [HttpGet]
        [Route("{id:int}")]
        public async Task<IActionResult> GetByBookId([FromRoute] int id)
        {

            var model = await _bookRepository.GetByIdAsync(id);
            if (model == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<BookDTO>(model));
        }

        [HttpPost]
        public async Task<IActionResult> CreateBookion([FromBody] BookDTO creatDto)
        {
            if (ModelState.IsValid)
            {
                var bookDomainModel = _mapper.Map<Book>(creatDto);
                bookDomainModel = await _bookRepository.CreateAsync(bookDomainModel);
                var bookDTO = _mapper.Map<BookDTO>(bookDomainModel);
                return CreatedAtAction(nameof(GetByBookId), new { id = bookDTO.Id }, bookDTO);
            }
            else
            {
                return BadRequest(ModelState);
            }
        }

        [HttpPut]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateBook([FromRoute] int id, [FromBody] BookDTO updatebookDTO)
        {
            var bookDomainModel = _mapper.Map<Book>(updatebookDTO);
            bookDomainModel = await _bookRepository.UpdateAync(id, bookDomainModel);
            if (bookDomainModel == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<BookDTO>(bookDomainModel));
        }
        [HttpDelete]
        [Route("{id:int}")]
        public async Task<IActionResult> UpdateBook([FromRoute] int id)
        {
            var bookDomainModel = await _bookRepository.DeleteAsync(id);
            if (bookDomainModel == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<BookDTO>(bookDomainModel));
        }
    }
}
