"use client";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";

export default function Home() {
  const [result, setResult] = useState(null);
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const URL = `https://api.frankfurter.app/latest?amount=${amount}&from=${from}&to=${to}`;
  const [isLoading, setIsLoading] = useState(false);
  useEffect(
    function () {
      async function getExchangeResults() {
        setIsLoading(true);
        try {
          const res = await fetch(URL);
          if (!res.ok)
            throw new Error(
              "Something went wrong exchanging the amount entered"
            );
          const data = await res.json();
          if (res.status === "False") throw new Error("Unexpected error");
          setResult(data.rates[to]);
        } catch (err) {
          setResult(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (from === to) {
        setResult(amount);
        return;
      }
      if (amount === 0) return;
      getExchangeResults();
    },
    [amount, from, to]
  );

  const handleInput = (event) => {
    const value = Number(event.target.value);
    if (value > 0) {
      setAmount(value);
    } else {
      setAmount(0);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Please enter an amount..."
        style={{ width: "160px" }}
        value={amount}
        onChange={handleInput}
      />
      <select value={from} onChange={(e) => setFrom(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={to} onChange={(e) => setTo(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {result
            ? `${result} ${to}`
            : "Please enter a value and select the currency exchange"}
        </p>
      )}
    </div>
  );
}
