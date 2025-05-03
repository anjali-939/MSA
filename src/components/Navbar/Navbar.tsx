import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { SearchBar } from '../SearchBar';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const [favCount, setFavCount] = useState<number>(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('fav') || '[]');
      return Array.isArray(favs) ? favs.length : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    const handleFavUpdate = () => {
      try {
        const favs = JSON.parse(localStorage.getItem('fav') || '[]');
        setFavCount(Array.isArray(favs) ? favs.length : 0);
      } catch {
        setFavCount(0);
      }
    };
  
    window.addEventListener('fav-updated', handleFavUpdate);
    window.addEventListener('storage', handleFavUpdate);
  
    handleFavUpdate();
  
    return () => {
      window.removeEventListener('fav-updated', handleFavUpdate);
      window.removeEventListener('storage', handleFavUpdate);
    };
  }, []);
  


  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}> <Link to={'/'} style={{textDecoration:'none'}}>MoviePlus</Link></div>
      <SearchBar />
      <div className={styles.favIconWrapper}>
        <FontAwesomeIcon
          icon={faHeart}
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/favourites')}
        />
        {favCount > 0 && <span className={styles.favCount}>{favCount}</span>}
      </div>
    </nav>
  );
};

export default Navbar;
