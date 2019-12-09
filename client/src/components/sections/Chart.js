import React, { Fragment, useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';



function Chart() {
  const theme = useTheme();
  const [data, setData] = useState([])
  const [user, setUser] = useState({});

  const handleData = (dat) => {
    return setData(dat)
  }

  const handleUser = (usr) => {
    return setUser(usr)
  }

  const filData = (rows) => {
    let filteredRows = []
    rows.forEach((row) => {
      filteredRows.push({
        time: new Date(row.date).toLocaleTimeString(),
        amount: row.balance
      })
    })

    return filteredRows.reverse()
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
        const filDa = filData(result)
        handleData(filDa)
      })
      .catch(err => console.log(err))
  })  

  // fetch('http://localhost:3001/api/u/', { 
  //     method: "get",
  //     headers: {
  //       'Content-Type': "application/json",
  //       'Authorization': localStorage.getItem("cool-jwt")
  //     }
  // })
  // .then(response => response.json())
  // .then(result => {
  //   handleUser(result)
  // })
  // .catch(err => console.log(err))

  return (
    <Fragment>
      <Title>Balance History</Title>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </Fragment>
  );
}

export default Chart