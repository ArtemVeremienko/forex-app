import React from 'react';
import TableCell from '../TableCell/TableCell';

export default function TableRow({ currency, buy, sell }) {

  return (
    <tr>
      <td>{currency}</td>
      <TableCell price={buy} />
      <TableCell price={sell} />
    </tr>
  )
}