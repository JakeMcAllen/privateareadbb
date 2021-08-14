import React from 'react'

import AddArt from './components/AddArt'
import AddQst from './components/AddQst'
import AddPhoto from './components/AddPhoto'
import RispondiDom from './components/RispondiDom'

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import cookie from 'react-cookies'
import setting from './setting'
import DarkModeToggle from "react-dark-mode-toggle";

import './css/nav.css'


export default class App extends React.Component {

  constructor (props) {
    super (props);
    var currentLocation = window.location.pathname.split("/")[1];

    cookie.save('colorMode', true, { path: '/' }); 

    this.state = {
      colorMode: cookie.load('colorMode'),    // true_light --- false_dark
      currentPath: "/" + currentLocation,
    }

    console.log("Mode: " + this.state.colorMode)
  }



  changecolormode = () => { 

    var nDate = new Date();
    nDate.setDate(nDate.getDate() + setting.cookiesPlusDay);

    var md = !this.state.colorMode;


    cookie.save('colorMode', md, { path: '/', expires: nDate }); 
    this.setState({colorMode: md});
  }
  changePath = (path) => { console.log("path: " + path); this.setState({currentPath: path}); }

  

  render() {
    return (
      <Router>
        <header>

          <div style={{ backgroundColor: this.state.colorMode ? setting.lightColor : setting.darkColor }} >
            <div className="MenuComponent_container" >
              <nav 
                className="navContainer"
                style={{ borderBottom: "solid 1px white"}}
              >
                <ul className="nav" >

                  <li className={ this.state.currentPath === '/' ? 'aPage' : '' } > 
                    <Link 
                      to='/' 
                      onClick={() => { this.changePath("/"); }}
                      style={ 
                        this.state.colorMode ? 
                        {color: setting.lightColorInv}: 
                        {color: setting.darkColorInv}
                      }
                    >
                      AddArt
                    </Link> 
                  </li>

                  <li className={ this.state.currentPath === '/AddDom' ? 'aPage' : '' } > 
                    <Link 
                      to='/AddDom' 
                      onClick={() => { this.changePath("/AddDom"); }}
                      style={ 
                        this.state.colorMode ? 
                        {color: setting.lightColorInv}: 
                        {color: setting.darkColorInv}
                      }
                    >
                      AddDom
                    </Link> 
                  </li>

                  <li className={ this.state.currentPath === '/AddPhoto' ? 'aPage' : '' } > 
                    <Link 
                      to='/AddPhoto' 
                      onClick={() => { this.changePath("/AddPhoto"); }}
                      style={ 
                        this.state.colorMode ? 
                        {color: setting.lightColorInv}: 
                        {color: setting.darkColorInv}
                      }
                    >
                      AddPhoto
                    </Link> 
                  </li>

                  <li className={ this.state.currentPath === '/RispondiDom' ? 'aPage' : '' } > 
                    <Link 
                      to='/RispondiDom' 
                      onClick={() => { this.changePath("/RispondiDom"); }}
                      style={ 
                        this.state.colorMode ? 
                        {color: setting.lightColorInv}: 
                        {color: setting.darkColorInv}
                      }
                    >
                      RispondiDom
                    </Link> 
                  </li>

                </ul>


                <div 
                    className="MenuButtonContainer"
                    style={{
                      display: 'flex', 
                      justifyContent: 'center'
                    }}
                >

                  <DarkModeToggle
                    onChange={ () => { this.changecolormode() } }
                    checked={ this.state.colorMode }
                    size={60}
                  />
                
                </div>

              </nav>
            </div>
          </div>

        </header>

        <Switch>

          <Route path="/" exact >
            <AddArt 
              colorMode={this.state.colorMode}  
            />
          </Route>
          <Route path="/AddDom" >
            <AddQst 
              colorMode={this.state.colorMode}  
            />
          </Route>
          <Route path="/AddPhoto" >
            <AddPhoto 
              colorMode={this.state.colorMode}  
            />
          </Route>

          <Route path="/RispondiDom" >
            <RispondiDom 
              colorMode={this.state.colorMode}  
            />
          </Route>

        </Switch>

      </Router>
    )
  }
}
