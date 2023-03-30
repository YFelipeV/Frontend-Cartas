import {Route,Routes} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import Partida from '../pages/Partida'
import Sala from '../pages/Sala'

function AppRoutes() {
  return (
   <Routes>
    <Route path='/' element={<HomePage/>}></Route>
    <Route path='/sala/:sala' element={<Sala/>}></Route>
    <Route path='/juego/:juego' element={<Partida/>}></Route>
    <Route path='*' element={<HomePage/>}></Route>
   </Routes>
  )
}

export default AppRoutes