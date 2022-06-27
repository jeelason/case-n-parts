import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

import { basePath } from "../basePath";

function MyBuilds() {
  const [builds, setBuild] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

  useEffect(() => {
    const getBuildData = async () => {
      const buildResponse = await fetch(`${basePath}/api/builds/mine`, {
        credentials: "include",
      });
      const buildData = await buildResponse.json();
      setBuild(buildData.builds);
    };

    getBuildData();
  }, []);

  const deleteBuild = async (id) => {
    await fetch(`${basePath}/api/build/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    window.location.reload();
  };

  const buildsPerPage = 6;
  const pagesVisited = pageNumber * buildsPerPage;

  const displayBuilds = builds
    .slice(pagesVisited, pagesVisited + buildsPerPage)
    .map((build) => {
      if (builds.length > 0) {
        return (
          <>
            <div className="row py-3 justify-content-center" key={build.id}>
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
                  <div style={{ color: "lightblue" }} className="pt-3">
                    <i
                      type="button"
                      onClick={() => {
                        deleteBuild(build.id);
                      }}
                      className="fa fa-trash fa-xl"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return (
          <div>
            <h2>No builds available</h2>
          </div>
        );
      }
    });

  const pageCount = Math.ceil(builds.length / buildsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="container pt-5 my-5">
        <div className="row row-cols-3">{displayBuilds}</div>
      </div>
      <div className="centerPagination">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
        />
      </div>
    </>
  );
}
export default MyBuilds;
