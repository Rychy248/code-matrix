import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { esES} from '@mui/material/locale';
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e01570',
      dark: '#e01570',
      // light: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: '#E0C2FF',
      dark: '#F5EBFF',
      light: '#F5EBFF',
      contrastText: '#47008F',
    },
    gray:{
      main:'#c6cdd1',
      light:'#c6cdd1',
      dark:'#3b3b3b',
      contrastText:'#f8cb25',
    },
    yellow:{
      main:'#f8cb25;',
      light:'#f8cb25;',
      dark:'#f8cb25;',
      contrastText:'#000',
    },
    cyan:{
      main:'#00b4ae;',
      light:'##00b4ae;',
      dark:'#00b4ae;',
      contrastText:'#000',
    },
    fuchsia:{
      main:'#e01570;',
      light:'##e01570;',
      dark:'#e01570;',
      contrastText:'#000',
    }
  },
  
}, esES);
//#c6cdd1;
//#f8cb25;
//#e01570;
//#00b4ae;

export default function DarkTheme({ children }) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
