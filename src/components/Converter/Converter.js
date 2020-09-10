import React, { useState, useEffect } from 'react'
import './Converter.css';

export default function Converter({ data }) {
  const [exchange, setExchange] = useState({
    base_ccy: 'UAH',
    ccy: 'USD',
    quote: 27.5,
    amount: 100,
    result: 0,
    changeList: ['UAH', "USD"],
    getList: ['USD', 'EUR', 'BTC']
  });

  const [isSwap, setIsSwap] = useState(false);

  const resultRound = (value, quote, swap = isSwap) => {
    return swap ?
      Math.round(value * quote * 100) / 100 :
      Math.round(value / quote * 100) / 100;
  }

  useEffect(() => {
    setExchange(prev => {
      const quote = data.find(item => item.ccy === prev.ccy && item.base_ccy === prev.base_ccy).buy
      return {
        ...prev,
        result: resultRound(prev.amount, quote),
        quote: quote,
        getList: data.filter(i => i.base_ccy === prev.base_ccy).map(i => i.ccy),
      }
    })
  }, [data])

  const handleChangeInput = (e) => {
    const value = e.target.value;
    setExchange(prev => ({
      ...prev,
      amount: value,
      result: resultRound(value, prev.quote)
    }))
  }

  const handleChangeSelect = (e) => {
    const value = e.target.value;
    setExchange(prev => {
      const quote = data.find(cur => cur.base_ccy === value && cur.ccy === prev.ccy).buy
      return {
        ...prev,
        base_ccy: value,
        quote: quote,
        result: resultRound(value, quote),
        getList: data.reduce((arr, i) => i.base_ccy === value ? [...arr, i.ccy] : arr, []),
      }
    })
  }

  const handleGetSelect = (e) => {
    const value = e.target.value;
    setExchange(prev => {
      const quote = data.find(cur => cur.ccy === value && cur.base_ccy === prev.base_ccy).buy;
      return {
        ...prev,
        ccy: value,
        result: resultRound(prev.amount, quote),
        quote,
      }
    })
  }

  const swapValue = () => {
    setIsSwap(!isSwap);
    setExchange(prev => ({
      ...prev,
      amount: prev.result,
      result: prev.amount,
      ccy: prev.base_ccy,
      base_ccy: prev.ccy,
      changeList: prev.getList,
      getList: prev.changeList,
    }))
  }

  return (
    <div className="converter">
      <div className="converter__group">
        <label>Change</label><br />
        <input
          type="number"
          min="0"
          value={exchange.amount}
          onChange={handleChangeInput}
        />
        <select value={exchange.base_ccy} onChange={handleChangeSelect}>
          {exchange.changeList.map((cur, i) =>
            <option value={cur} key={i}>{cur}</option>
          )}
        </select>
      </div>

      <button onClick={swapValue}>
        <span className="material-icons converter__btn">swap_horiz</span>
      </button>

      <div className="converter__group">
        <label>Get</label><br />
        <input
          type="number"
          min="0"
          value={exchange.result}
          readOnly={true}
        />
        <select value={exchange.ccy} onChange={handleGetSelect}>
          {exchange.getList.map((cur, i) =>
            <option value={cur} key={i}>{cur}</option>
          )}
        </select>
      </div>
    </div >
  )
}