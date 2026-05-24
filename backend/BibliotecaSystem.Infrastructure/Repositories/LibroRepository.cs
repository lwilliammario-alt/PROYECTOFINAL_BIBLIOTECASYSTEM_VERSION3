using BibliotecaSystem.Application.Interfaces;
using BibliotecaSystem.Domain.Entities;
using BibliotecaSystem.Infrastructure.Data;

namespace BibliotecaSystem.Infrastructure.Repositories;

public class LibroRepository : ILibroRepository
{
    private readonly AppDbContext _context;

    public LibroRepository(AppDbContext context)
    {
        _context = context;
    }

    public void Add(Libro libro)
    {
        _context.Libros.Add(libro);
        _context.SaveChanges();
    }
}
