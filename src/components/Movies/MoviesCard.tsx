import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MovieDetails, MovieSummary } from "../../types";
import styles from './Movies.module.css';
import { faArrowRight, faHeart } from "@fortawesome/free-solid-svg-icons";
import useGetApiCall from "../../hooks/useGetApiCall";
import { getApiUrls } from "../../utils/apiUrls";
import { useNavigate } from "react-router-dom";


const MoviesCard = ({ movie }: { movie: MovieSummary }) => {
  const { Title, Poster, Year, imdbID } = movie;
  const [isFav, setIsFav] = useState(false);
  const navigate = useNavigate()
  const apiUrls = getApiUrls();

  const {
    refetch
  } = useGetApiCall<MovieDetails>({
    key: 'movieDetail',
    url: apiUrls.movieDetail,
    option: {
      params: { i: imdbID }
    },
    enabled: false,
  });

  const handleMore = async () => {
      await refetch();
      navigate(`/${imdbID}`); 
  };

  useEffect(() => {
    const existFav = localStorage.getItem('fav');
    if (existFav) {
      try {
        const favs: MovieSummary[] = JSON.parse(existFav);
        if (Array.isArray(favs) && favs.some((m) => m.imdbID === imdbID)) {
          setIsFav(true);
        }
        else {
          setIsFav(false);
        }
      } catch (e) {
        console.log(e);
        setIsFav(false);
      }
    }
  }, [movie]);


  const addFav = () => {
    const existing = JSON.parse(localStorage.getItem('fav') || '[]');
    if (!existing.find((m: MovieSummary) => m.imdbID === movie.imdbID)) {
      existing.push(movie);
      localStorage.setItem('fav', JSON.stringify(existing));
      setIsFav(true);
      window.dispatchEvent(new CustomEvent('fav-updated'));
    }
  };

  if (!Poster) return null;

  return (
    <div className={styles.card}>
      <div className={styles.cardimg}><img alt={Title} src={Poster} /></div>
      <div className={styles.cardcontent}>
        <div>
          <h4>{Title}</h4>
          <div>{Year}</div>
        </div>
        <div className={styles.cardLeft}>
          <FontAwesomeIcon
            icon={faHeart}
            className={`${styles.favIcon} ${isFav ? styles.favActive : ''}`}
            onClick={addFav}
          />
          <button className={styles.moreBtn} onClick={() => { handleMore() }}>More Info<FontAwesomeIcon style={{ paddingLeft: '5px' }} icon={faArrowRight} /></button>
        </div>
      </div>
    </div>
  );
};

export default MoviesCard;
