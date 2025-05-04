import { useState } from "react";
import { getApiUrls } from "../../utils/apiUrls";
import useGetApiCall from "../../hooks/useGetApiCall";
import { MovieSummary } from "../../types";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilm, faSearch } from "@fortawesome/free-solid-svg-icons";
import styles from './SearchBar.module.css'
import cardStyle from '../Movies/Movies.module.css';
import { useAppSelector } from "../../types/store.type";
import { selectStep } from "../../redux/selectors/movieSelector";
import { useDispatch } from "react-redux";
import { updateStep } from "../../redux/slices/Movie/movieSlice";

const SearchBar = () => {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const apiUrls = getApiUrls();
    const step = useAppSelector(selectStep)
    const dispatch = useDispatch()


    const { refetch } = useGetApiCall<MovieSummary[]>({
        key: 'searchedMovies',
        url: apiUrls.movieSearch,
        option: {
            params: { s: query },
        },
        enabled: false,
    });
    
    const handleSearch = () => {
        navigate('/')
        if (query.trim()) {
            refetch();
            const element = document.getElementById("home-section");
            if(element){
                element.scrollIntoView();
            }
            if (step == 0) {
                dispatch(updateStep(1))
            }
        }
    };
    return (
        <div className={styles.searchMain} style={{ gap: '10px', display: 'flex', alignItems: 'center' }}>
            <FontAwesomeIcon icon={faFilm} className={styles.movieIcon} />
            <input
                type="text"
                placeholder="Search Movies"
                value={query}
                defaultValue={query}
                onChange={(e) => setQuery(e.target.value)}
                className={styles.searchBar}
            />
            <button className={cardStyle.moreBtn} onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch} style={{ paddingRight: '8px' }} />
                Search
            </button>
        </div>
    )
}

export default SearchBar