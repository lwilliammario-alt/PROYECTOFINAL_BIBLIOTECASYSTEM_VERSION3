using BibliotecaSystem.Domain.Entities;

namespace BibliotecaSystem.Application.Interfaces;

public interface ILibroRepository
{
    void Add(Libro libro);
}
