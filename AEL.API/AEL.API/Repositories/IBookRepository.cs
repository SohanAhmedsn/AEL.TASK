using AEL.API.Domain;

namespace AEL.API.Repositories
{
    public interface IBookRepository
    {
        Task<List<Book>> GetAllAsync();
        Task<Book?> GetByIdAsync(int id);
        Task<Book> CreateAsync(Book entity);
        Task<Book?> UpdateAync(int id, Book entity);
        Task<Book?> DeleteAsync(int id);
    }
}
