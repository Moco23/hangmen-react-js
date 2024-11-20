import { useState, useEffect } from "react";
import axios from "axios";

const useQuote = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [status, setStatus] = useState("pending");

  useEffect(() => {
    const fetchQuote = async () => {
      setStatus("pending");
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setQuoteData(response.data);
        setStatus("success");
      } catch {
        setStatus("error");
      }
    };

    fetchQuote();
  }, []);

  return { quoteData, status };
};

export default useQuote;
