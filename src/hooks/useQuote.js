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
        // Change URL for testing
        const response = await axios.get("http://api.quotable.io/random"); // Koristi HTTP umjesto HTTPS
        setQuoteData(response.data.content);
        setStatus("success");
        setError(null);

        // Log the quote to the console for verification
        console.log("Dohvaćeni citat:", response.data.content);
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
