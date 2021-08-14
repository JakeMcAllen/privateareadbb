import React, { Component } from 'react'
import axios from 'axios';
import setting from './../setting'

import './../css/addArt.css'



export default class AddArt extends Component {
    constructor (props) {
        super (props);

        this.state = {
            // credenziali utente
            username: "",
            password: "",

            titolo: "",
            risposta: "",

            tLength: 255,
            rLength: 700
        }
    }


    sendNewArtc = () => {
        
        let ps = this.state.password;

        const toSend = {
            titolo: this.state.titolo,
            risposta: this.state.risposta,

            username: this.state.username,
            password: ps,
        }

        
        
        axios.post(setting.path + "add/Faq", toSend)
        .then(res => {

            console.log("res: " + res);

        })
        .catch(error => {

            this.setState({ msg: 'LogIn fallito: ' + error });
            console.error('There was an error!', error);

        });

    }


    render() {
        return (
            <div
                style={{ 
                    paddingBottom: '50px',
                    backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor, 
                    color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv 
                }}
            >
                <div className="ContainerSez" style={{marginLeft: "50px"}}>
                    <h1 className="Title"> Aggiungi una nuova domanda: </h1>

                    <div className="Sez">
                        <label className="titoloLabel" for="titoloInputBox"> 
                            Titolo 
                        </label>
                        <br />
                        <textarea 
                            className="imgBox" 
                            type="text" 
                            id="titoloInputBox"
                            style={{ height: '30px', width: '40%' }}
                            onChange={ e => { 
                                this.setState({titolo: e.target.value}) 
                                this.setState({tLength: 255 - e.target.value.length})
                            } }
                            maxLength = '255'
                        />
                        <p className="counterBox"> {this.state.tLength} </p>
                        <br />
                        <label className="articoloLabel" for="articoloInputBox"> 
                            Testo risposta 
                        </label>
                        <br />
                        <textarea 
                            style={{ height: '100px', width: '80%' }}
                            className="imgBoxArt" 
                            type="text" 
                            id="articoloInputBox"
                            onChange={ e => {
                                this.setState({risposta: e.target.value}) 
                                this.setState({rLength: 700 - e.target.value.length}) 
                            } }
                            maxLength = '700'
                        />
                        <p className="counterBox"> {this.state.rLength} </p>
                    </div>
                    <div className="passSez">
                    <div className="passDiv">
                            <label> Username: </label> <br /> <input type="text" onChange={(e) => this.setState({username: e.target.value}) } />
                        </div>
                        <div className="">
                            <label> Password: </label> <br /> <input type="password" onChange={(e) => this.setState({password: e.target.value}) } />
                        </div>
                        
                        <button className="bttnPub" onClick={ () => this.sendNewArtc()} > AddQuestion </button>
                    </div>
                </div>
            </div>
        )
    }

}