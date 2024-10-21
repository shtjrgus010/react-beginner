import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import styles from "./Detail.module.css";
function Detail() {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState("");

  const { id } = useParams();
  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    console.log(json.data.movie);
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, [id]);

  return (
    <div className={styles.container}>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movieDetail}>
          <Movie
            key={movie.id}
            id={movie.id}
            coverImg={movie.medium_cover_image}
            title={movie.title}
            summary={movie.description_intro}
            genres={movie.genres}
          />

          <div className={styles.extraInfo}>
            <h2>Full Description</h2>
            <p>{movie.description_full}</p>
            <h3>Rating: {movie.rating}</h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default Detail;
