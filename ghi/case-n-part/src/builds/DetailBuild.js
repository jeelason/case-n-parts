import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useApiData from "../parts/ApiFetch";

import { basePath } from "../basePath";

function DetailBuild() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [userRating, setUserRating] = useState();

  const [ratingData] = useApiData({
    url: `${basePath}/api/ratings/mine`,
    prop: "ratings",
    withCredentials: true,
  });
  const [build, setBuild] = useApiData({
    url: `${basePath}/api/build/${id}`,
    defaultState: undefined,
    withCredentials: true,
  });
  const [currentUser] = useApiData({
    url: `${basePath}/users/me`,
    withCredentials: true,
  });

  useEffect(() => {
    if (!build || !ratingData || userRating !== undefined) {
      return;
    }

    const newUserRating = ratingData.find(
      (rating) => rating.buildid === build.id
    )?.liked;

    setUserRating(newUserRating);
  }, [build, ratingData, userRating]);

  const deleteBuild = async (id) => {
    await fetch(`${basePath}/api/build/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    navigate(`/builds/mybuilds`, { replace: true });
  };

  const handleUpvoteChange = async () => {
    if (userRating === undefined) {
      const ratingsUrl = `${basePath}/api/rating/create`;
      const fetchConfig = {
        method: "POST",
        body: JSON.stringify({ buildid: build.id }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      await fetch(ratingsUrl, fetchConfig);

      setUserRating(true);
      setBuild((build) => ({
        ...build,
        likes: build.likes + 1,
      }));
    } else {
      const ratingsUrl = `${basePath}/api/rating/${id}`;
      const newUserRating = !userRating;
      const fetchConfig = {
        method: "PUT",
        body: JSON.stringify({ liked: newUserRating }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      };

      await fetch(ratingsUrl, fetchConfig);

      setBuild((build) => ({
        ...build,
        likes: newUserRating ? build.likes + 1 : build.likes - 1,
      }));
      setUserRating(newUserRating);
    }
  };

  if (!build) {
    return (
      <div className="container mt-5 py-5">
        <div className="d-flex align-items-center justify-content-center">
          <div className="spinner-border text-light p-8" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-grid gap-xl-4 my-5 p-5">
      <>
        <div className="row justify-content-center">
          <div className="col-xl-4 order-xl-2 pb-4 pb-xxl-0pb-lg-4">
            <div className="card bg-dark border border-primary w-5">
              <h4 className="card-title text-white p-3">Motherboard</h4>
              <div className="d-flex flex-column card-text text-white px-4">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Brand</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.mobo.brand}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Socket Type</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.mobo.socket_type}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Max Memory</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.mobo.max_memory}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary text-nowrap p-0 m-0">
                        Max Memory Per Slot
                      </p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.mobo.max_memory}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Pci-e Slots</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.mobo.pcie_slots}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Memory Slots</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.mobo.memory_slots}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 order-first order-xl-2 pb-4 pb-xxl-0pb-lg-4">
            <div className="card bg-dark border border-primary w-5">
              <h5 className="card-title text-white p-3">{build.Name}</h5>
              <div className="d-flex flex-column card-text text-white px-4">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <img
                        className="img-fluid"
                        src={build.picture}
                        alt="pc case"
                        width="110"
                      />
                    </div>
                    <div className="d-flex flex-row justify-content-center w-100 ">
                      {currentUser.id !== build.userid && (
                        <span>
                          <p className="fs-6 p-0 m-0">
                            Total likes: {build.likes}
                          </p>

                          <button
                            onClick={() => handleUpvoteChange()}
                            className={
                              userRating
                                ? "btn btn-outline-danger m-2"
                                : "btn btn-outline-primary m-2"
                            }
                          >
                            <i
                              className={
                                userRating
                                  ? "bi bi-hand-thumbs-down pe-1"
                                  : "bi bi-hand-thumbs-up pe-1"
                              }
                            ></i>
                          </button>
                        </span>
                      )}
                      {currentUser.id === build.userid && (
                        <span>
                          <Link
                            to={`/builds/updatebuild/${build.id}`}
                            className="btn btn-primary mb-2"
                          >
                            Update Build
                          </Link>
                          <div style={{ color: "lightblue" }} className="py-2">
                            <i
                              type="button"
                              onClick={() => {
                                deleteBuild(build.id);
                              }}
                              className="fa fa-trash fa-xl"
                              aria-hidden="true"
                            ></i>
                          </div>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Builder</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.username}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Color</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.color}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Size</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.size}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-4 order-sm-2 order-2 pb-4 pb-xxl-0">
            <div className="card bg-dark border border-primary w-5">
              <h5 className="card-title text-white p-3">CPU</h5>
              <div className="d-flex flex-column card-text text-white px-4">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Processor</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.cpu.processor}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Cores</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.cpu.cores}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Threads</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.cpu.threads}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary text-nowrap p-0 m-0">Speed</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.cpu.speed}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Socket Type</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.cpu.socket_type}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-xl-4 pb-4 pb-xxl-0">
            <div className="card bg-dark border border-primary w-5">
              <h5 className="card-title text-white p-3">RAM</h5>
              <div className="d-flex flex-column card-text text-white px-4">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Brand</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.ram.brand}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Memory Type</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.ram.memory_type}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Ram Count</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.ram.ramcount}</div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Memory Speed</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.ram.memory_speed}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Memory Channels</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">
                        {build.ram.memory_channels}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 pb-4 pb-xxl-0">
            <div className="card bg-dark border border-primary w-5">
              <h5 className="card-title text-white p-3">GPU</h5>
              <div className="d-flex flex-column card-text text-white px-4">
                <div className="d-flex flex-column card-text text-white px-4">
                  <div className="row">
                    <div className="col-sm-6">
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Manufacturer</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">
                          {build.gpu.manufacturer}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Core Clock Speed</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">
                          {build.gpu.core_clock_speed}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Video Memory</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">
                          {build.gpu.video_memory}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Memory Type</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">{build.gpu.memory_type}</div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Display Ports</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">
                          {build.gpu.display_port}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Card Count</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">{build.gpu.cardcount}</div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Chipset</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">{build.gpu.chipset}</div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Height</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text text-nowrap">
                          {build.gpu.height}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Length</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text text-nowrap">
                          {build.gpu.length}
                        </div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Width</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">{build.gpu.width}</div>
                      </div>
                      <div className="d-flex flex-column align-items-center w-100 mb-3">
                        <p className="text-primary p-0 m-0">Hdmi Ports</p>
                        <hr className="w-100 p-0 m-1"></hr>
                        <div className="card-text">{build.gpu.hdmi}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 pb-4 pb-xxl-0">
            <div className="card bg-dark border border-primary w-5">
              <h5 className="card-title text-white p-3">PSU</h5>
              <div className="d-flex flex-column card-text text-white px-4">
                <div className="row">
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Brand</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.psu.brand}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Wattage</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">{build.psu.wattage}</div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary p-0 m-0">Atx Connector</p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">
                        {build.psu.atx_12v_connector}
                      </div>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary text-nowrap p-0 m-0">
                        Graphics Connector
                      </p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">
                        {build.psu.graphics_connector}
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary text-nowrap p-0 m-0">
                        Molex Connector
                      </p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">
                        {build.psu.molex_connector}
                      </div>
                    </div>
                    <div className="d-flex flex-column align-items-center w-100 mb-3">
                      <p className="text-primary text-nowrap p-0 m-0">
                        Sata Connector
                      </p>
                      <hr className="w-100 p-0 m-1"></hr>
                      <div className="card-text">
                        {build.psu.sata_connector}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default DetailBuild;
