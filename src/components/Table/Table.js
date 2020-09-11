import React from 'react'
import TableRow from '../TableRow/TableRow';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import MuiTableRow from '@material-ui/core/TableRow';
import MuiTableCell from '@material-ui/core/TableCell';

import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  container: {
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 50
  },
  table: {
    minWidth: 650,
  },
  tableFirstRow: {
    fontSize: '1.3em',
  }
});

export default function Table({ data, isError, onChangePrice }) {
  const classes = useStyles();

  return (
    <>
      {
        isError ?

          <Typography variant="h3" color="error" align="center" gutterBottom={true}>
            Server error
            <span role="img" aria-label="loudly crying face">😭</span>
          </Typography> :

          <TableContainer component={Paper} className={classes.container}>
            <MuiTable className={classes.table} aria-label="simple table" >
              <TableHead >
                <MuiTableRow >
                  <MuiTableCell align="center" className={classes.tableFirstRow}>Currency/Current Date</MuiTableCell>
                  <MuiTableCell align="center" className={classes.tableFirstRow}>Buy</MuiTableCell>
                  <MuiTableCell align="center" className={classes.tableFirstRow}>Sell</MuiTableCell>
                </MuiTableRow>
              </TableHead>
              <TableBody>
                {
                  data.map((item, index) => {
                    const { ccy, base_ccy, buy, sale } = item;
                    return <TableRow
                      currency={`${ccy}/${base_ccy}`}
                      buy={buy}
                      sell={sale}
                      key={index}
                      onChangePrice={onChangePrice(index)}
                    />
                  })
                }
              </TableBody>
            </MuiTable>
          </TableContainer>
      }
    </>
  );
}