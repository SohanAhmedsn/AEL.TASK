using AEL.API.Domain;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace AEL.API.DATA
{
    public class TestApplicationDbContext : DbContext
    {
        public TestApplicationDbContext(DbContextOptions<TestApplicationDbContext> option) : base(option)
        {

        }
        public DbSet<Book> books { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            var regions = new List<Book>
            {
                new Book
                {
                    Id=1,
                    Title="AAAAAAA",
                    Description="Name-A",
                    DueDate=new DateTime(2024-1-1),
                    Status=true
                }
            };
            modelBuilder.Entity<Book>().HasData(regions);

        }
    }
}
