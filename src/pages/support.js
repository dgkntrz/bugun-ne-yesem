import React from "react";
import "../support.css";
import Grid from '@material-ui/core/Grid';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

function App() {
    return (
        <div>
            <div style={{paddingTop:"2em"}}></div>
            <header className="navbarheader">Herhangi bir hatayla karşılaştığınızda veya önerilerinizi paylaşmak amacıyla bize ulaşmak için <b>dogukanterzi@gmail.com</b> <br></br> adresine mail atabilir ya da aşağıdaki alanı kullanarak bize mesaj gönderebilirsiniz!</header>
            <div style={{paddingTop:"2em"}}></div>
            <textarea placeholder="İsminiz" id="textAreaID2" style={{ width: "300px", height: "20px" }}>
            </textarea>
            <div style={{paddingTop:"1em"}}></div>
            <textarea placeholder="Geri Bildiriminiz" id="textAreaID" style={{ width: "300px", height: "300px" }}>
            </textarea>
            <div style={{paddingTop:"2em"}}></div>
            <button className="gonderbutton" onClick={buttonClickEvent}>Gönder!</button>
            <div style={{paddingTop:"2em"}}></div>
            <div style={{paddingTop:"2em"}}></div>
            <header className="navbarheader">Referanslar</header>
            <div style={{paddingTop:"2em"}}></div>
            Seçim tekerleği:
            <div></div>
            F. Frankie. (2020, July 19). Make a lucky wheel to solve your lunch dilemma by using react and react-spring. Medium. https://frankie95.medium.com/make-a-lucky-wheel-to-solve-your-lunch-dilemma-by-using-react-and-react-spring-29b611a5aaed
            <ToastContainer />
        </div>
    );
}

const buttonClickEvent = () => {
    const innerText = document.getElementById("textAreaID").value;
    const name = document.getElementById("textAreaID2").value;
    if (innerText.length == 0) {
        toast.warning("Lütfen alana geri bildiriminizi yazdıktan sonra \"Gönder\" tuşuna basınız.");
    }
    else {
        toast.success("Geri bildiriminiz için teşekkür ederiz!");
        const params = { filters: "name: " + name + " feedback: " + innerText};
        axios.post('http://localhost:8080/geribildirim', params)
            .then(function (response) {
            });
    }
}



export default App;
