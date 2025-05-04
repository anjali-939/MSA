import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../types/store.type';
import { selectApiError, selectSearchedMovies, selectStep } from '../../redux/selectors/movieSelector';
import MoviesCard from '../../components/Movies/MoviesCard';
import styles from './Home.module.css';
import { Hero } from '../../components/Hero';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home: React.FC = () => {
  const step = useAppSelector(selectStep);
  const movies = useAppSelector(selectSearchedMovies);
  const [loading, setLoading] = useState(true);
  const apiError = useAppSelector(selectApiError)

  useEffect(() => {
    if (apiError) {
      setLoading(false);
    } else if (step > 0 && movies.length > 0 && !apiError) {
      setLoading(false);
    }
  }, [step, movies, apiError]);
  

  if (step === 0) {
    return <Hero />;
  }
  console.log({ apiError });

  return (
    <section className={styles.homeSec} id="home-section">
      <div className={styles.container}>
        <div className={styles.grid}>
          {apiError ? (
            <h2>No movie found!</h2>
          ) : loading ? (
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton height={350} style={{ marginBottom: '1rem', borderRadius: '10px' }} />
                <Skeleton height={20} style={{ marginBottom: '0.5rem', borderRadius: '10px' }} />
                <Skeleton height={20} style={{ borderRadius: '10px' }} />
              </div>
            ))
          ) : movies && Array.isArray(movies) && movies.length > 0 ? (
            movies.map((movie) => movie && <MoviesCard key={movie?.imdbID} movie={movie} />)
          ) : null}
        </div>
      </div>
    </section>
  );
  
};

export default Home;
