import axios from 'axios';
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Global from '../Global';

export default class NuevoPersonaje extends Component {

    state={
        series:[],
        statusSeries:false,
        statusCrearPersonaje:false,
        ids:0,
    }

    cajaNombre=React.createRef();
    cajaImagen=React.createRef();
    cajaSerie=React.createRef();
    loadSeries=()=>{
        var request="/api/Series/";
        var url=Global.urlSeries+request;
        axios.get(url).then(res=>{
            this.setState({
                series:res.data,
                statusSeries:true
            })
        })
    }

    crearPersonaje=(e)=>{
        e.preventDefault();

        var nom=this.cajaNombre.current.value;
        var img=this.cajaImagen.current.value;
        var serie=parseInt(this.cajaSerie.current.value);
        // console.log(nom);
        // console.log(img);
        // console.log(serie);

        var personaje={
            idPersonaje:413,
            nombre:nom,
            imagen:img,
            idSerie:serie
        }
        //console.log(personaje)
        var request="/api/Personajes"
        var url=Global.urlSeries+request;
        console.log("url es" + url)
        console.log(personaje);
        var idP=0;
        axios.post(url,personaje).then(res=>{
            console.log("id= " +res.data);
            idP=res.data;
            this.setState({
                ids:serie,
                statusCrearPersonaje:true
            })
        })
        console.log(idP)

    }
    componentDidMount=()=>{
        this.loadSeries();
    }
  render() {

    if(this.state.statusCrearPersonaje==true){
        return(<Navigate to={"/personajes/"+this.state.ids}/>)
    }
    if(this.state.statusSeries==true){
        return (
            <div>
              <h1 style={{color:"blue"}}>Nuevo Personaje</h1>
      
              <form onSubmit={this.crearPersonaje}>
              
                  <input className='form-control' type="hidden" />
                  <label>Nombre:</label>
                 
                  <input className='form-control' type="text" ref={this.cajaNombre}/>
                  <br/>
                  <label>Imagen:</label>
                  <input className='form-control' type="text" ref={this.cajaImagen}/>
                  <br/>
                  <label>Serie:</label>
                  <select className='form-control'ref={this.cajaSerie}>
                    {
                        this.state.series.map((show,index)=>{
                            return(
                                <option key={show.idSerie} value={show.idSerie}>{show.nombre}</option>
                            )
                        })
                    }
                  </select>
                  <br/>
                  <button className='btn btn-success'>Insertar personaje</button>

              </form>
            </div>
          )
    }
    
  }
}
