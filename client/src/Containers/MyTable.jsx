import { Paper, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.blue,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));


  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));




const MyTable = () => {

    const [pastQuizData, setpastQuizData] = useState([]);


    useEffect(async () => {
      console.log('rnng');

        const user = JSON.parse(localStorage.getItem('userData'));
    //   console.log('uid : ' , user.userid);

        const response = await axios.get(`http://localhost:5000/quizgivenby/${user.userid}`);
    //   console.log(response.data);
        setpastQuizData(response.data);

        return () => {
        ;
        };
    }, []);
    


  return <div>
        <TableContainer
                component={Paper}
                style={{
                    margin : '3% auto',
                    width : '90%'
                }}
            >

                <Table sx={{ minWidth: 700 }} aria-label="customized table">

                <TableHead>

                    <TableRow>
                    {/* <StyledTableCell align="center">Name</StyledTableCell>
                    <StyledTableCell align="center">Score</StyledTableCell> */}

                        <TableCell align="center" style={{ backgroundColor : '#f03861' , color : 'white'}}>Title</TableCell>
                        <TableCell align="center" style={{ backgroundColor : '#f03861' , color : 'white'}}>Score</TableCell>
                        <TableCell align="center" style={{ backgroundColor : '#f03861' , color : 'white'}}>Given At</TableCell>

                    </TableRow>

                </TableHead>


                <TableBody>
                    {/* { console.log(leaderboard[0]) } */}
                    {pastQuizData.map((row) => (
                    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
                    <StyledTableRow key={row._id}>
                        
                        <StyledTableCell component="th" scope="row" align="center">
                        {row.title}
                        </StyledTableCell>
                        <StyledTableCell align="center">{row.score}</StyledTableCell>
                        <StyledTableCell align="center">{row.givenAt.toLocaleString()}</StyledTableCell>
                        
                    </StyledTableRow>
                    ))}
                    
                </TableBody>

                </Table>

            </TableContainer>
  </div>;
};

export default MyTable;
