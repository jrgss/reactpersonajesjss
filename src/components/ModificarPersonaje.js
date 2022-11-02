import axios from 'axios'
import React, { Component } from 'react'
import { Navigate } from 'react-router-dom';
import Global from '../Global'
export default class ModificarPersonaje extends Component {
    cajaPer=React.createRef();
    cajaSerie=React.createRef();
    state= {
        series: [],
        personajes:[],
        statusSeries:true,
        statusPersonajes:true,
        statusCambiado:false,
        serie:{},
        personaje:{},
        cambio:false,
    }

    loadSeries=()=>{
        var request="/api/Series";
        var url=Global.urlSeries + request;
        console.log(url);
        axios.get(url).then(res=>{

            this.setState({
                statusSeries:true,
                    series:res.data
            })

        })

    }

    loadPersonajes=()=>{
        var request="/api/Personajes";
        var url=Global.urlSeries+request

        axios.get(url).then(res=>{
            this.setState({
                personajes:res.data,
                statusPersonajes:true
            })
        })
    }


    cambiarPersonaje=(e)=>{
        e.preventDefault();
       // this.cambioForm();
        console.log("a"+this.state.personaje.idPersonaje)
        var request="/api/Personajes/"+this.state.personaje.idPersonaje+"/"+this.state.serie.idSerie
        var url=Global.urlSeries+request;
        console.log(request);
        axios.put(url).then(res=>{
            this.setState({
                statusCambiado:true,
            })
        })
    }

    cambioForm=()=>{
        
            var idSerie=this.cajaSerie.current.value;
                      
            var idPers=this.cajaPer.current.value;
            axios.get(Global.urlSeries+"/api/Series/"+idSerie).then(res=>{
    
                this.setState({
                    serie:res.data
                })
            })
    
            axios.get(Global.urlSeries+"/api/Personajes/"+idPers).then(res=>{
    
                this.setState({
                    personaje:res.data
                })
            })
        
    //    this.setState({
    //     cambio:true
    //    })
    }

    seteoInicio=()=>{
        var idSerie=1;   
        var idPers=1;
        axios.get(Global.urlSeries+"/api/Series/"+idSerie).then(res=>{

            this.setState({
                serie:res.data
            })
        })

        axios.get(Global.urlSeries+"/api/Personajes/"+idPers).then(res=>{

            this.setState({
                personaje:res.data
            })
        })
    }
    componentDidMount=()=>{
        this.loadSeries();
        this.loadPersonajes();
        this.seteoInicio();
        //this.cambioForm();
    }
  render() {
    if(this.state.statusCambiado==true){
       return( <Navigate to={"/personajes/"+this.state.serie.idSerie}></Navigate>)
    }
    if(this.state.statusPersonajes ==true && this.state.statusSeries==true){
        return (
            <div>
                <form onSubmit={this.cambiarPersonaje}>
              <h1>Personajes y series</h1>
              <label>Seleccione una serie</label>
              <br/>
              <select ref={this.cajaSerie} className='form-control' onChange={this.cambioForm}>
              {
                    this.state.series.map((show,index)=>{
                        return(<option key={show.idSerie} value={show.idSerie}>{show.nombre}</option>)
                    })
                }
              </select>
              <br/>
              <label>Seleccione un personaje</label>
              <br/>
              <select ref={this.cajaPer} className='form-control' onChange={this.cambioForm}>
              {
                    this.state.personajes.map((per,index)=>{
                        return(<option key={per.idPersonaje} value={per.idPersonaje}>{per.nombre}</option>)
                    })
                }
                </select>
                <br/>

                <button className='btn btn-info'>Guardar Cambios</button>
                </form>
                <img  style={{maxHeight:"25vh"}} src={this.state.serie.imagen}/>
                <br/>
                <hr/><img  style={{maxHeight:"25vh"}} src={this.state.personaje.imagen}/>
               
            </div>
          )
    }
  
  }
}
