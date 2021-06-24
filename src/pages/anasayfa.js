import React from "react";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import "../App.css";

const slideImages = [
  'https://i.hizliresim.com/g1m0hvi.jpg',
  'https://i.hizliresim.com/pqg0quj.jpg',
  'https://i.hizliresim.com/as0dkb0.jpg'
];


function App() {
  return (
    <div className="slide-container">
        <Slide>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[0]})`, height: "650px", offset: "100px"}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[1]})`, height: "650px"}}>
            </div>
          </div>
          <div className="each-slide">
            <div style={{'backgroundImage': `url(${slideImages[2]})` ,height: "650px"}}>
            </div>
          </div>
        </Slide>
        <div>&ensp;</div><div>&ensp;</div>
        <div>
            <a><a href="/yemek"><button className="button1">Yemekler</button></a>&ensp;&ensp;&ensp;
            <a href="/tatli"><button className="button1">Tatlılar</button></a>&ensp;&ensp;&ensp;<a href="/icecek"><button className="button1">İçecekler</button></a></a>
        </div>
      </div>
  );
}


export default App;
