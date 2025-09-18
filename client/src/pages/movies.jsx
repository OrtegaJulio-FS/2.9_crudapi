import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function MoviesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(`/api/movies/${id}`)
      .then((res) => res.json())
      .then(setMovie)
      .catch(console.error);
  }, [id]);

  async function handleDelete() {
    await fetch(`/api/movies/${id}`, { method: "DELETE" });
    navigate("/");
  }

  if (!movie) return <p>Loading...</p>;

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>{movie.title}</h1>
      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <button onClick={handleDelete}>Delete</button>
      <p>
        <Link to="/">Home</Link>
      </p>
    </div>
  );
}
