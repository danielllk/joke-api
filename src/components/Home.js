import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

import ReactStars from "react-rating-stars-component";

import clownIcon from "../img/clown.svg";

export default function Home() {
  let history = useHistory();
  const [joke, setJoke] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [savedJokes, setSavedJokes] = useState(
    JSON.parse(localStorage.getItem("data")) || []
  );
  const [saveActive, setSaveActive] = useState(false);

  //fetch jokes
  const fetchJokes = async () => {
    setIsLoading(true);

    try {
      const res = await axios("https://v2.jokeapi.dev/joke/Any?type=single");
      setJoke(res.data.joke);
      saveToLocalStorage();
    } catch (error) {}

    setIsLoading(false);
  };
  useEffect(() => {
    fetchJokes();
  }, []);

  //set jokes, rating
  const setJokeScore = (newRating) => {
    let text = document.getElementById("joke-test").textContent;
    //save joke to state
    setSavedJokes((oldJoke) => [...oldJoke, { joke: text, rating: newRating }]);

    //set save button dsiplay
    setSaveActive(true);
  };

  //save joke to local storage and fetch data
  const saveJoke = () => {
    saveToLocalStorage();
    setSaveActive(false);
    fetchJokes();
  };

  //go to next joke
  const nextJoke = () => {
    setSaveActive(false);
    fetchJokes();
  };

  //save to local storage
  const saveToLocalStorage = () => {
    //save local storage
    localStorage.setItem("data", JSON.stringify(savedJokes));
  };

  //go to library
  const goToLibrary = () => {
    history.push("/library");
    saveToLocalStorage();
  };

  return (
    <div className="Home">
      <div className="joke-container">
        {isLoading ? (
          "loading..."
        ) : (
          <div>
            <div>
              <div onClick={goToLibrary} className="go-library">
                <img src={clownIcon} alt="my library" className="img-library" />
                <p>My library</p>
              </div>
              <p id="joke-test">{joke}</p>
              <div>
                <ReactStars
                  count={5}
                  onChange={setJokeScore}
                  size={24}
                  activeColor="#ffd700"
                />
              </div>
              <button
                onClick={saveJoke}
                className={`${!saveActive ? "save-btn-disable" : ""}`}
              >
                Save
              </button>
              <button onClick={nextJoke}>Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
