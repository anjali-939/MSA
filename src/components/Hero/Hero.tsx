import backImg from '../../assets/images/bg-img.jpg'
import { SearchBar } from '../SearchBar'
import styles from './Hero.module.css'
const Hero = () => {
  return (
    <div className={styles.heroSec} style={{backgroundImage:`url(${backImg})`}}>
        <div className={styles.heroCont}>
            <h2 className={styles.heroTitle}>Search Movies <br></br>With MoviePlus!</h2>
            <SearchBar />
        </div>
    </div>
  )
}

export default Hero