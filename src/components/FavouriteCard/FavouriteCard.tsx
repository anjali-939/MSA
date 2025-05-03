import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { MovieSummary } from '../../types';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import style from './FavouriteCard.module.css';
import { useState } from 'react';

const FavouriteCard = ({
  movie,
  onRemove,
}: {
  movie: MovieSummary;
  onRemove: (id: string) => void;
}) => {
  const { Title, Year, Poster, imdbID } = movie;
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      onRemove(imdbID);
      window.dispatchEvent(new Event('storage'));
    }, 300);
  };

  return (
    <div
      className={`${style.favCard} ${isRemoving ? style.fadeOut : ''}`}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <img className={style.favImg} src={Poster} alt={Title} />
          <div>
            <h5>{Title}</h5>
            <div>{Year}</div>
          </div>
        </div>
        <FontAwesomeIcon
          onClick={handleRemove}
          className={style.closeBtn}
          icon={faXmark}
        />
      </div>
    </div>
  );
};

export default FavouriteCard;
