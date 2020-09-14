import React, { useState, useEffect } from 'react';
import ConverterField from '../ConverterField/ConverterField'
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import SwapHoriz from '@material-ui/icons/SwapHoriz';


export default function Converter({ data }) {
  const [exchange, setExchange] = useState({
    from: 'UAH',
    to: 'USD',
    quote: 0,
    amount: '',
    result: 0,
    changeList: ['UAH'],
    getList: ['USD']
  });

  const resultRound = (value, quote) => (value / quote).toFixed(3);

  useEffect(() => {
    setExchange(prev => {
      const newList = data.filter(i => i.base_ccy === prev.from);
      const quote = newList[0].buy
      return {
        ...prev,
        quote: quote,
        result: +resultRound(prev.amount, quote) || '',
        changeList: [...new Set(data.map(i => i.base_ccy))],
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
    const currency = e.target.value;
    setExchange(prev => {
      const newGetList = data.filter(i => i.base_ccy === currency);
      const quote = newGetList[0].buy
      return {
        ...prev,
        quote,
        from: currency,
        result: resultRound(prev.amount, quote),
        getList: newGetList.map(i => i.ccy),
      }
    })
  }

  const handleGetInput = (e) => {
    const value = e.target.value;
    setExchange(prev => ({
      ...prev,
      result: value,
      amount: value * prev.quote,
    }))
  }

  const handleGetSelect = (e) => {
    const currency = e.target.value;
    setExchange(prev => {
      const newChangeList = data.filter(i => i.ccy === currency);
      const quote = newChangeList[0].buy;
      return {
        ...prev,
        quote,
        to: currency,
        result: resultRound(prev.amount, quote),
      }
    })
  }



  const swapValue = () => {
    setExchange(prev => ({
      ...prev,
      amount: prev.result,
      result: prev.amount,
    }))
  }

  return (
    <Box mx="auto" display="flex" justifyContent="center" mt={3} alignItems="center">

      <ConverterField
        label="Change"
        inputValue={exchange.amount}
        handleInput={handleChangeInput}
        selectValue={exchange.from}
        handleSelect={handleChangeSelect}
        optionList={exchange.changeList}
      />

      <Box mx={3}>
        <Button variant="contained" color="primary"
          onClick={swapValue} size="large" startIcon={<SwapHoriz />}
        >
          Swap
        </Button>
      </Box>

      <ConverterField
        label="Get"
        inputValue={exchange.result}
        handleInput={handleGetInput}
        selectValue={exchange.to}
        handleSelect={handleGetSelect}
        optionList={exchange.getList}
      />
    </Box >
  )
}