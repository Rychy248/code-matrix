
import { useReducer } from "react";
import { MatrixContext } from "../AppContext";
import randomNumber from "../../components/tools/randomNumber";
import letterIndex, {returnPluralS} from "../../components/tools/letterIndex";

export const matrixStateInitialState = {
  // 'Agregar datos predeterminados a las columnas 1(A) y 2(B) y filas 1 y 2',
  matrix:[
    ...Array.from({ length: 2 }, () =>[randomNumber(), randomNumber(), 0]),
    ...Array.from({ length: 8 }, () => [0, 0, 0])
  ],
  step:1,
  alert:{
    exist:false,
    msg:'',
    title:'',
    severity:'info'
  },
  totalVar:{
    show:false,
    operation:'',
    value:0
  }
};

function reducerMatrix(state, action){
  if (action.type === 'next-step'){
    if( state.step === 15) { 
      return {
        ...state,
        alert:{
          exist:true,
          title:'Último paso',
          msg:'Último paso alcanzado. Reinicie para volver a ver.',
          severity:'warning'
        }
      };
    };
    return {
      ...state,
      step:state.step +1 
    }
  }else if (action.type === 'suma-colA+colB'){
    const newMatrix = state.matrix.map((row, i)=>[
      row[0], //COL-A
      row[1], //COL-B
      row[0]+row[1], //COL-C
    ]);
    return{
      ...state,
      matrix:newMatrix 
    };
  }else if (action.type === 'suma-col'){
    const colName = letterIndex(action.colIndex)
    const sumColC = state.matrix.reduce((sum, row) => sum + row[action.colIndex], 0); // row[2] = colC
    return{
      ...state,
      alert:{...matrixStateInitialState.alert},
      totalVar:{
        show:true,
        operation:`Suma de la columna ${action.colIndex+1}(${colName})`,
        value:sumColC
      }
    };
  }else if (action.type === 'add-rows'){
    const isOrNotPlural = returnPluralS(action.newRows);
    const newMatrix = [
      ...state.matrix,
      ...Array.from({ length: action.newRows }, () => [  // Adding N new rows
        ...Array.from({ length: state.matrix[0].length }, ()=> 0) // Calculating number of columns
      ])
    ];
    return{
      ...state,
      matrix:newMatrix,
      totalVar:{...matrixStateInitialState.totalVar},
      alert:{
        exist:true,
        title:`${action.newRows} fila${isOrNotPlural} añadida${isOrNotPlural}`,
        msg:`Se ${action.newRows > 1 ?'añadieron':'añadió'} ${action.newRows} nueva${isOrNotPlural} fila${isOrNotPlural}. Filas anteriors:${state.matrix.length}, Filas actuales:${newMatrix.length}`,
        severity:'success'
      }
    };
  }else if (action.type === 'add-cols'){
    const isOrNotPlural = returnPluralS(action.newCols);
    const newMatrix = state.matrix.map((row, i)=>[
      ...row,
      ...Array.from({ length: action.newCols }, ()=> 0) // New Cols
    ]);

    return{
      ...state,
      matrix:newMatrix,
      totalVar:{...matrixStateInitialState.totalVar},
      alert:{
        exist:true,
        title:`${action.newCols} Columna${isOrNotPlural} añadida${isOrNotPlural}`,
        msg:`Se ${action.newCols > 1 ?'añadieron':'añadió'} ${action.newCols} nueva${isOrNotPlural} columna${isOrNotPlural}. Columnas anteriors:${state.matrix[0].length}, Columnas actuales:${newMatrix[0].length}`,
        severity:'success'
      }
    };
  }else if (action.type === 'translate-values-A1-A2-to-A11-A12'){
    const newMatrix = state.matrix.map(row => [...row]);
    const A1 = state.matrix[0][0]; // ROW 1 COL A
    const A2 = state.matrix[1][0]; // ROW 2 COL A
    //translating
    newMatrix[10][0] = A1; // ROW 11 COL A = A1
    newMatrix[11][0] = A2; // ROW 12 COL A = A2
    newMatrix[0][0] = 0; // ROW 11 COL A = A1
    newMatrix[1][0] = 0; // ROW 12 COL A = A2

    return{
      ...state,
      matrix:newMatrix,
      alert:{
        exist:true,
        title:`Traslado de Celdas`,
        msg:`Se traslado las celdas A1(valor movido ${A1}) a A11 y A2(valor movido ${A2}) a A12. `,
        severity:'success'
      }
    };
  }else if (action.type === 'divide-value-assign-to-cells'){
    /*PARAMAS INTO ACTION
      valueToDivide=1
      startAt index of row to start assign
      finishedAt index of row where finish
      colIndex column to start
    */
    const {valueToDivide, startAt, finishedAt, colIndex} = action;
    const colName = letterIndex(action.colIndex)
    const numberOfRows = (finishedAt - startAt)  + 1
    const valueToSet = valueToDivide / numberOfRows;
    
    //BUILD MATRIX
    const newMatrix = state.matrix.map((row, i)=>{
      if(startAt <= i && i <= finishedAt  ){
        return [
          ...row.map((cellValue, column) => (column === colIndex)  // each cell as col
            ? valueToSet 
            : cellValue // each cell as col
          )
        ];
      }else{
        return [...row];
      };
    });

    return{
      ...state,
      matrix:newMatrix,
      alert:{
        exist:true,
        title:`Filas reasignadas con valores`,
        msg:`Se le asignó ${valueToSet} a las celdas, de ${colName}${startAt +1} a la fila ${colName}${finishedAt+1}!`,
        severity:'success'
      }
    };
  }else if (action.type === 'suma-colA+colB+colD-to-colC'){
    const newMatrix = state.matrix.map((row, i)=>[
      row[0], //COL-A
      row[1], //COL-B
      row[0]+row[1]+row[3], //COL-A + COL-B + COL-D
      row[3], //COL-D
    ]);
    return{
      ...state,
      totalVar:{...matrixStateInitialState.totalVar},
      matrix:newMatrix,
      alert:{
        exist:true,
        title:`Columna C reasignada`,
        msg:`La columna C fue asignada con la suma de las columnas A,B y D`,
        severity:'success'
      }
    };
  }else if (action.type === 'reset'){
    return{ ...matrixStateInitialState }
  };
  
};

export function MatrixContextProvider({ children }) {
  const [matrixState, matrixStateDispatch] = useReducer(reducerMatrix, matrixStateInitialState);

  return (
    <MatrixContext.Provider value={{
      matrixState,
      matrixStateDispatch
    }}>
      {children}
    </MatrixContext.Provider>
  ); 
};

