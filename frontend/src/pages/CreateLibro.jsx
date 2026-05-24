import { useState } from "react";
import "./CreateLibro.css";

export default function CreateLibro() {
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" }); // type: 'success' | 'error'

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!titulo.trim() || !autor.trim() || !isbn.trim()) {
      setMessage({ text: "Todos los campos son obligatorios.", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // API corriendo en http://localhost:5240 (dotnet run) o https://localhost:7148 (dotnet run --launch-profile https)
      const response = await fetch("http://localhost:5240/api/libro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo: titulo.trim(), autor: autor.trim(), isbn: isbn.trim() })
      });

      if (response.ok) {
        setMessage({ text: "¡Libro registrado correctamente en BibliotecaSystem!", type: "success" });
        setTitulo("");
        setAutor("");
        setIsbn("");
      } else {
        const errorData = await response.json().catch(() => ({}));
        setMessage({
          text: errorData.mensaje || "Error al registrar el libro en el servidor.",
          type: "error"
        });
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setMessage({
        text: "No se pudo conectar con el servidor. Por favor, verifique que la API esté activa.",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-libro-container">
      <div className="create-libro-card">
        <h1 className="create-libro-title">Registro de Libro</h1>
        <p className="create-libro-subtitle">
          BibliotecaSystem — UPLA. Complete los datos para ingresar un nuevo libro al sistema.
        </p>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            {message.type === "success" ? "✓" : "⚠"} {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="titulo">
              Título del Libro
            </label>
            <input
              id="titulo"
              type="text"
              className="form-input"
              placeholder="Ej. Cien años de soledad"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="autor">
              Autor
            </label>
            <input
              id="autor"
              type="text"
              className="form-input"
              placeholder="Ej. Gabriel García Márquez"
              value={autor}
              onChange={(e) => setAutor(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="isbn">
              ISBN
            </label>
            <input
              id="isbn"
              type="text"
              className="form-input"
              placeholder="Ej. 978-0060883287"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
              disabled={loading}
              required
            />
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <div className="spinner"></div>
                <span>Registrando...</span>
              </>
            ) : (
              <span>Registrar Libro</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
