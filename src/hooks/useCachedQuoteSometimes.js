import useQuote from "./useQuote";

const useCachedQuoteSometimes = () => {
  const { quoteData, status } = useQuote();

  const cachedQuote = localStorage.getItem("cachedQuote");
  if (status === "error" && cachedQuote) {
    return { quoteData: JSON.parse(cachedQuote), status: "success" };
  }

  if (status === "success") {
    localStorage.setItem("cachedQuote", JSON.stringify(quoteData));
  }

  return { quoteData, status };
};

export default useCachedQuoteSometimes;
