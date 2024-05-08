
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useMatrixContext } from "../../context/AppContext";
import { useState } from 'react';
import letterIndex from '../tools/letterIndex';


function TableRender() {
  const { matrixState, matrixStateDispatch } = useMatrixContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.fuchsia.dark,
      fontWeight:'bold'
    },
    [`&.${tableCellClasses.body}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.fuchsia.dark,
      fontWeight:'bold'
    },
    
  }));
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.gray.dark,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  const columns = [
    {
      id:`no`,
      label:``,
      minWidth:10
    },
    ...matrixState.matrix[0].map((item, i)=>({
      id:`${letterIndex(i).toLowerCase()}`,
      label:`${letterIndex(i).toUpperCase()}`,
      minWidth:50
    }))
  ];
  
  function createRow(no, row) {
    const formattedRow = { no:(no+1) }
    row.forEach((col, i)=>{
      formattedRow[`${letterIndex(i).toLowerCase()}`] = col;
    });
    return formattedRow;
  };
  
  const rows = matrixState.matrix.map((row, i)=> createRow(i, row) );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const getTableBorderStyle= ()=>{
    return ([8, 15].includes(matrixState.step))
      ? { border: '10px solid cyan', borderRadius:6 }
      : {}
    ;
  };

  return(
  <Paper sx={{ width: '100%' }}>
    <TableContainer sx={{ maxHeight: '50vh', ...getTableBorderStyle()}}>
      <Table 
        stickyHeader aria-label="sticky table"
        size='small'
      >
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <StyledTableCell
                key={column.id}
                align="center"
                style={{ minWidth: column.minWidth, marginTop:0 }}
              >
                {column.label}
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row) => {
              return (
                <StyledTableRow tabIndex={-1} key={row.no}>
                  {columns.map((column, i) => {
                    const value = row[column.id]
                    return (
                      !(column.id == "no" )
                        ?(
                          <TableCell key={column.id} align="center">
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                            }
                          </TableCell>
                        ):(
                          <StyledTableCell key={column.id} align="center">
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value
                            }
                          </StyledTableCell>
                        )
                    );
                  })}
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 15, 25, 100]}
      component="div"
      count={rows.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  );
};

export default TableRender;