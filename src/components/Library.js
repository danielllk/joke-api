import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import ReactStars from "react-rating-stars-component";

import homeIcon from "../img/home.svg";

import deleteIcon from "../img/delete.svg";
export default function Library() {
  let history = useHistory();
  const [data] = useState(JSON.parse(localStorage.getItem("data")));
  const [changeFilter, setChangeFilter] = useState(0);

  //chage filter
  const activeFilterHandler = (e) => {
    setChangeFilter(e);
  };

  //go home
  const goToHome = () => {
    history.push("/");
  };

  //clean local storage
  const deleteStorage = () => {
    var answer = window.confirm("Delete all Jokes?");
    if (answer) {
      localStorage.clear();
      window.location.reload();
    }
  };
  return (
    <div className="Library">
      <img
        src={deleteIcon}
        alt="delete"
        className="img-delete"
        onClick={deleteStorage}
      />
      <div className="library-container">
        <div onClick={goToHome} className="go-home">
          <img src={homeIcon} alt="my library" className="img-home" />
          <p>Home</p>
        </div>
        <p className="filter-by">Filter by stars</p>
        <div className="filter-stars">
          <div
            onClick={() => activeFilterHandler(1)}
            className="filter-star"
            id="1"
          >
            <ReactStars
              count={1}
              size={24}
              activeColor="#ffd700"
              value={1}
              edit={false}
            />
          </div>
          <div onClick={() => activeFilterHandler(2)} className="filter-star">
            <ReactStars
              count={2}
              size={24}
              activeColor="#ffd700"
              value={2}
              edit={false}
            />
          </div>
          <div onClick={() => setChangeFilter(3)} className="filter-star">
            <ReactStars
              count={3}
              size={24}
              activeColor="#ffd700"
              value={3}
              edit={false}
            />
          </div>
          <div onClick={() => setChangeFilter(4)} className="filter-star">
            <ReactStars
              count={4}
              size={24}
              activeColor="#ffd700"
              value={4}
              edit={false}
            />
          </div>
          <div onClick={() => setChangeFilter(5)} className="filter-star">
            <ReactStars
              count={5}
              size={24}
              activeColor="#ffd700"
              value={5}
              edit={false}
            />
          </div>
        </div>
        {data
          ? data
              .filter((item) =>
                changeFilter === 0
                  ? item.rating >= changeFilter
                  : item.rating === changeFilter
              )
              .map((item, i) => (
                <div key={i} className="chosen-joke-box">
                  <p>{item.joke}</p>
                  <div
                    className={`${
                      changeFilter <= 0 ? "stars-active" : "stars-disable"
                    }`}
                  >
                    <ReactStars
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                      value={changeFilter === 0 ? item.rating : changeFilter}
                      edit={false}
                    />
                  </div>
                </div>
              ))
          : "Please, add some jokes to your library"}
      </div>
    </div>
  );
}
