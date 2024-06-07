using AEL.API.DATA;
using AEL.API.Domain;
using Microsoft.EntityFrameworkCore;

namespace AEL.API.Repositories
{
    public class BookRepository : IBookRepository   
    {
        private readonly TestApplicationDbContext _context;

        public BookRepository(TestApplicationDbContext context)
        {

            this._context = context;
        }

        public async Task<Book> CreateAsync(Book entity)
        {
            await _context.books.AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<Book?> DeleteAsync(int id)
        {
            var existingBooks = await _context.books.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBooks == null)
            {
                return null;
            }
            _context.books.Remove(existingBooks);
            await _context.SaveChangesAsync();
            return existingBooks;
        }

        public async Task<List<Book>> GetAllAsync()
        {
            return await _context.books.ToListAsync();
        }

        public async Task<Book?> GetByIdAsync(int id)
        {
            return await _context.books.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Book?> UpdateAync(int id, Book entity)
        {
            var existingBooks = await _context.books.FirstOrDefaultAsync(x => x.Id == id);
            if (existingBooks == null)
            {
                return null;
            }
            existingBooks.Title = entity.Title;
            existingBooks.Description = entity.Description;
            existingBooks.DueDate = entity.DueDate;
            existingBooks.Status = entity.Status;
            await _context.SaveChangesAsync();
            return existingBooks;
        }
    }
}
