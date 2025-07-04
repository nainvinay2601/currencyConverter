import React from "react";

const InputBox = (
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisabled = false,
  currencyDisabled = false,
  className = ""
) => {
  //All the states that are involved in the input field
  // we have a label , a input field to enter currency amount, the field to set currency type, and what should happen when currency is changed

  return (
    <div className={`${className} bg-white, p-3 rounded-lg text-sm flex`}>
      <div className="w-1/2">
        <label className="text-black/40 mb-2 inline-block">
          {
            // dont wanna hard code as it contain 2 label, from and to
            label
          }
        </label>
        <input
          type="number"
          className="outline-none w-full bg-transparent py-1.5"
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
      <div className="w-1/2 flex flex-wrap justify-end  text-right">
        <p>Currency Type</p>
        {/*  now we want to take care of currency selection field */}
        <select
          name=""
          id=""
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency} // default value is usd
          // what happens on change of this field?
          onChange={(event) => {
            onCurrencyChange && onCurrencyChange(event.target.value);
          }}
          // field enabled or disabled
          disabled={currencyDisabled} // maybe we just want user to do single type currency conversion and all like only usd to inr or inr to usd
        >
          {/*  currency options is an array and we want to loop through it  */}
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default InputBox;
