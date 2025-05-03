import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home/Home"
import Navbar from "../components/Navbar/Navbar"
import MovieDetail from "../components/MovieDetail/MovieDetail"
import { Favourite } from "../pages/Favourite"
import { useAppSelector } from "../types/store.type"
import { selectStep } from "../redux/selectors/movieSelector"

const Routers = () => {
  const step = useAppSelector(selectStep)
  return (
    <BrowserRouter>
    {step>0 && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/:id" element={<MovieDetail />}></Route>
        <Route path="/favourites" element={<Favourite />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Routers