
import Button from '@mui/material/Button';
import { Collapse, Typography } from "@mui/material";
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { useInstructionsContext, useMatrixContext } from "../context/AppContext";
import Instructions from './Instructions';
import Matrix from './Matrix';

function Home(params) {
  const { instructions, showInstructions } = useInstructionsContext();
  const { matrixState, matrixStateDispatch } = useMatrixContext();
    
  const nextStep = () =>  matrixStateDispatch({ type:'next-step' }); ;
  
  const reset = () => matrixStateDispatch({ type:'reset' }); ;

  const isDisabledNextButtonStep = () =>{
    if (matrixState.alert.title === 'Último paso'){
      return true;
    }else{
      return false;
    };
  };

  return(
    <Container
      maxWidth="xl"
    >
      <Box textAlign={'center'}>
        <Typography variant="h2" align="center">
          Matriz 10 x 3
        </Typography>

        <Collapse in={showInstructions}>
          <Box textAlign={'justify'}>
            <Instructions />
          </Box>
        </Collapse>
        <Box>
          <Typography variant='h5'  style={{ marginTop:'5px', display:'inline-block'}}>
            Paso {matrixState.step}:&nbsp; 
          </Typography>
          <Typography className='color4' variant='p' style={{display:'inline-block'}}>
            {instructions[matrixState.step-1]}
          </Typography>
        </Box>
        <Typography variant='h3'>
          <Button variant="outlined" color="info" onClick={nextStep} style={{ display: 'inline-block', marginRight: '10px' }} disabled={isDisabledNextButtonStep()}> Siguiente </Button>
          <Button variant="outlined" color="info" onClick={reset} style={{ display: 'inline-block' }} disabled={(matrixState.step == 1)}>Reiniciar</Button>
        </Typography>
        <Collapse in={matrixState.alert.exist}>
          <Alert severity={matrixState.alert.severity}>
            <AlertTitle>{matrixState.alert.title}</AlertTitle>
            {matrixState.alert.msg}
          </Alert>
        </Collapse>

        <Matrix />
      </Box>
    </Container>
  )
}

export default Home;