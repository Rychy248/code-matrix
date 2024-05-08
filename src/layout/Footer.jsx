
import { Divider } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

function Footer() {  
  const getYear = ()=>{
    return (new Date()).getFullYear()
  };

  return (
    <Container sx={{ marginTop:'10px'}} >
      <Divider sx={{ width:'50%', margin:'2rem auto 0.5rem auto', borderColor:'#ffe02d', opacity:0.3}}/>
      
      <Grid 
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="center"
        alignContent="center"
        wrap="nowrap"
      >
        <Grid item xs={12}>
          <Typography variant="p" component="div" align='center'>
            Ricardo Hernández &copy; {getYear()} Code Test - Matriz 10 x 3
          </Typography>
        </Grid> 
      </Grid>
    </Container>
  );
};

export default Footer;