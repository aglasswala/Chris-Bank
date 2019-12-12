import React, { Fragment, useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import Title from './Title';

const filterRows = (rows) => {
  let filteredRows = []
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  rows.forEach((row) => {

    const day = new Date(row.date).getDate()
    const month = new Date(row.date).getMonth()
    const year = new Date(row.date).getFullYear()

    let am = row.amount
    let ba = row.balance 

    filteredRows.push({
      date: day + " " + monthNames[month] + ", " + year,
      user: row.user,
      amount: am,
      balance: ba
    })
  })

  return filteredRows
}


function Orders() {
  const [rows, setRows] = useState([]);

  const handleRows = (rows) => {
    return setRows(rows)
  }

  useEffect(() => {
    fetch("http://localhost:3001/api/t", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("cool-jwt")
      }
    })
      .then(response => response.json()) 
      .then(result => {
        const filteredRows = filterRows(result)
        handleRows(filteredRows)
      })
      .catch(err => console.log(err))
  })  

  return (
    <Fragment>
      <Title>Recent Transactions</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Account</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell align="right">Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow style={row.amount > 0 ? {backgroundColor: "rgba(66, 165, 245, .1)"} : {backgroundColor: "rgba(227, 82, 65, .1)"}}>
              <TableCell>{row.amount < 0 ? <RemoveIcon color="error" /> : <AddIcon color="primary" />}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.user}</TableCell>
              <TableCell>${(+(row.amount.substring(1))).toFixed(2)}</TableCell>
              <TableCell align="right">${(+(row.balance)).toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
}

export default Orders