using BibliotecaSystem.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace BibliotecaSystem.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Libro> Libros => Set<Libro>();
}
