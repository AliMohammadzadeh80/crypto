const BASE_URL = "https://api.coingecko.com/api/v3/";
const API_KEY = "CG-Lvk85c6JYQB29uBPrcwoSyv6";

// اصلاح تابع getcoinlist برای بازگرداندن URL
const getcoinlist = (page, currency) => {
    return `${BASE_URL}coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=20&page=${page}&x_cg_demo_api_key=${API_KEY}`;
};

// اصلاح تابع searchcoin
const searchcoin = (query) => `${BASE_URL}search?query=${query}&x_cg_demo_api_key=${API_KEY}`;

export { getcoinlist, searchcoin };
