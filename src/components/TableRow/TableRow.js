import React from 'react';
import TableCell from '../TableCell/TableCell';
import { makeStyles } from '@material-ui/core/styles';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';

const useStyles = makeStyles({
  firstCell: {
    fontWeight: 'bold'
  },
});

export default function TableRow({ currency, buy, sell, onChangePrice }) {
  const classes = useStyles();
  return (
    <MuiTableRow hover={true}>
      <MuiTableCell className={classes.firstCell} align="center">{currency}</MuiTableCell>
      <TableCell price={+buy} onChangePrice={onChangePrice('buy')} />
      <TableCell price={+sell} onChangePrice={onChangePrice('sale')} />
    </MuiTableRow>
  )
}