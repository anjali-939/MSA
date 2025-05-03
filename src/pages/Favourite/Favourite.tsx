import { useEffect, useState } from 'react';
import { FavouriteCard } from '../../components/FavouriteCard';
import homeStyle from '../../pages/Home/Home.module.css';
import { MovieSummary } from '../../types';

const Favourite = () => {
    const [favourites, setFavourites] = useState<MovieSummary[]>([]);

    const loadFavourites = () => {
        try {
            const stored = JSON.parse(localStorage.getItem('fav') || '[]');
            if (Array.isArray(stored)) {
                setFavourites(stored);
            } else {
                setFavourites([]);
            }
        } catch {
            setFavourites([]);
        }
    };

    useEffect(() => {
        loadFavourites();

        const handleStorageChange = () => loadFavourites();
        window.addEventListener('storage', handleStorageChange);

        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const handleRemove = (id: string) => {
        const updated = favourites.filter((fav) => fav.imdbID !== id);
        setFavourites(updated);
        localStorage.setItem('fav', JSON.stringify(updated));
    };

    return (
        <section>
            <div className={homeStyle.container}>
                {favourites.length === 0 ? <h4>Nothing in Favourite</h4> :
                    <> <h2>Favourites</h2>
                        <div className="fav-list">
                            {favourites.map((fav) => (
                                <FavouriteCard key={fav.imdbID} movie={fav} onRemove={handleRemove} />
                            ))}
                        </div></>}
            </div>
        </section>
    );
};

export default Favourite;
