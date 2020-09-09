import React from 'react';
import TableCell from '../TableCell/TableCell';

export default function TableRow({ currency, buy, sell, onChangePrice }) {
  return (
    <tr>
      <td>{currency}</td>
      <TableCell price={+buy} onChangePrice={onChangePrice('buy')} />
      <TableCell price={+sell} onChangePrice={onChangePrice('sale')} />
    </tr>
  )
}