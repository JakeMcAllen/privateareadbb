import React, { Component } from 'react'
import axios from 'axios';
import setting from '../setting'

import './../css/addArt.css'



export default class AddPhoto extends Component {
    constructor (props) {
        super (props);

        this.state = {
            // credenziali utente
            username: "",
            password: "",

            // id article
            idArt: -1,
            
            // copertina = 1 else imgExtra
            cop: 2,

            // extra input di immagini
            listImgCrgr: [],

            nVal: 0,
        }

        this.onValueChange = this.onValueChange.bind(this);
    };
    


    // inporta il valore di input del radio bottone, per il formato della pagina
    onValueChange(event) { this.setState({ PageFormat: event.target.value }); console.log(event.target)}

    onImagChargerList = (es) => {
        es.preventDefault();

        if (es.target.files && es.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.state.listImgCrgr.push(e.target.result);
                this.setState({nVal: this.state.listImgCrgr.length})
            };
            reader.readAsDataURL(es.target.files[0]);
        }
    }



    sendNewImg = () => {
        
        let ps = this.state.password;

        const toSend = {
            id: this.state.idArt,
            lstimg: this.state.listImgCrgr,
            val: this.state.nVal,
            cop: this.state.cop,
            username: this.state.username,
            password: ps,
        }
        
        console.log(toSend)

        
        axios.post(setting.path + "add/imgs", toSend)
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
                    paddingLeft: '50px',
                    paddingBottom: '50px',
                    backgroundColor: this.props.colorMode ? setting.lightColor : setting.darkColor, 
                    color: this.props.colorMode ? setting.lightColorInv : setting.darkColorInv 
                }}
            >
                <div>
                    <h1 className="Title"> Aggiungi una nuova foto: </h1>
                    <div className="ContainerSez">

                        <div className="Sez">
                            <h2> Articolo </h2>

                            <div className="sezInt">
                                <label className="titoloLabel" for="titoloInputBox"> 
                                    Id Articolo 
                                </label>
                                <br />
                                <input 
                                    className="imgBox" 
                                    type="number" 
                                    placeholder="1"
                                    min="1"
                                    id="titoloInputBox"
                                    onChange={ e => this.setState({idArt: e.target.value}) }
                                />
  
                            </div>
                        </div>

                        <hr />

                        <div className="SezImgExtra">
                        
                            <h2> Lista immagini aggiuntive </h2>

                            <div className="listImgsPreview">
                                <h3> Tipo immagine: </h3>
                                <p> Value= 1: img di copertina, <br /> 2: img extra. <br /> Se si sceglie value allora bisogna mettere solo un immagine altrimenti da errore. </p>
                                <input
                                    className="imgBox" 
                                    type="number" 
                                    min="1"
                                    max="2"
                                    placeholder="2"
                                    onChange={e => {
                                        this.setState({cop: e.target.value});
                                        console.log("val: " + e.target.value)
                                    }}
                                />
                            </div>

                            <hr /> 

                            <div className="listImgsPreview"> 

                                <h3 className="subTitlePIMG"> Lista preview immagini: </h3>

                                <br /> 
                                <div> Foto caricate: { this.state.listImgCrgr.length } </div>
                                <br />
                                
                                <input 
                                    className="imgBox" 
                                    type="file" 
                                    id="imgCopInputBox"  // imgCopInputBox
                                    onChange={this.onImagChargerList}
                                />

                                <div>

                                    <div className="imgPrevContainer">
                                        {
                                            this.state.listImgCrgr.map( (e, key) => 
                                                <img className="imgPrev" key={key} src={e}/>
                                            )
                                        }
                                    </div>

                                </div>
                            </div>

                        </div>

                        <hr />

                        <div className="Sez">
                            <h2> Previzione pubblicazione: </h2>
                            <div>
                                <div className="">
                                    <label> Username: </label> 
                                    <br /> 
                                    <input type="text" onChange={(e) => this.setState({username: e.target.value}) } />
                                </div>
                                <div >
                                    <label> Password: </label> 
                                    <br /> 
                                    <input type="password" onChange={(e) => this.setState({password: e.target.value}) } />
                                </div>
                            </div>

                            <button className="bttnPub" onClick={ () => this.sendNewImg()}> PUBBLICA </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}
