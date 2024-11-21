import useQuote from "./useQuote";

const useCachedQuoteSometimes = () => {
  const { quoteData, status, error } = useQuote();

  const cachedQuote = localStorage.getItem("cachedQuote");
  const cachedTime = localStorage.getItem("cachedQuoteTime");

  const expiryTime = 5 * 60 * 1000; // Cache expiry time set to 5 minutes

  if (status === "error" && cachedQuote && Date.now() - cachedTime < expiryTime) {
    return { quoteData: JSON.parse(cachedQuote), status: "success" };
  }

  if (status === "success") {
    localStorage.setItem("cachedQuote", JSON.stringify(quoteData));
    localStorage.setItem("cachedQuoteTime", Date.now().toString());
  }

  return { quoteData, status, error };
};

export default useCachedQuoteSometimes;
