import { useEffect } from "react";
import SelectCurrency from "./SelectCurrency";
import { useState } from "react";

export default function ConverterForm() {
  const [amount, setAmount] = useState(100);
  const [result, setResult] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("PKR");
  const [isLoading, setIsLoading] = useState(false);

  // Swap the values of fromCurrency and toCurrency ...
  function handleSwapCurrency() {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  }

  // Function to fetch the exchange rate and update the result ...
  async function getExchangeRate() {
    const API_KEY = "b1fac69b85f26798ff9ef9ff";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    setIsLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw Error("Something went wrong!");
      const data = await res.json();
      const rate = (data.conversion_rate * amount).toFixed(2);
      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching exchange rate:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Handle form submission ...
  function handleSubmit(e) {
    e.preventDefault();
    getExchangeRate();
  }

  // Fetch exchange rate on Initial render
  useEffect(() => getExchangeRate, []);

  return (
    <form action="#" className="converter-form" onSubmit={handleSubmit}>
      <span className="form-section">
        <label className="form-label">Enter Amount</label>
        <input
          type="number"
          className="form-input"
          min={0}
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </span>

      <div className="flex">
        <span className="form-section">
          <label className="form-label">From</label>
          <SelectCurrency
            selectedCurrency={fromCurrency}
            handleCurrency={setFromCurrency}
          />
        </span>

        <div className="swap-icon" onClick={handleSwapCurrency}>
          <svg
            width="16"
            viewBox="0 0 20 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.13 11.66H.22a.22.22 0 0 0-.22.22v1.62a.22.22 0 0 0 .22.22h16.45l-3.92 4.94a.22.22 0 0 0 .17.35h1.97c.13 0 .25-.06.33-.16l4.59-5.78a.9.9 0 0 0-.7-1.43zM19.78 5.29H3.34L7.26.35A.22.22 0 0 0 7.09 0H5.12a.22.22 0 0 0-.34.16L.19 5.94a.9.9 0 0 0 .68 1.4H19.78a.22.22 0 0 0 .22-.22V5.51a.22.22 0 0 0-.22-.22z"
              fill="#fff"
            />
          </svg>
        </div>

        <span className="form-section">
          <label className="form-label">To</label>
          <SelectCurrency
            selectedCurrency={toCurrency}
            handleCurrency={setToCurrency}
          />
        </span>
      </div>

      <button
        type="submit"
        className={`${isLoading ? "loading" : ""} submit-btn`}
      >
        Get Exchange Rate
      </button>

      <p className="exchange-rate-result">
        {isLoading ? "Getting exchange rate..." : result}
      </p>
    </form>
  );
}
