import React, { Component } from 'react'
import {Route,BrowserRouter,Routes} from 'react-router-dom'
import {useParams} from 'react-router-dom'
import Home from './components/Home'
import MenuRutas from './components/MenuRutas'
import ModificarPersonaje from './components/ModificarPersonaje'
import NuevoPersonaje from './components/NuevoPersonaje'
import Personajes from './components/Personajes'
import Serie from './components/Serie'
export default class Router extends Component {
  render() {

    function SerieElement (){
        var {idserie}=useParams();
        return(<Serie id={idserie}/>)
        
    }

    function PersonajesElement(){
        var {idserie} = useParams();
        return(<Personajes id={idserie}/>)
    }
    return (
      <div>
        <BrowserRouter>
        <MenuRutas/>
      
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/serie/:idserie" element={<SerieElement/>}/> 
        <Route path="personajes/:idserie" element={<PersonajesElement/>}/>
        <Route path="nuevopersonaje" element={<NuevoPersonaje/>}/>
        <Route path="modificar" element={<ModificarPersonaje/>}/>
        
        </Routes>
        </BrowserRouter>

      </div>
    )
  }
}
