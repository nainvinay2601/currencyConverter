import { useState } from "react";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import { InputBox } from "./components/comp";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd"); // from usd to inr
  const [to, setTo] = useState("inr");

  const [convertedAmount, setConvertedAmount] = useState(0);

  // now we need to guve data using our custom hook that we designed
  const currencyInfo = useCurrencyInfo(from); // the data coming here is an object containing all the rates
  const options = Object.keys(currencyInfo); // we keys are basically this inr usd cd and all the short names of the currency that we are passing in the select field options in the input component

  // function to convert amount is amount that user entered just multiply it with the value of to from the currencyInfo like usd amount = 1 that user entered and the currencyInfo.to = 85 this can be denoted for direct value as currencyInfo[to] -> to here is inr so amount 1 * 85 = 85 ans

  const convert = () => {
    setConvertedAmount(amount * currencyInfo[to]);
  };

  // swap function -> basically we will exchange the value of to and from with each other

  const swap = () => {
    // Calculate what the new amount should be based on inverse conversion
    const newRate = currencyInfo?.[from] || 1;
    const newAmount = convertedAmount / newRate;

    // Update all states
    setFrom(to);
    setTo(from);
    setAmount(newAmount);
  };

  return (
    <div className="w-full h-screen flex flex-wrap justify-center items-center bg-cover  bg-no-repeat">
      <div className="w-full ">
        <div className="w-full max-w-md mx-auto border border-gray-60  rounded-lg  p-5  backdrop-blur-sm  bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={from}
                className="mb-2"
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                className=" absolute  left-1/2  -translate-x-1/2  -translate-y-1/2  border-2  border-black rounded-md  bg-blue-500 text-white px-2  py-0.5 "
                onClick={swap}
              >
                Swap
              </button>
            </div>
            <div className="w-full mb-1">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={options}
                amountDisabled // this way it says true if
                onCurrencyChange={(currency) => setTo(currency)}
                // onAmountChange={(amount) => setAmount(amount)}
                selectedCurrency={to}
                className="mb-2"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
