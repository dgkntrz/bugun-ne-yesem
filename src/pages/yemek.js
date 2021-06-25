import React, { Fragment, useState, useEffect } from "react";
import { animated, useSpring } from "react-spring";
import "../App.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import parse from 'html-react-parser';


var storage = window.localStorage;

const DEFAULT = "default_list";
let x = 0;
let checkBoxes = [false, false, false, false, false, false];
let checkList = ["et", "balık", "tavuk", "bulgur", "sosis", "kıyma"];

let maksimumYemek = 4;
let f = 0;
let k = 0;
let transformString = "";
let rotating = false;
let first = false;
// const red = "#BA181B";
const red = "#000000";
const triangle = "#2C302E"
const wheel = "#FFFFFF"
const fieldcolor = "#D3D3D3"


let default_list =  [

];

const OFFSET = Math.random();

const map = function (value, in_min, in_max, out_min, out_max) {
  if (value === 0) {
    return out_min;
  }
  return ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

function App() {
  const r = 200;
  const cx = 250;
  const cy = 250;
  const [list, setList] = useState(default_list);
  setInterval(() => {
    const elements = document.getElementsByClassName("wheel");
    const st = window.getComputedStyle(elements[0], null);
    if (!first) {
      transformString = st.getPropertyValue("transform");
      first = true;
    }
    else {

      if (transformString != st.getPropertyValue("transform")) {
        console.log("1")
        f = 0;
        rotating = true;
        transformString = st.getPropertyValue("transform");
        k = 0;
      }
      else {
        if (rotating && transformString == st.getPropertyValue("transform")) {
          rotating = false;
          f = 1;
          console.log("2")
          // getWinner();
        }

      }
    }

  }, 400);

  setInterval(() => {
    if (!rotating && f == 1) {
      k = k + 1;
    }
    else if (f == 0) {
      k = 0;
    }
    if (k == 10) {
      getWinner();
      f = 0;
    }
  }, 400)

  if (x == 0) {
    const params = { filters: "et-balık-tatlı-tavuk-bulgur-sosis-kıyma-", count: maksimumYemek + "" };
    axios.post('http://172.105.247.10:8080/filters', params)
      .then(function (response) {

        default_list = response.data.toString().split("/");
        setList(default_list);
        x = 1;
      });
  }
  const [power, setPower] = useState(0);
  const [acc, setAcc] = useState(0);
  const config = { mass: 50, tension: 200, friction: 200, precision: 0.001 };
  const [props, set] = useSpring(() => ({
    transform: "rotate(0deg)",
    immediate: false,
  }));

  useEffect(() => {

  }, [props])

  useEffect(() => {

    set({
      from: { transform: `rotate(${map(acc, 0, 100, 0, 1700)}deg)` },
      transform: `rotate(${map(acc + power, 0, 100, 0, 1700)}deg)`,
      immediate: false,
      config,
    });
    setAcc(acc + power);
  }, [power]);

  const rederItems = (numOfItems) => {
    let items = [];
    for (let i = 0; i < numOfItems; i++) {
      let xLength = Math.cos(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
      let yLength = Math.sin(2 * Math.PI * (i / numOfItems + OFFSET)) * (r - 5);
      let txLength =
        Math.cos(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
      let tyLength =
        Math.sin(2 * Math.PI * ((i + 0.5) / numOfItems + OFFSET)) * (r / 2);
      let divs = "";

      for (let k = list[i].length; k < 21; k++) {
        divs += "&ensp;"
      }
      items.push(
        <Fragment key={i}>
          <line
            stroke={red}
            strokeWidth="2"
            x1={cx + xLength}
            y1={cy + yLength}
            x2={cx}
            y2={cy}
          />
          <text
            className="textstyle2"
            x={cx + txLength - 70}
            y={cy + tyLength}
            fontSize="15px"
            transform={`rotate(${((i + 0.5) / numOfItems + OFFSET) * 360} 
                  ${cx + txLength},
                  ${cy + tyLength})`}
          >
            {list[i]} {parse(divs)}
          </text>
        </Fragment>
      );
    }
    return items;
  };

  const boslukEkle = () => {
    // &ensp;
    return (<>&ensp;</>)
  }

  return (
    <div>
      
      <div style={{ display: "grid", gridTemplateColumns: "0px 500px", gridGap: 20 }}>

        <fieldset>
          <legend className="textstyle"> Filtreler </legend>
          <fieldset>
            <legend className="textstyle"> İçerikler </legend>
            <div className="textstyle"></div>
            <div>
              <input type="checkbox" id="yemek1" name="ingredient1" value="yemek1" defaultChecked={true} onChange={() => {
                checkBoxes[0] = !checkBoxes[0];
                if (checkBoxes[0]) {
                  checkList[0] = "";
                }
                else {
                  checkList[0] = "et";
                }
              }} />
              <label className="textstyle" for="yemek1">Et</label>
            </div>
            <div>
              <input type="checkbox" id="yemek2" name="ingredient2" value="yemek2" defaultChecked={true} onChange={() => {
                checkBoxes[1] = !checkBoxes[1];
                if (checkBoxes[1]) {
                  checkList[1] = "";
                }
                else {
                  checkList[1] = "balık";
                }
              }} />
              <label className="textstyle" for="yemek2">Balık</label>
            </div>
            <div>
              <input type="checkbox" id="yemek3" name="ingredient3" value="yemek3" defaultChecked={true} onChange={() => {
                checkBoxes[2] = !checkBoxes[2];
                if (checkBoxes[2]) {
                  checkList[2] = "";
                }
                else {
                  checkList[2] = "tavuk";
                }
              }} />
              <label className="textstyle" for="yemek3">Tavuk</label>
            </div>
            <div>
              <input type="checkbox" id="yemek3" name="ingredient3" value="yemek3" defaultChecked={true} onChange={() => {
                checkBoxes[3] = !checkBoxes[3];
                if (checkBoxes[3]) {
                  checkList[3] = "";
                }
                else {
                  checkList[3] = "bulgur";
                }
              }} />
              <label className="textstyle" for="yemek3">Bulgur</label>
            </div>
            <div>
              <input type="checkbox" id="yemek4" name="ingredient4" value="yemek4" defaultChecked={true} onChange={() => {
                checkBoxes[4] = !checkBoxes[4];
                if (checkBoxes[4]) {
                  checkList[4] = "";
                }
                else {
                  checkList[4] = "sosis";
                }
              }} />
              <label className="textstyle" for="yemek4" title="Sosis / Sucuk / Salam">3s</label>
            </div>
            <div>
              <input type="checkbox" id="yemek5" name="ingredient5" value="yemek5" defaultChecked={true} onChange={() => {
                checkBoxes[5] = !checkBoxes[5];
                if (checkBoxes[5]) {
                  checkList[5] = "";
                }
                else {
                  checkList[5] = "kıyma";
                }
              }} />
              <label className="textstyle" for="yemek5">Kıyma</label>
            </div>

          </fieldset>
          <div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div><div>&ensp;</div>
          <div>
            <label id="discrete-slider-small-steps" className="textstyle">
              Maksimum Yemek Miktarı
            </label>
            <Slider
              onChange={(e, val) => {
                maksimumYemek = val;
              }}

              defaultValue={4}
              getAriaValueText={""}
              aria-labelledby="discrete-slider-small-steps"
              step={1}
              marks
              min={2}
              max={8}
              valueLabelDisplay="auto"
            />
          </div>

          <button className="secondary" onClick={() => {
            let filter = "";
            for (let i = 0; i < checkList.length; i++) {
              if (!checkBoxes[i])
                filter += checkList[i] + "-";
            }
            const params = { filters: filter, count: maksimumYemek + "" };
            axios.post('http://172.105.247.10:8080/filters', params)
              .then(function (response) {
                if (response.data == "") {
                  toast.error("Filtrelerinizle eşleşen yemek bulunamadı!");
                }
                else {
                  default_list = response.data.toString().split("/");
                }
                setList(default_list);
              });
          }}>Yemekleri Yenile</button>
          <PressButton setPower={setPower} style={{ height: "20vh" }} />
        </fieldset>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 500 500"
          style={{ width: "100vw", height: "80vh" }}
        >
          <g fill={wheel} stroke={red} strokeWidth="10">
            <circle cx="250" cy="250" r={r} />
          </g>
          <animated.g
            className={"wheel"}
            style={{
              transform: props.transform,
              transformOrigin: "center",
            }}
          >
            {rederItems(list.length)}
          </animated.g>
          <g fill={triangle} stroke={triangle} strokeWidth="2">
            <polygon points="250,70 230,30 270,30" />
          </g>
        </svg>
        <ToastContainer />
      </div>
    </div>
  );
}

const PressButton = ({ setPower }) => {
  const [pressed, toggle] = useState(false);
  const [width, setWidth] = useState(0);
  const [props, set] = useSpring(() => ({
    width: "0%",
    backgroundColor: "hotpink",
  }));
  useEffect(() => {
    if (pressed)
      set({
        from: { width: "0%", backgroundColor: "hotpink" },
        to: { width: "100%", backgroundColor: "red" },
        immediate: false,
        config: { duration: 2000 },
      });
    else {
      setPower(parseInt(width));
      set({ to: { width: "0%", backgroundColor: "hotpink" }, immediate: true });
    }
  }, [pressed]);

  return (
    <button
      className="main"
      onMouseDown={() => {
        toggle(!pressed);
      }}
      onMouseUp={() => {
        toggle(!pressed);
      }}
      onTouchStart={() => {
        toggle(!pressed);
      }}
      onTouchEnd={() => {
        toggle(!pressed);
      }}
    >
      <animated.div
        className="fill"
        style={{
          width: props.width,
          background: props.backgroundColor,
        }}
      />
      <animated.div className="content">
        {props.width.interpolate((x) => {
          setWidth(parseInt(x));
          return x === "0%" ? "Döndür!" : parseInt(x) + "%";
        })}
      </animated.div>
    </button>
  );
};

function getWinner() {
  const elements = document.getElementsByClassName("textstyle2");
  let minY = 3000;
  let elem = -1;
  for (let i = 0; i < elements.length; i++) {
    if (elements[i].getBoundingClientRect().y < minY) {
      minY = elements[i].getBoundingClientRect().y;
      elem = i;
    }
  }
  toast.success("Bugünün şanslı yemeği: " + elements[elem].innerHTML.substring(0, elements[elem].innerHTML.lastIndexOf(" ")) + "!");
}

export default App;
