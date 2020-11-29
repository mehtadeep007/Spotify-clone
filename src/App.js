import React, { useEffect,useState } from "react";
import SpotifyWebApi from "spotify-web-api-js";
import { useStateValue } from "./StateProvider";
import './App.css';
import Login from "./Login/Login";
import Player from "./Player/Player"
import { getTokenFromResponse } from "./spotify/spotify";

const spotify = new SpotifyWebApi();

function App() {
  const [{token}, dispatch] = useStateValue();

  useEffect(()=>{
    //getting the token from url
    const hash = getTokenFromResponse();
    window.location.hash = "";  //making url empty

    let _token=hash.access_token;
    if(_token){

      spotify.setAccessToken(_token); //setting up personal token

      dispatch({
        type: "SET_TOKEN",
        token: _token,
      });

      spotify.getMyTopArtists().then((response) =>
      dispatch({
        type: "SET_TOP_ARTISTS",
        top_artists: response,
      })
    );

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });


      //updating user state using contextapi
      spotify.getMe()
      .then(user=>{
        dispatch({
          type: "SET_USER",
          user:user,
        });
      });

      spotify.getPlaylist("37i9dQZEVXcCxw3CsAmEjf")
      .then((response) =>
        dispatch({
          type: "SET_DISCOVER_WEEKLY",
          discover_weekly: response,
        })
      );

      spotify.getUserPlaylists()
      .then(playlists=>{
        dispatch({
          type: "SET_PLAYLISTS",
          playlists,
        });
      });
    }
  },[token,dispatch]);


  return (
    <div className="App">
      {
        token?(<Player spotify={spotify}/>):(<Login/>)
      }
    </div>
  );
}

export default App;
