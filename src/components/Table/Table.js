import React from 'react'
import './Table.css';
import TableRow from '../TableRow/TableRow';

export default function Table({ data, isError, onChangePrice }) {

  return (
    <>
      {
        isError ?

          <h2 className="error">Server error <span role="img" aria-label="loudly crying face">😭</span></h2> :

          <table className="main__table table">
            <thead>
              <tr>
                <th>Currency/Current Date </th>
                <th>Buy</th>
                <th>Sell</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </table>
      }
    </>
  );
}