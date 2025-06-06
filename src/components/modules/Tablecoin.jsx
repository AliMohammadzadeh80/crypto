import React from 'react';
import chartUp from "../../assets/chart-up.svg";
import chartDown from "../../assets/chart-down.svg";

// تعریف نمادهای واحد پول
const currencySymbols = {
  usd: "$",
  eur: "€",
  jpy: "¥",
};

function Tablecoin({ coins = [], currency }) {
  return (
    <div className="overflow-x-auto p-4">
      <table className="w-full border-collapse shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-900 text-white text-left">
            <th className="p-3">Coin</th>
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3 hidden sm:table-cell">24h</th>
            <th className="p-3 hidden md:table-cell">Total Volume</th>
            <th className="p-3 hidden sm:table-cell">Trend</th>
          </tr>
        </thead>
        <tbody>
          {coins.length > 0 ? (
            coins.map((coin) => (
              <tr 
                key={coin.id} 
                className="border-b hover:bg-gray-100 transition duration-200 hover:shadow-none hover:text-black"
              >
                <td className="p-3 flex items-center gap-2 flex-wrap">
                  <img src={coin.image} alt={coin.name} className="w-8 h-8" />
                  <span className="uppercase font-medium">{coin.symbol}</span>
                </td>
                <td className="p-3">{coin.name}</td>
                <td className="p-3 font-semibold">
                  {currencySymbols[currency]}{coin.current_price ? coin.current_price.toLocaleString() : 'N/A'}
                </td>
                <td 
                  className={`p-3 font-semibold ${coin.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'} hidden sm:table-cell`}
                >
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td className="p-3 hidden md:table-cell">
                  {currencySymbols[currency]}{coin.total_volume ? coin.total_volume.toLocaleString() : 'N/A'}
                </td>
                <td className="p-3 hidden sm:table-cell">
                  <img 
                    src={coin.price_change_percentage_24h > 0 ? chartUp : chartDown} 
                    alt={coin.name} 
                    className="w-12 h-12 transition-transform transform hover:scale-110" 
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Tablecoin;
