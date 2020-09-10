import React, { useState, useEffect } from 'react';
import './Main.css';
import Table from '../Table/Table'
import Converter from '../Converter/Converter';

const API = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

export default function Main() {
  const [requestCount, setRequestCount] = useState(localStorage.getItem('reqCounter') || 0);

  const [data, setData] = useState([{ "ccy": "USD", "base_ccy": "UAH", "buy": "27.60000", "sale": "28.02000" }, { "ccy": "EUR", "base_ccy": "UAH", "buy": "32.40000", "sale": "33.01000" }, { "ccy": "RUR", "base_ccy": "UAH", "buy": "0.35500", "sale": "0.38200" }, { "ccy": "BTC", "base_ccy": "USD", "buy": "9779.1368", "sale": "10808.5196" }]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(API)
        .then(response => response.json())
        .catch(error => { setRequestCount(5); return []; });
      setData(result.filter(item => item.ccy !== 'RUR'));
    };

    fetchData();

    setRequestCount(prev => {
      localStorage.setItem('reqCounter', `${+prev + 1}`)
      return +prev + 1;
    })
  }, []);

  const onChangePrice = index => direction => newPrice => {
    const newData = [...data];
    newData[index][direction] = newPrice;
    setData(newData);
  }

  return (
    <main className="main">
      <Table data={data} isError={!(requestCount % 5)} onChangePrice={onChangePrice} />
      <Converter data={data} />
    </main>
  )
}