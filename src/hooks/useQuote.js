import { useState, useEffect } from "react";
import axios from "axios";

const useQuote = () => {
  const [quoteData, setQuoteData] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchQuote = async () => {
      setStatus("pending");
      try {
        const response = await axios.get("https://api.quotable.io/random");
        setQuoteData(response.data.content); // Correctly fetch quote content
        setStatus("success");
        setError(null);
      } catch (err) {
        setStatus("error");
        setError(err.message || "Failed to fetch the quote");
      }
    };

    fetchQuote();
  }, []);

  return { quoteData, status, error };
};

export default useQuote;
