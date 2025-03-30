import React, { useState, useRef, useEffect } from 'react';
import { searchcoin } from '../../services/cryptoApi';

const Search = ({ currency, setcurrency }) => {
    const [text, settext] = useState("");
    const [coins, setcoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef(null);

    // درخواست جستجو
    const handleSearch = async () => {
        if (!text) return;

        setLoading(true);
        setShowResults(true);

        try {
            const res = await fetch(searchcoin(text));
            const json = await res.json();
            if (json.coins) setcoins(json.coins);
        } catch (error) {
            console.error("خطا در دریافت داده‌ها:", error);
        }

        setLoading(false);
    };

    // بستن لیست نتایج هنگام کلیک خارج از باکس
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={searchRef} className="flex flex-col items-center gap-3 bg-gray-900 p-4 rounded-lg shadow-lg max-w-lg relative">
            {/* فیلد جستجو و انتخاب واحد پول در یک ردیف */}
            <div className="flex w-full gap-3">
                <select 
                    value={currency} 
                    onChange={(e) => setcurrency(e.target.value)} 
                    className="p-2 border border-gray-700 bg-gray-800 text-white rounded-lg cursor-pointer focus:outline-none"
                >
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                    <option value="jpy">JPY</option>
                </select>

                <input 
                    type="text" 
                    value={text}
                    placeholder="نام ارز را وارد کنید..." 
                    onChange={(e) => settext(e.target.value)}
                    className="flex-grow p-2 border border-gray-700 bg-gray-800 text-white placeholder-gray-400 rounded-lg focus:outline-none"
                />

                <button 
                    onClick={handleSearch} 
                    className="px-4 py-2 rounded-lg font-medium bg-gray-700 hover:bg-gray-600 transition duration-200"
                >
                    جستجو
                </button>
            </div>

            {/* لیست نتایج جستجو */}
            {showResults && (
                <div className="absolute top-full left-0 mt-3 w-full max-h-60 overflow-y-auto bg-gray-800 rounded-lg shadow-lg z-10">
                    {loading ? (
                        <p className="text-center text-gray-400 p-3">در حال جستجو...</p>
                    ) : (
                        coins.length > 0 ? (
                            <ul className="space-y-2 p-3">
                                {coins.map((coin) => (
                                    <li 
                                        key={coin.id} 
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 cursor-pointer transition duration-200"
                                    >
                                        <img 
                                            src={coin.thumb} 
                                            alt={coin.name} 
                                            className="w-7 h-7 rounded-full" 
                                        />
                                        <p className="text-white font-medium">{coin.name}</p>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-center text-gray-400 p-3">نتیجه‌ای یافت نشد.</p>
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default Search;
