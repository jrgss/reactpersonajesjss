import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import Global from '../Global';

export default class Personajes extends Component {

    state={
        personajes:[],
        status:false,
    }

    loadPersonajes=()=>{
        var request="api/Series/PersonajesSerie/"+this.props.id;
        var url=Global.urlSeries+request;
        console.log(url)
        axios.get(url).then(res=>{
            this.setState({
                personajes:res.data,
                status:true,
            })
        })
    }

    componentDidMount=()=>{
        this.loadPersonajes();
    }
    componentDidUpdate=(oldProps)=>{
        if(this.props.id!=oldProps.id){
            this.loadPersonajes();
        }

    }
  render() {

    if(this.state.status==true){
        return (
            <div>
                <NavLink to={"/serie/"+this.props.id} className="btn btn-danger">Volver</NavLink>
            <table className="table table-bordered table-warning">
            <thead>
                <tr>
                    <th>Personaje</th>
                    <th>Imagen</th>
                </tr>
            </thead>
            <tbody>
                {
                    this.state.personajes.map((per,index)=>{
                        return(
                            <tr key={per.idPersonaje}>
                                <td>{per.nombre}</td>
                                <td><img style={{maxHeight:"20vh"}} src={per.imagen}/></td>

                            </tr>
                            
                        )
                    })
                }
            </tbody>

            </table>
            
            
            </div>
          )
    }
   
  }
}
