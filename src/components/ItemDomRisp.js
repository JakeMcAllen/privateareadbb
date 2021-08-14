import { Component } from 'react'
import axios from 'axios';
import setting from './../setting'

import './../css/item.css'





export default class ItemDomRisp extends Component {

    constructor (props) {
        super (props);

        this.state = { 
            // lista delle domande
            dom: this.props.dom,

            // risposta
            ris: "",

            // messaggio
            msg: "",

            // visible
            vsbl: true
        }
    }



    sendNewRisp = () => {
        
        if (this.state.ris != "") {

            const toSend = {
                id: this.props.id,
                Titolo: this.state.dom,
                Risposta: this.state.ris,
            }
            
            axios.get(setting.path + "add/imgs", toSend)
            .then(res => {
                console.log("res: " + res);
            })
            .catch(error => {
                this.setState({ msg: 'LogIn fallito: ' + error });
                console.error('There was an error!', error);
            });

            this.setState({ vsbl: false });
        } else {
            this.setState({ msg: 'Messaggio vuoto' });
        }
    }



    addInput = (e) => { this.setState({ris: e.target.value}); }



    render() {
        return (
            <div
                className="containerDom"
                style={{
                    visibility: this.state.vsbl ? '' : 'hidden',
                    height: this.state.vsbl ? '' : 0,
                    margin: this.state.vsbl ? '2px 15px 2px 0' : 0,
                    padding: this.state.vsbl ? '2px solid white' : 0,
                    border: this.state.vsbl ? '2px solid white' : 0,
                    
                    borderColor: this.props.colorMode ? 'black' : 'white',
                } }
            >
                <div className="contTitle" >
                    <p className="title" > {this.state.dom} </p>
                    <button 
                        className="submit" 
                        onClick={() => {this.sendNewRisp()}}
                    > 
                        Send 
                    </button>
                </div>
                <p> {this.state.msg} </p>
                <textarea
                    rows="2"
                    cols="80"
                    className="inputText"
                    type="text"
                    onChange={ (e) => this.addInput(e)}
                />
            </div>
        )
    }
}