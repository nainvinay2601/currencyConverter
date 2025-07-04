import React, { useId } from "react";

const InputBox = ({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = "",
}) => {
  //All the props that are involved in the input field
  // we have a label , a input field to enter currency amount, the field to set currency type, and what should happen when currency is changed

  // use of the id  hook that generates the random id which we can use

  const id = useId();

  return (
    <div className={`${className} bg-white p-3 rounded-lg text-sm flex`}>
      <div className="w-1/2">
        <label htmlFor={id} className="text-black/40 mb-2 inline-block">
          {
            // dont wanna hard code as it contain 2 label, from and to
            label
          }
        </label>
        <input
          id={id}
          type="number"
          className="outline-none w-full bg-gray-100/50 rounded-lg py-1.5"
          placeholder="Amount"
          disabled={amountDisabled}
          value={amount}
          // but for the amount change we need to listen to an event so adding onChange of amount event
          //   onChange={onAmountChange} -> cant use it like this tho
          // need to pass a callback so it doesn't auto run
          onChange={
            (event) =>
              // onAmountChange && onAmountChange(event.target.value) -> we need a number and this will give us a string so we need to type cast this into a numner
              onAmountChange && onAmountChange(Number(event.target.value)) // safety checks that if the onAmountChange exist then go and implement the function
          }
        />
      </div>
      {/* currency type change container */}
      <div className="w-1/2 flex flex-col items-end">
        <p className="text-black/40 text-sm mb-2">Currency Type</p>
        <select
          className="rounded-lg px-3 py-2 bg-gray-100/50 cursor-pointer outline-none w-1/2"
          value={selectedCurrency.toLowerCase()} // Ensure lowercase match
          onChange={(e) => onCurrencyChange?.(e.target.value)}
          disabled={currencyDisabled}
        >
          {currencyOptions.map((currency) => (
            <option
              key={currency}
              value={currency.toLowerCase()} // Ensure lowercase
            >
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
