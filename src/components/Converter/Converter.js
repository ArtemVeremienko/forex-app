import React, { useState, useEffect } from 'react'
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import SwapHoriz from '@material-ui/icons/SwapHoriz';


export default function Converter({ data }) {
  const [exchange, setExchange] = useState({
    base_ccy: 'UAH',
    ccy: 'USD',
    quote: 27.5,
    amount: '',
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
      const newList = data.filter(i => i.base_ccy === prev.base_ccy);
      const quote = newList[0].buy
      return {
        ...prev,
        result: resultRound(prev.amount, quote),
        quote: quote,
        getList: newList.map(i => i.ccy),
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
      const newGetList = data.filter(i => i.base_ccy === value);
      const quote = newGetList[0].buy
      return {
        ...prev,
        base_ccy: value,
        quote: quote,
        result: resultRound(prev.amount, quote),
        getList: newGetList.map(i => i.ccy),
      }
    })
  }

  const handleGetSelect = (e) => {
    const value = e.target.value;
    setExchange(prev => {
      const newList = data.filter(i => i.ccy === value);
      const quote = newList[0].buy;
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
    <Box mx="auto" display="flex" justifyContent="center" mt={4}>
      <Box mr={4}>
        <TextField
          label="Change"
          variant="outlined"
          type="number"
          min="0"
          value={exchange.amount}
          onChange={handleChangeInput}
        />

        <TextField
          value={exchange.base_ccy}
          onChange={handleChangeSelect}
          select
          variant="outlined"
        >
          {exchange.changeList.map((cur, i) =>
            <MenuItem value={cur} key={i}>{cur}</MenuItem>
          )}
        </TextField>
      </Box>

      <Button variant="contained" color="primary"
        onClick={swapValue} size="large" startIcon={<SwapHoriz />}
      >
        Swap
      </Button>

      <Box ml={4}>
        <TextField
          label="Get"
          variant="outlined"
          type="number"
          min="0"
          value={exchange.result}
          readOnly={true}
        />

        <TextField
          value={exchange.ccy}
          onChange={handleGetSelect}
          select
          variant="outlined"
        >
          {exchange.getList.map((cur, i) =>
            <MenuItem value={cur} key={i}>{cur}</MenuItem>
          )}
        </TextField>
      </Box>
    </Box >
  )
}