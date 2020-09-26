import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';

// Generate Order Data
function createData(id, date, name, comment) {
  return { id, date, name, comment };
}

const rows = [
  createData(0, '16 Mar, 2019', 'Elvis Presley', 'This is nice'),
  createData(1, '16 Mar, 2019', 'Paul McCartney', 'This is nidgdgdgrgdgce'),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'This is nsfsfsfseesice'),
  createData(3, '16 Mar, 2019', 'Michael Jackson', 'This is nifsefsfsfsefsece'),
  createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'This is nsfsfsfsfsfesfice'),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

export default function Comments() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>Related comments</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{width: '15%'}}>Date</TableCell>
            <TableCell style={{width: '20%'}}>Name</TableCell>
            <TableCell style={{width: '65%'}}>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.comment}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}