import bantrabLogo from '../assets/bantrab-logo-black.png';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from '@mui/material';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import { useInstructionsContext } from "../context/AppContext";

function Header() {  
  const { toggleInstructions } = useInstructionsContext();
  const openGithub = ()=> window.open('https://github.com/Rychy248', "_blank"); ;
  
  return (
    <>
      <Box sx={{ flexGrow: 2 }}>
        <AppBar >
          <Toolbar>
            <img src={bantrabLogo} alt="Bantrab Logo" style={{ width: 'auto', height: '75px', marginRight:'6px' }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link 
                sx={{color:'#fff', textDecoration:'none', cursor:'pointer', '&:hover':{ color:'#00b4ae'}}}
                href={'https://github.com/Rychy248/code-matrix'}
                target='_blank'
              >
                Code Test - Matriz 10 x 3
              </Link>
            </Typography>
            <Button variant="contained" onClick={toggleInstructions} style={{marginRight:'5px'}}>
              <FormatListNumberedRtlIcon />
            </Button>
            <Button onClick={openGithub} variant="contained" component="div" align='right' color="cyan">
              Ricardo Hernández
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ marginTop: '5rem' }}> {/* space for header */} </Box>
    </>
  );
};

export default Header;