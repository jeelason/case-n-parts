import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

import blackCase from "./images/outer-case/black.png";
import pinkCase from "./images/outer-case/pink.png";
import greenCase from "./images/outer-case/green.png";
import { basePath } from "./basePath";
function HomePage() {
  const [builds, setTopBuilds] = useState([]);

  useEffect(() => {
    const getTopBuildData = async () => {
      const topBuildResponse = await fetch(`${basePath}/api/topbuilds`);
      const topBuildData = await topBuildResponse.json();
      setTopBuilds(topBuildData.builds);
    };
    getTopBuildData();
  }, []);
  return (
    <>
      <h1>Top 3 Builds</h1>
      <div className="container d-flex justify-content-center">
        <div className="row">
          {builds.map((build) => {
            return (
              <div className="col py-3 justify-content-center" key={build.id}>
                <div className="card h-100 border-light bg-transparent">
                  <img
                    src={build.picture}
                    className="card-img-top p-3"
                    alt="..."
                  />
                  <div className="card-body">
                    <h5 className="card-title text-info">{build.Name}</h5>
                    <p className="card-text text-primary">{build.username}</p>
                    <Link
                      to={`/builds/detailbuild/${build.id}`}
                      className="btn btn-outline-primary"
                    >
                      Build Detail
                    </Link>
                    <div className=" btn-no-hover btn btn-primary active mx-1">
                      <i className="bi bi-hand-thumbs-up"></i>
                      {build.likes}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {/* <div className='col-sm'>
            <div className='card card-homepage'>
              <h5 className='card-title'>Chad's Build</h5>
            </div>
          </div>
          <div className='col-sm'>
            <div className='card card-homepage'>
              <h5 className='card-title'>Chad's Build</h5>
            </div>
          </div>
          <div className='col-sm'>
            <div className='card card-homepage'>
              <h5 className='card-title'>Chad's Build</h5>
            </div>
          </div> */}
        </div>
      </div>
      <div className="our-cases">
        <h1>Our Case Colors</h1>
        <div
          id="case-carousel"
          className="carousel slide pb-5"
          data-bs-ride="carousel"
          data-bs-interval="false"
        >
          <div className="carousel-indicators">
            <button
              type="button"
              data-bs-target="#case-carousel"
              data-bs-slide-to="0"
              className="active"
              aria-current="true"
              aria-label="Slide 1"
            ></button>
            <button
              type="button"
              data-bs-target="#case-carousel"
              data-bs-slide-to="1"
              aria-label="Slide 2"
            ></button>
            <button
              type="button"
              data-bs-target="#case-carousel"
              data-bs-slide-to="2"
              aria-label="Slide 3"
            ></button>
          </div>
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={blackCase} alt="an case" className="img-fluid" />
            </div>
            <div className="carousel-item">
              <img src={pinkCase} alt="an case2" className="img-fluid" />
            </div>
            <div className="carousel-item">
              <img src={greenCase} alt="an case3" className="img-fluid" />
            </div>
          </div>
          <button
            className="carousel-control-prev w-50"
            type="button"
            data-bs-target="#case-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next w-50"
            type="button"
            data-bs-target="#case-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;
