import { useEffect } from 'react';
import Grid from '@mui/material/Grid';

import TableRender from './matrix-elements/TableRender';
import Box from '@mui/material/Box';
import { Collapse, Typography } from "@mui/material";
import { useInstructionsContext, useMatrixContext } from "../context/AppContext";


function Matrix() {
  const { instructions } = useInstructionsContext();
  const { matrixState, matrixStateDispatch } = useMatrixContext();
  
  /**Control of the matrix based on the new state */
  useEffect(() => {
    if(matrixState.step === 3){
      matrixStateDispatch({ type:'suma-colA+colB' });
    }else if(matrixState.step === 4){
      matrixStateDispatch({ type:'suma-col',colIndex:2 }); //Column 3 C = index 2
    }else if(matrixState.step === 6){
      matrixStateDispatch({ type:'add-rows', newRows:2 });
    }else if(matrixState.step === 7){
      matrixStateDispatch({ type:'add-cols', newCols:1 });
    }else if(matrixState.step === 9){
      matrixStateDispatch({ type:'translate-values-A1-A2-to-A11-A12'});
    }else if(matrixState.step === 10){
      matrixStateDispatch({ type:'suma-col',colIndex:1 }); //Column 2 B = index 1
    }else if(matrixState.step === 11){
      matrixStateDispatch({ 
        type:'divide-value-assign-to-cells',
        valueToDivide:matrixState.totalVar.value,
        startAt:2,
        finishedAt:6,
        colIndex:3 // Column 4 D = index 3
      });
    }else if(matrixState.step === 12){
      matrixStateDispatch({ type:'suma-colA+colB+colD-to-colC' });
    }else if(matrixState.step === 13){
      matrixStateDispatch({ type:'suma-col',colIndex:2 });
    };
    
    return () => {}; //cleaner
  }, [matrixState.step]);
  
  const getTotalVarBorderStyle= ()=>{
    const basicStyle = { marginRight:'10px', display: 'inline-block' }
    return ([5, 14].includes(matrixState.step))
      ? {...basicStyle, border: '3px solid cyan', borderRadius:6, padding: '8px' }
      : basicStyle
    ;
  };

  const getTableBorderStyle= ()=>{
    return ([8].includes(matrixState.step))
      ? { border: '10px solid cyan', borderRadius:6 }
      : {}
    ;
  };

  return (
    <Grid
      container
      spacing={2}
      direction="row"
      justify="center"
      alignItems="center"
      alignContent="center"
      wrap="wrap"
    >
      <Grid item xs={12} textAlign={'center'}>
        <Collapse in={matrixState.totalVar.show}>
          <Box>
            <Box sx={getTotalVarBorderStyle()}>  
              <Typography className='color3' variant='h5'>
                Total: {matrixState.totalVar.value}.&nbsp;
              </Typography>
            </Box>
            <Typography className='color2' variant='p' style={{display:'inline-block'}}>
              Operación: {matrixState.totalVar.operation}
            </Typography>
          </Box>
        </Collapse>
      </Grid>
      <Grid item xs={12}>
        <Collapse in={matrixState.step >= 2}>
          <TableRender />
        </Collapse>
      </Grid>
    </Grid>
  );
};

export default Matrix;