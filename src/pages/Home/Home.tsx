import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../types/store.type';
import { selectSearchedMovies, selectStep } from '../../redux/selectors/movieSelector';
import MoviesCard from '../../components/Movies/MoviesCard';
import styles from './Home.module.css';
import { Hero } from '../../components/Hero';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Home: React.FC = () => {
  const step = useAppSelector(selectStep);
  const movies = useAppSelector(selectSearchedMovies);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (step > 0) {
      setLoading(true);
    }
  }, [step]);

  useEffect(() => {
    if (step > 0) {
      const timeout = setTimeout(() => {
        setLoading(false);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [movies]);

  if (step === 0) {
    return <Hero />;
  }

  if (loading) {
    return (
      <section className={styles.homeSec}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx}>
                <Skeleton height={350} style={{ marginBottom: '1rem', borderRadius: '10px' }} />
                <Skeleton height={20} style={{ marginBottom: '0.5rem', borderRadius: '10px' }} />
                <Skeleton height={20} style={{ borderRadius: '10px' }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.homeSec}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {movies.length > 0 ? (
            movies.map((movie) => movie && <MoviesCard key={movie.imdbID} movie={movie} />)
          ) : (
            <h2>No movie found!</h2>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
