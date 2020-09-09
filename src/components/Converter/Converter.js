import React from 'react'
import './Converter.css';

export default function Converter() {
  return (
    <div className="converter">
      <div className="converter__group">
        <label>Change</label><br />
        <input></input>
        <select>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
          <option value="BTC">BTC</option>
        </select>
      </div>
      <button>Swap</button>
      <div className="converter__group">
        <label>Get</label><br />
        <input></input>
        <select>
          <option value="USD">USD</option>
          <option value="UAH">UAH</option>
          <option value="EUR">EUR</option>
          <option value="BTC">BTC</option>
        </select>
      </div>
    </div >
  )
}