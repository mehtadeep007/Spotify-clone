import React, { useEffect,useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import './App.css';
import Login from "./Login/Login"
import { getTokenFromResponse } from "./spotify/spotify";

const spotify = new SpotifyWebApi();

function App() {

  const[token, setToken]=useState(null);

  useEffect(()=>{
    const hash = getTokenFromResponse();
    window.location.hash = "";

    let _token=hash.access_token;
    if(_token){
      setToken(_token)

      spotify.setAccessToken(_token)

      spotify.getMe()
      .then(user=>{
        console.log("user: ",user)
      })
    }
    console.log(_token)
  },[]);


  return (
    <div className="App">
      {
        token?(<Player/>):(<Login/>)
      }
    </div>
  );
}

export default App;
