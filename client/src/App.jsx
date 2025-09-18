import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function App() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: "", year: "", genre: "" });

  useEffect(() => {
    fetch("/api/movies")
      .then((res) => res.json())
      .then(setMovies)
      .catch(console.error);
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/movies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const newMovie = await res.json();
    setMovies([...movies, newMovie]);
    setForm({ title: "", year: "", genre: "" });
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Movies</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
        />
        <input
          name="year"
          placeholder="Year"
          value={form.year}
          onChange={handleChange}
        />
        <input
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {movies.map((m) => (
          <li key={m._id}>
            <Link to={`/movies/${m._id}`}>
              {m.title} ({m.year}) — {m.genre}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
