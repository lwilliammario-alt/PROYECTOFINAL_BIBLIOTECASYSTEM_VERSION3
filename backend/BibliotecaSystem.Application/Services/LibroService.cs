using BibliotecaSystem.Application.DTOs;
using BibliotecaSystem.Application.Interfaces;
using BibliotecaSystem.Domain.Entities;

namespace BibliotecaSystem.Application.Services;

public class LibroService : ILibroService
{
    private readonly ILibroRepository _repository;

    public LibroService(ILibroRepository repository)
    {
        _repository = repository;
    }

    public void RegistrarLibro(CreateLibroDto dto)
    {
        var libro = new Libro
        {
            Id = Guid.NewGuid(),
            Titulo = dto.Titulo,
            Autor = dto.Autor,
            ISBN = dto.ISBN,
            FechaRegistro = DateTime.UtcNow,
            Estado = "Disponible"
        };

        _repository.Add(libro);
    }
}
