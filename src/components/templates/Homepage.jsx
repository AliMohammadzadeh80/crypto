import React, { useEffect, useState } from 'react';
import Tablecoin from '../modules/Tablecoin';
import { getcoinlist } from '../../services/cryptoApi';
import Pagination from '../modules/Pagination';
import Search from '../modules/Search';

function Homepage() {
  const [coins, setCoins] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("usd");

  // استفاده از useEffect برای درخواست جدید با تغییرات currency و page
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(getcoinlist(page, currency));
        const json = await res.json();
        setCoins(json);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [page, currency]); // وابستگی به تغییرات currency و page

  return (
    <>
      <Search currency={currency} setcurrency={setCurrency} />
      <div>
        <Tablecoin coins={coins} currency={currency} />
      </div>
      <div>
        <Pagination page={page} setpage={setPage} />
      </div>
    </>
  );
}

export default Homepage;
