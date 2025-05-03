import { selectMovieDetail } from "../../redux/selectors/movieSelector"
import { useAppSelector } from "../../types/store.type"
import homeStyle from '../../pages/Home/Home.module.css'
import style from './MovieDetail.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faStar } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

const MovieDetail = () => {
  const navigate = useNavigate()
  const movieDetail = useAppSelector(selectMovieDetail)
  const { Title, Poster, Year, Runtime, Genre, Director, Writer, Actors, Plot, imdbRating, imdbVotes } = movieDetail
  
  useEffect(()=>{
    if (Object.keys(movieDetail).length === 0) {
      navigate('/')
    }
  },[movieDetail])

  return (
    <section className="" style={{ padding: '20px 0' }}>
      <div className={homeStyle.container}>
        <div className={style.detailMain}>
          <div>
            <h3>{Title}</h3>
            <div className={style.flex} style={{ gap: '10px' }}>
              <div>{Year}</div>
              <div>{Runtime}</div></div>
          </div>
          <div className={style.flex} style={{ gap: '5px' }}>
            <FontAwesomeIcon icon={faStar} style={{ fontSize: '25px', color: '#f5c518' }} />
            <div className={style.flex} style={{ flexDirection: 'column' }}>
              <div>
                <span>{imdbRating}</span>
                <span>/10</span>
              </div>
              <div>{imdbVotes}</div>
            </div>
          </div>
        </div>
        <div className={style.detailBottom}>
          <div>
            <img alt={Title} src={Poster} /></div>
          <div className="detailCont">
            <p>{Plot}</p>
            <div className={style.type}>{Genre}</div>
            <div className={style.viewType}><b>Director</b><span>{Director}</span></div>
            <div className={style.viewType}><b>Writer</b><span>{Writer}</span></div>
            <div className={style.viewType}><b>Stars</b><span>{Actors}</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MovieDetail