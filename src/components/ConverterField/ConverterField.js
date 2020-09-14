import React from 'react'
import Box from '@material-ui/core/Box';
import { TextField } from '@material-ui/core';

export default function ConverterField({
  label, inputValue, handleInput, selectValue, handleSelect, optionList
}) {

  return (
    <Box display="flex" flexWrap="wrap" justifyContent="flex-end">
      <TextField
        label={label}
        variant="outlined"
        type="number"
        min="0"
        value={inputValue}
        onChange={handleInput}
      />

      <TextField
        value={selectValue}
        onChange={handleSelect}
        select
        variant="outlined"
        SelectProps={{
          native: true,
        }}
      >
        {optionList.map((cur, i) =>
          <option value={cur} key={i}>{cur}</option>
        )}
      </TextField>
    </Box>
  );
}
