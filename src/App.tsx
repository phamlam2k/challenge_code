import { Route, Routes } from 'react-router-dom'
import { HomeScreen } from './components/Home'
import { NowPlayingScreen } from './components/NowPlaying'
import { TopRatedScreen } from './components/TopRated'
import { SearchMultiScreen } from './components/Search'
import { MovieScreen } from './components/Movie'
import { TVScreen } from './components/TV'
import { TVShowScreen } from './components/TVShow'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeScreen />} />
      <Route path="/now_playing" element={<NowPlayingScreen />} />
      <Route path="/top_rated" element={<TopRatedScreen />} />
      <Route path="/search" element={<SearchMultiScreen />} />
      <Route path="/movie/:id" element={<MovieScreen />} />
      <Route path="/tv/:id" element={<TVScreen />} />
      <Route path="/tv_show" element={<TVShowScreen />} />
    </Routes>
  )
}

export default App
