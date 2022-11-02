import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Global from '../Global';

export default class Serie extends Component {

    state={
        status:false,
        serie:{},
    }
    loadSerie=()=>{
        var request="api/Series/"+this.props.id;
        var url=Global.urlSeries+request;
      //  console.log(url);
        axios.get(url).then(res=>{
            this.setState({
                serie:res.data,
                status:true,
            })
        })

    }

    componentDidMount=()=>{
        this.loadSerie();
    }
    componentDidUpdate=(oldProps)=>{
      if(oldProps.id!=this.props.id){
        this.loadSerie();
      }

    }

  render() {
    if(this.state.status ==true){
      return (
        <div> 
         <img style={{maxHeight:"40vh"}} src={this.state.serie.imagen} />
          <br/>
          <h1>{this.state.serie.nombre}</h1>
          <label>{this.state.serie.puntuacion}</label><br/>
          <NavLink to={"/personajes/"+this.props.id} className="btn btn-success">Personajes</NavLink>
  
                  
              
        </div>
      )
    }
   
  }
}
