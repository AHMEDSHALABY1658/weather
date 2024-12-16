// import
import logo from './logo.svg';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios, { Axios } from 'axios';
import { useTranslation } from 'react-i18next';



import moment from "moment";
import "moment/min/locales";





const theme = createTheme({
  typography: {
    fontFamily: ["IBM"]
  }
})
let cancelAxios = null

function App() {


  const { t, i18n } = useTranslation();

  const dateAndTime = moment().format('MMMM Do YYYY, h:mm:ss a');
  const [temp, setTemp] = useState({
    number: null,
    description: "",
    min: null,
    max: null,
    icon: null,
  })
  const [locale, setlocale] = useState("en")

  function handelLanguageClick() {
    if (locale == "en") {
      setlocale("ar")
      i18n.changeLanguage("ar")
      moment.locale("ar");
    } else {
      setlocale("en")
      i18n.changeLanguage("en")
      moment.locale("en");
    }
  }
  useEffect(() => {
    i18n.changeLanguage("locale")
  }, [])

  useEffect(() => {
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=30.06263&lon=31.24967&appid=04435321563dbb207e17855d884ee5ee", {
      cancelToken: new axios.CancelToken((c) => {
        cancelAxios = c
      }),

    }
    )
      .then(function (response) {
        // handle success
        const responsTemp = Math.round(response.data.main.temp - 272.15)
        const min = Math.round(response.data.main.temp_min - 272.15)
        const max = Math.round(response.data.main.temp_max - 272.15)
        const description = response.data.weather[0].description
        const responseIcon = response.data.weather[0].icon
        setTemp({
          number: responsTemp,
          description: description,
          min: min,
          max: max,
          icon: `https://openweathermap.org/img/wn/${responseIcon}@2x.png`
        })
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
    return () => {
      cancelAxios();
    }
  }, [])


  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" >
          {/* center */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", flexDirection: "column" }}>
            {/* card */}
            <div className='card'   >
              {/* content */}
              <div>
                <div style={{ display: "flex", alignItems: "end", justifyContent: "start" }} dir={locale == "ar" ? "rtl" : "ltr"}>
                  <Typography variant="h2" style={{ marginRight: "20px", fontWeight: "600" }}>
                    {t("cairo")}
                  </Typography>
                  <Typography variant="h5" style={{ marginRight: "20px", fontSize: "21px" }}>
                    {dateAndTime}
                  </Typography>
                </div>
                <hr />
              </div >
              {/*==== content== */}
              <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }} dir={locale == "ar" ? "rtl" : "ltr"}>
                <div>
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography variant="h1" style={{ textAlign: "right" }}>
                      {temp.number}

                    </Typography>
                    <img src={temp.icon} alt="" />
                  </div>
                  <div>
                    <Typography variant="h6" >
                      {t(temp.description)}
                    </Typography>
                    {/* min and max */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "98%" }}>
                      <h5>{t("min")}:  {temp.min}</h5>
                      <h5> |</h5>
                      <h5>   {t("max")}: {temp.max}</h5>
                    </div>
                  </div>
                </div>

                <CloudIcon style={{ fontSize: "200px", color: "white" }} />
              </div>
            </div>
            {/* ====card ====*/}
            <div dir='rtl' style={{ display: "flex", justifyContent: "end", width: "100%", marginTop: "20px" }}>
              <Button variant="text" style={{ color: "white" }} onClick={handelLanguageClick}>{locale == "en" ? "Arabic" : "انجليزي"}</Button>
            </div>

          </div>
          {/*=== center ====*/}
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
