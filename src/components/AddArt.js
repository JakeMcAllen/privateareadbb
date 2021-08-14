import React, { Component } from 'react'
import axios from 'axios';
import setting from './../setting'

import TagsInput from './Tags'

import './../css/addArt.css'



export default class AddArt extends Component {
    constructor (props) {
        super (props);

        this.state = {
            // credenziali utente
            username: "",
            password: "",


            // input default
            listImgs: [],

            imgInput: "",
            articoloInputBox: "",
            titoloInputBox: "",

            imgCopInputBox: "",
            descImgCopInputBox: "",

            // date and hour of publication
            publicationDate: "",
            publicationHour: "",

            // style della pagina. Ha 3 valori possibili: "F1", "F2", e "".
            PageFormat: "F1",


            // extra input di immagini
            listImgCrgr: [],

            // add tags
            tagLst: [],

            nVal: 0,
        }

        this.onValueChange = this.onValueChange.bind(this);
    };
    


    // inporta il valore di input del radio bottone, per il formato della pagina
    onValueChange(event) { this.setState({ PageFormat: event.target.value }); console.log(event.target)}

    onImageChange = (event) => {
        event.preventDefault();

        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({imgCopInputBox: e.target.result})
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

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



    sendNewArtc = () => {
        
        let ft = this.state.PageFormat;
        let ps = this.state.password;
        let ph = parseInt( this.state.publicationHour.split(":")[0] ) - 1

        const toSend = {

            // text
            titolo: this.state.titoloInputBox,
            testo: this.state.articoloInputBox,
            
            // format
            pageformat: ft,
            
            // imgs
            val: this.state.nVal,
            img1: this.state.imgCopInputBox,
            descimg1: this.state.descImgCopInputBox,
            lstimg: this.state.listImgCrgr,
            
            // date
            date: this.state.publicationDate,
            hour: ph.toString,

            // tags
            tags: this.state.tagLst,
            
            // username-password
            username: this.state.username,
            password: ps,
        }
        


        console.log("toSend: ")
        console.log(toSend)
        
        axios.post(setting.path + "add/Art", toSend)
        .then(res => {

            console.log("res: " + res);

        })
        .catch(error => {

            this.setState({ msg: 'LogIn fallito: ' + error });
            console.error('There was an error!', error);

        });
        
    }

    selectedTags = (tags) => { console.log("log: " + tags); this.setState({tagLst: tags}); };



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
                    <h1 className="Title"> Aggiungi un nuovo articolo: </h1>
                    <div className="ContainerSez">

                        <div className="Sez">
                            <h2> Articolo </h2>

                            <div className="sezInt">
                                <label className="titoloLabel" for="titoloInputBox"> 
                                    Titolo 
                                </label>
                                <br />
                                <input 
                                    className="imgBox" 
                                    type="text" 
                                    id="titoloInputBox"
                                    onChange={ e => this.setState({titoloInputBox: e.target.value}) }
                                />
                                <br />
                                <label className="articoloLabel" for="articoloInputBox"> 
                                    Testo articolo 
                                </label>
                                <br />
                                <textarea 
                                    style={{ height: '100px', width: '80%' }}
                                    className="imgBoxArt" 
                                    type="text" 
                                    id="articoloInputBox"
                                    onChange={ e => this.setState({articoloInputBox: e.target.value}) }
                                />
                            </div>
                        </div>

                        <div className="Sez">
                            <h2> Formato articolo: </h2>

                            <div className="sezInt">
                                <label>
                                    <input 
                                        type="radio" 
                                        id="F1" 
                                        name="fav_language" 
                                        value="F1" 
                                        checked={this.state.PageFormat === "F1"}
                                        onChange={this.onValueChange}
                                    />
                                    Formato 1 
                                </label>
                                <br />
                                <label>
                                    <input 
                                        type="radio" 
                                        id="F2" 
                                        name="fav_language" 
                                        value="F2" 
                                        checked={this.state.PageFormat === "F2"}
                                        onChange={this.onValueChange}
                                    /> 
                                    Formato 2 
                                </label>
                            </div>
                        </div>

                        <div className="Sez">
                            <h2> Immagine copertina </h2>

                            <div className="sezInt">
                                <label className="imgCopLabel" for="imgCopInputBox"> 
                                    Immagine: 
                                    <br />
                                    <input 
                                        className="imgBox" 
                                        type="file" 
                                        id="imgCopInputBox"
                                        onChange={this.onImageChange}
                                    /> 
                                </label>

                                <br />
                                <img style={{maxWidth: '300px'}} src={this.state.imgCopInputBox} /> 
                                <br />
                                <label className="descImgLabel" for="descImgCopInputBox"> 
                                    Descrizione: 
                                    <br />
                                    <input 
                                        className="imgBox" 
                                        type="text" 
                                        id="descImgCopInputBox"
                                        onChange={(e) => this.setState({descImgCopInputBox: e.target.value}) }    
                                    />
                                </label> 
                            </div>
                        </div>
                        

                        <hr />


                        <div className="SezImgExtra">
                        
                            <h2> Lista immagini aggiuntive </h2>

                            <div className="listImgsPreview"> 

                                Lista preview immagini
                                <input 
                                    className="imgBox" 
                                    type="file" 
                                    id="imgCopInputBox"  // imgCopInputBox
                                    onChange={this.onImagChargerList}
                                />
                                <div>

                                    <div>
                                        Foto caricate: { this.state.listImgCrgr.length }
                                    </div>

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
                            <h2> Tags articolo: </h2>
                            
                            <div className="passSez">
                                <TagsInput 
                                    selectedTags={this.selectedTags} 
                                    tags={[]}
                                />
                            </div>
                        </div>

                        <hr />

                        <div className="Sez">
                            <h2> Previzione pubblicazione: </h2>

                            <div className="passSez">
                                <label className="descImgLabel" for="dateInput" > Data di pubblicazione: </label> <br />
                                <input 
                                    type="date" 
                                    id="dateInput" 
                                    onChange={ (e) => { this.setState({publicationDate: e.target.value}); }} 
                                />
                                <br />
                                <label className="descImgLabel" for="hourInput" > Ora di pubblicazione: </label> <br />
                                <input 
                                    type="time" 
                                    id="hourInput" 
                                    id="appt" 
                                    name="appt" 
                                    min="01:00" 
                                    max="24:00" 
                                    defaultValue="14:00" 
                                    onChange={ (e) => { this.setState({publicationHour: e.target.value}); }}
                                />
                                <br />
                                <div className="passCont">
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

                            <button className="bttnPub" onClick={ () => this.sendNewArtc()}> PUBBLICA </button>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}