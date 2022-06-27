import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useApiData from "../parts/ApiFetch";

import black from "../images/inner-case/pc-case-with-mobo-black.png";
import pink from "../images/inner-case/pc-case-with-mobo-pink.png";
import green from "../images/inner-case/pc-case-with-mobo-green.png";

import { basePath } from "../basePath";

const caseColors = {
  black,
  green,
  pink,
};

const gpuSlots = {
  "Dual Slot": 2,
  "Triple Slot": 3,
};

function UpdateBuild() {
  const [build, setBuild] = useState({
    Name: "",
    psu: null,
    gpu: null,
    cpu: null,
    hdd: "",
    ram: null,
    moboid: 1,
    color: "",
    size: "",
    picture: "",
    Private: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const [successfulSubmit, setSuccessfulSubmit] = useState(false);

  useEffect(() => {
    const getBuildData = async () => {
      const buildResponse = await fetch(`${basePath}/api/build/${id}`, {
        credentials: "include",
      });
      const buildData = await buildResponse.json();
      setBuild(buildData);
    };

    getBuildData();
  }, [id]);

  const [gpus] = useApiData({ url: `${basePath}/api/gpus`, prop: "gpus" });
  const [cpus] = useApiData({ url: `${basePath}/api/cpus`, prop: "cpus" });
  const [psus] = useApiData({ url: `${basePath}/api/psus`, prop: "psus" });
  const [rams] = useApiData({ url: `${basePath}/api/rams`, prop: "rams" });
  const [hdds] = useApiData({ url: `${basePath}/api/hdds`, prop: "hdds" });
  const [colors] = useApiData({
    url: `${basePath}/api/color`,
    prop: "colors",
  });
  const [sizes] = useApiData({ url: `${basePath}/api/size`, prop: "sizes" });
  const [caseImages] = useApiData({
    url: `${basePath}/api/caseimage`,
    prop: "caseimages",
  });
  // const mobos = useApiData({ url: `${basePath}/api/mobos`, prop: "mobos" });

  const handleGpuClick = (gpu) => {
    setBuild((build) => ({
      ...build,
      gpu,
      // gpu: {
      //   ...gpu,
      //   cardcount: 1,
      // },
    }));
  };

  const handleCpuClick = (cpu) => {
    setBuild((build) => ({
      ...build,
      cpu,
    }));
  };

  const handlePsuClick = (psu) => {
    setBuild((build) => ({
      ...build,
      psu,
    }));
  };

  const handleRamClick = (ram) => {
    setBuild((build) => ({
      ...build,
      ram,
    }));
  };

  const handleHddClick = (hdd) => {
    setBuild((build) => ({
      ...build,
      hdd,
    }));
  };

  const handleColorChange = ({ target: { value: selectedColor } }) => {
    const { id: selectedId, name: selectedName } = colors.find(
      (color) => color.name === selectedColor
    );

    const picture = caseImages.find(
      (caseImage) => caseImage.id === selectedId
    ).id;
    setBuild((build) => ({
      ...build,
      color: selectedName,
      picture,
    }));
  };

  const handleNameChange = (event) => {
    setBuild((build) => ({
      ...build,
      Name: event.target.value,
    }));
  };

  const handleSizeChange = ({ target: { value: selectedSize } }) => {
    setBuild((build) => ({
      ...build,
      size: selectedSize,
    }));
  };

  const handlePrivateChange = (event) => {
    const value = event.target.checked;
    setBuild((build) => ({
      ...build,
      Private: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const buildPutData = {
      Name: build.Name,
      psuid: build.psu.id,
      gpuid: build.gpu.id,
      cardcount: build.gpu.cardcount,
      cpuid: build.cpu.id,
      ramid: build.ram.id,
      ramcount: build.ram.ramcount,
      hddid: build.hdd.id,
      hddcount: 1,
      moboid: 1,
      size: sizes.find((size) => size.name === build.size).id,
      color: colors.find((color) => color.name === build.color).id,
      picture: caseImages.find((image) => image.picture.includes(build.color))
        .id,
      Private: build.Private,
    };

    const buildUrl = `${basePath}/api/build/${id}`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify(buildPutData),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    };
    const response = await fetch(buildUrl, fetchConfig);
    if (response.ok) {
      navigate(`/builds/detailbuild/${id}`, { replace: true });
    }
  };

  let alertClasses = "alert alert-success d-none mb-0";
  let alertContainerClasses = "d-none";

  if (successfulSubmit) {
    alertClasses = "alert alert-success mb-3";
    alertContainerClasses = "";
  }
  return (
    <div className="container my-5">
      {build !== undefined && (
        <div className="row py-5 g-4 mt-4">
          <form onSubmit={handleSubmit} id="create-build-form">
            <div className="col-sm-1 my-25"></div>
            <div className="row justify-content-md-center">
              <div className="col-md-auto">
                <img
                  src={build.color ? caseColors[build.color] : caseColors.black}
                  alt="pc case"
                  width="500"
                />
              </div>
              <div className="col-md-auto">
                <input
                  onChange={handleNameChange}
                  value={build.Name}
                  placeholder="PC Name"
                  required
                  name="name"
                  id="name"
                  className="form-control w-75 mb-2 bg-dark text-white border-secondary"
                />
                <select
                  onChange={handleColorChange}
                  value={build.color}
                  name="color"
                  id="color"
                  className="form-select w-75 mb-2 bg-dark text-white border-secondary"
                  required
                >
                  <option value="">Case color</option>
                  {colors.map((color) => {
                    return (
                      <option key={color.id} value={color.name}>
                        {color.name}
                      </option>
                    );
                  })}
                </select>
                <select
                  onChange={handleSizeChange}
                  value={build.size}
                  name="size"
                  id="size"
                  className="form-select w-75 bg-dark text-white border-secondary"
                  required
                >
                  <option value="">Case size</option>
                  {sizes.map((size) => {
                    return (
                      <option key={size.id} value={size.name}>
                        {size.name}
                      </option>
                    );
                  })}
                </select>
                <div className="col-sm-1 w-75 pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                  >
                    {build.mobo ? `MOBOS: ${build.mobo.brand}` : "MOBOS"}
                  </button>
                </div>
                <div className="col-sm-1 w-75 pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#psuModal"
                  >
                    {build.psu ? `PSU: ${build.psu.wattage}` : "PSU"}
                  </button>
                  <div
                    className="modal fade"
                    id="psuModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-min-width">
                      <div className="modal-content">
                        <div className="modal-header bg-secondary">
                          <h5 className="modal-title" id="exampleModalLabel">
                            PSU
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>{" "}
                        </div>
                        <div className="modal-body bg-secondary">
                          {" "}
                          <div className="table-responsive">
                            <table className="table table-hover table-dark">
                              <thead>
                                <tr>
                                  <th>Brand</th>
                                  <th>Wattage</th>
                                  <th>Atx Connector</th>
                                  <th>Atx 12v Connector</th>
                                  <th>Graphics Connector</th>
                                  <th>Molex Connector</th>
                                  <th>Sata Connector</th>
                                </tr>
                              </thead>
                              <tbody>
                                {psus.map((psu) => {
                                  return (
                                    <tr
                                      key={psu.id}
                                      onClick={() => handlePsuClick(psu)}
                                      data-bs-dismiss="modal"
                                      // className={
                                      //   build.psu.id === psu.id
                                      //     ? "selected-list-item"
                                      //     : undefined
                                      // }
                                    >
                                      <td>{psu["brand"]}</td>
                                      <td>{psu["wattage"]}</td>
                                      <td>{psu["atx_connector"]}</td>
                                      <td>{psu["atx_12v_connector"]}</td>
                                      <td>{psu["graphics_connector"]}</td>
                                      <td>{psu["molex_connector"]}</td>
                                      <td>{psu["sata_connector"]}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 w-75 pt-2">
                  <button
                    type="button"
                    className="btn btn-outline-secondary w-100"
                    data-bs-toggle="modal"
                    data-bs-target="#cpuModal"
                  >
                    {build.cpu ? `CPU: ${build.cpu.processor}` : "CPU"}
                  </button>
                  <div
                    className="modal fade"
                    id="cpuModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-min-width">
                      <div className="modal-content">
                        <div className="modal-header bg-secondary">
                          <h5 className="modal-title" id="exampleModalLabel">
                            CPU
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-secondary">
                          <div className="table-responsive">
                            <table className="table table-hover table-dark">
                              <thead>
                                <tr>
                                  <th>Processor</th>
                                  <th>Cores</th>
                                  <th>Threads</th>
                                  <th>Speed</th>
                                  <th>Socket Type</th>
                                </tr>
                              </thead>
                              <tbody>
                                {cpus.map((cpu) => {
                                  return (
                                    <tr
                                      key={cpu.id}
                                      onClick={() => handleCpuClick(cpu)}
                                      data-bs-dismiss="modal"
                                      // className={
                                      //   build.cpu.id === cpu.id
                                      //     ? "selected-list-item"
                                      //     : undefined
                                      // }
                                    >
                                      <td>{cpu["processor"]}</td>
                                      <td>{cpu["cores"]}</td>
                                      <td>{cpu["threads"]}</td>
                                      <td>{cpu["speed"]}</td>
                                      <td>{cpu["socket_type"]}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md w-75 pt-2">
                  <div className="btn-group dropend w-100">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-75"
                      data-bs-toggle="modal"
                      data-bs-target="#gpuModal"
                    >
                      {build.gpu ? `GPU: ${build.gpu.chipset}` : "GPU"}
                    </button>
                    {build.mobo && build.gpu && (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split w-25"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="pe-2">{build.gpu.cardcount}</span>
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu bg-dark ms-2 text-white">
                          <span>
                            {Array.from(
                              Array(
                                Math.floor(
                                  build.mobo.pcie_slots /
                                    gpuSlots[build.gpu.width]
                                )
                              )
                            ).map((_, i) => (
                              <button
                                key={i}
                                type="button"
                                className="btn btn-sm btn-secondary mx-2"
                                onClick={() => {
                                  setBuild((build) => ({
                                    ...build,
                                    gpu: {
                                      ...build.gpu,
                                      cardcount: i + 1,
                                    },
                                  }));
                                }}
                              >
                                {i + 1}
                              </button>
                            ))}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className="modal fade"
                    id="gpuModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-min-width">
                      <div className="modal-content">
                        <div className="modal-header bg-secondary">
                          <h5 className="modal-title" id="exampleModalLabel">
                            GPU
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-secondary container">
                          <div className="table-responsive">
                            <table className="table table-hover table-dark">
                              <thead>
                                <tr>
                                  <th>Manufacturer</th>
                                  <th>Chipset</th>
                                  <th>Core Clock Speed</th>
                                  <th>Video Memory</th>
                                  <th>Memory Type</th>
                                  <th>Height</th>
                                  <th>Length</th>
                                  <th>Width</th>
                                  <th>Hdmi Ports</th>
                                  <th>Display Ports</th>
                                </tr>
                              </thead>
                              <tbody>
                                {gpus.map((gpu) => {
                                  return (
                                    <tr
                                      key={gpu.id}
                                      onClick={() => handleGpuClick(gpu)}
                                      data-bs-dismiss="modal"
                                      // className={
                                      //   build.gpu.id === gpu.id
                                      //     ? "selected-list-item"
                                      //     : undefined
                                      // }
                                    >
                                      <td>{gpu["manufacturer"]}</td>
                                      <td>{gpu["chipset"]}</td>
                                      <td>{gpu["core_clock_speed"]}</td>
                                      <td>{gpu["video_memory"]}</td>
                                      <td>{gpu["memory_type"]}</td>
                                      <td>{gpu["height"]}</td>
                                      <td>{gpu["length"]}</td>
                                      <td>{gpu["width"]}</td>
                                      <td>{gpu["hdmi"]}</td>
                                      <td>{gpu["display_port"]}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 w-75 pt-2">
                  <div className="btn-group dropend w-100">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-75"
                      data-bs-toggle="modal"
                      data-bs-target="#hddModal"
                    >
                      {build.hdd ? `HDD: ${build.hdd.capacity}` : "HDD"}
                    </button>
                  </div>
                  <div
                    className="modal fade"
                    id="hddModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-min-width">
                      <div className="modal-content">
                        <div className="modal-header bg-secondary">
                          <h5 className="modal-title" id="exampleModalLabel">
                            HDD
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-secondary">
                          <div className="table-responsive">
                            <table className="table table-hover table-dark">
                              <thead>
                                <tr>
                                  <th>Brand</th>
                                  <th>Capacity</th>
                                  <th>Interface</th>
                                  <th>Cache</th>
                                  <th>Rpm</th>
                                </tr>
                              </thead>
                              <tbody>
                                {hdds.map((hdd) => {
                                  return (
                                    <tr
                                      key={hdd.id}
                                      onClick={() => handleHddClick(hdd)}
                                      data-bs-dismiss="modal"
                                      // className={
                                      //   build.hdd.id === hdd.id
                                      //     ? "selected-list-item"
                                      //     : undefined
                                      // }
                                    >
                                      <td>{hdd["brand"]}</td>
                                      <td>{hdd["capacity"]}</td>
                                      <td>{hdd["interface"]}</td>
                                      <td>{hdd["cache"]}</td>
                                      <td>{hdd["rpm"]}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 w-75 pt-2">
                  <div className="btn-group dropend w-100">
                    <button
                      type="button"
                      className="btn btn-outline-secondary w-75"
                      data-bs-toggle="modal"
                      data-bs-target="#ramModal"
                    >
                      {build.ram ? `RAM: ${build.ram.memory_type}` : "RAM"}
                    </button>
                    {build.mobo && build.ram && (
                      <>
                        <button
                          type="button"
                          className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split w-25"
                          data-bs-toggle="dropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          <span className="pe-2">{build.ram.ramcount}</span>
                          <span className="sr-only">Toggle Dropdown</span>
                        </button>
                        <div className="dropdown-menu bg-dark ms-2 text-white">
                          <span>
                            {Array.from(Array(build.mobo.memory_slots)).map(
                              (_, i) => (
                                <button
                                  key={i}
                                  type="button"
                                  className="btn btn-sm btn-secondary mx-2"
                                  onClick={() => {
                                    setBuild((build) => ({
                                      ...build,
                                      ram: {
                                        ...build.ram,
                                        ramcount: i + 1,
                                      },
                                    }));
                                  }}
                                >
                                  {i + 1}
                                </button>
                              )
                            )}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                  <div
                    className="modal fade"
                    id="ramModal"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-min-width">
                      <div className="modal-content">
                        <div className="modal-header bg-secondary">
                          <h5 className="modal-title" id="exampleModalLabel">
                            RAM
                          </h5>
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <div className="modal-body bg-secondary">
                          <div className="table-responsive">
                            <table className="table table-hover table-dark">
                              <thead>
                                <tr>
                                  <th>Brand</th>
                                  <th>Memory Type</th>
                                  <th>Memory Speed</th>
                                  <th>Memory Channels</th>
                                  <th>Pin Configuration</th>
                                </tr>
                              </thead>
                              <tbody>
                                {rams.map((ram) => {
                                  return (
                                    <tr
                                      key={ram.id}
                                      onClick={() => handleRamClick(ram)}
                                      data-bs-dismiss="modal"
                                      // className={
                                      //   build.ram.id === ram.id
                                      //     ? "selected-list-item"
                                      //     : undefined
                                      // }
                                    >
                                      <td>{ram["brand"]}</td>
                                      <td>{ram["memory_type"]}</td>
                                      <td>{ram["memory_speed"]}</td>
                                      <td>{ram["memory_channels"]}</td>
                                      <td>{ram["pin_configuration"]}</td>
                                    </tr>
                                  );
                                })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-check d-flex pt-2">
                    <input
                      className="form-check-input me-2"
                      type="checkbox"
                      checked={build.Private}
                      id="flexCheckDefault"
                      onChange={handlePrivateChange}
                    ></input>
                    <label
                      className="form-check-label text-secondary"
                      htmlFor="flexCheckDefault"
                    >
                      Private
                    </label>
                  </div>
                </div>
              </div>
              <div className="row justify-content-md-center">
                <div className="col-sm-1 pt-2 w-50">
                  <button
                    className="btn btn-outline-primary w-100 mt-4"
                    onSubmit={handleSubmit}
                    id="create-pc-build"
                  >
                    Update
                  </button>
                  <div className={alertContainerClasses}>
                    <div className={alertClasses} id="success-message">
                      Build created successfully
                    </div>
                    <div className="d-flex justify-content-between">
                      <Link to="/builds/create">
                        <button
                          onClick={() => setSuccessfulSubmit(false)}
                          className="btn btn-outline-primary"
                        >
                          Make new build
                        </button>
                      </Link>
                      <Link to="/builds/mybuilds">
                        <button className="btn btn-outline-primary float-right">
                          View my builds
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default UpdateBuild;
