import { useState, useEffect } from "react";

function useApiData({ url, prop, options, withCredentials, ...otherOptions }) {
  const [data, setData] = useState(
    "defaultState" in otherOptions ? otherOptions.defaultState : []
  );

  useEffect(() => {
    const getServerData = async () => {
      const apiResponse = await fetch(
        url,
        withCredentials
          ? {
              ...(options ?? {}),
              credentials: "include",
            }
          : options
      );

      const apiData = await apiResponse.json();
      if (apiResponse.ok) {
        const stateData = prop ? apiData[prop] : apiData;
        setData(stateData);
      }
    };

    getServerData();
  }, [options, prop, url, withCredentials]);

  return [data, setData];
}

export default useApiData;
