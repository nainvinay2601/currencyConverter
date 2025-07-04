import { useEffect, useState } from "react";
import axios from "axios";

function useCurrencyInfo(currency) {
  const [data, setData] = useState({});

  useEffect(() => {
    // Axios GET request
    axios.get(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    )
      .then((response) => {
        setData(response.data[currency]); // Axios stores response data in .data property
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  }, [currency]);

  return data;
}

export default useCurrencyInfo;