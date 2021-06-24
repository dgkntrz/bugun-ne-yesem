import React from "react";
import "./App.css";
import 'react-toastify/dist/ReactToastify.css';
import NavBar from 'react-responsive-menubar/lib/NavBar';

import Main from './Main';

function App() {

  

  return (
    <div className="App">
      <header className="header" style={{backgroundColor: "white"}}>
          <NavBar 
          logo={'https://i.hizliresim.com/7gzlw62.jpg'} 
          showSideNav={false} 
          logoStyles={{  height:"0px", width:"0px"}} 
          navBarStyles={{float: "middle"}} 
          linkStyles={{color:"blue", fontWeight:"bold",}}>
 
              <a className="navbarheader" href="/" ><img src='https://icons.iconarchive.com/icons/martin-berube/food/256/pie-icon.png' style={{height:"50px", width:"50px"}}></img></a>
              <a className="navbarheader" href="/yemek">Yemekler</a>
              <a className="navbarheader" href="/tatli">Tatlılar</a>
              <a className="navbarheader" href="/icecek">İçecekler</a>
              <a className="navbarheader" href="/support">İletişim</a>
              <a className="navbarheader" href="/icecek"></a>
 
          </NavBar>
      </header>
      <Main />
    </div>
  );
}

export default App;