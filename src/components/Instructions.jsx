import { Typography } from "@mui/material";
import { Divider } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { useInstructionsContext } from "../context/AppContext";

function Instructions() {
  const { instructions } = useInstructionsContext();

  return (
  <>
    <Divider sx={{ width:'100%', margin:'2rem auto', borderColor:'#ffe02d'}}/>
    <Typography variant="h5" color="color1">
      Caso: Dada una matriz de 10 X 3 (filas y columnas)
    </Typography>
    <List
      component='ol'
      sx={{
        display:'list-item',
        width: '100%',
        overflow: 'auto',
        maxHeight: 200,
      }}
    >
      <ol>
        {instructions.map((item, i)=>(
          <ListItem key={`instruction-${i}`} disablePadding divider={true}>
            <ListItemButton sx={{ cursor:'default'}}>
              <ListItemText>
                {i+1} - {item}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </ol>
    </List>
    <Divider sx={{ width:'100%', margin:'2rem auto', borderColor:'#ffe02d'}}/>
  </>)
};

export default Instructions;