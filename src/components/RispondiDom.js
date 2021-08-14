import React, { Component } from 'react'
import setting from './../setting'
import axios from 'axios';

import './../css/addArt.css'
import ItemDomRisp from './ItemDomRisp';



export default class RispondiDom extends Component {

    constructor (props) {
        super (props);

        this.state = {
            // credenziali utente
            username: "",
            password: "",

            // lista id e domande
            listId: [],
            listDom: [],

        }
    }



    componentDidMount () {
        
        axios.get(setting.path + "add/getDomW")
        .then(res => {

            res.data.forEach( e => {

                if (this.state.listId == "") this.setState({listId: [e.id]})
                else this.setState({listId: [this.state.listId, e.id]})

                if (this.state.listDom == "") this.setState({listDom: [e.titolo]})
                else this.setState({listDom: [this.state.listDom, e.titolo]})
            });
        })
        .catch(error => {

            this.setState({ msg: 'LogIn fallito: ' + error });
            console.error('There was an error!', error);
        });
    }

    

    render() {
        return (
            <div
                style = {{
                    paddingLeft: '50px',
                    paddingBottom: '50px',
                    backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor, 
                    color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv 
                }}
            >
                <div>
                    <h1 className="Title"> Rispondi domande: </h1>
                    <div className="ContainerSez">
                        {
                            this.state.listDom.map( (e, key) => 
                                <ItemDomRisp 
                                    key={key} 
                                    id={this.state.listId[key]}
                                    dom={this.state.listDom[key]} 
                                    colorMode={this.props.colorMode}
                                />
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}