
import { useState } from "react";
import { InstructionsContext } from "../AppContext";

export function InstructionsProvider({ children }) {
  
  const [showInstructions, setShowInstructions] = useState(false);
  const toggleInstructions = () => setShowInstructions(prev => !prev ); ;
  const instructions = [
    'Agregar datos predeterminados a las columnas 1(A) y 2(B) y filas 1 y 2',
    'Mostrar la matriz con los datos',
    'Llenar la columna 3(C) con la suma de las 1(A) y 2(B)',
    'Calcular el total de la columna 3(C) en la variable TOTAL',
    'Mostrar la variable TOTAL',
    'Crear 2 filas vacías',
    'Crear una nueva columna(D) vacía',
    'Mostrar la matriz redimensionada',
    'Trasladar los valores de las filas 1 y 2 columna 1(A1, A2) hacia las filas nuevas (A11 & A12)',
    'Calcular el total de las filas 1 y 2, columna 2(B)',
    'Dividir el total del inciso anterior y colocar en partes iguales en las filas 3 a 7, columna 4(D)',
    'Llenar columna 3(C) con las sumas de las columnas 1(A), 2(B) y 4(D)',
    'Calcular el total de la columna 3(C) en las variables TOTAL',
    'Mostrar la variable TOTAL',
    'Mostrar la matriz con los datos.'
  ];

  return (
    <InstructionsContext.Provider value={{
      instructions,
      showInstructions,
      toggleInstructions
    }}>
      {children}
    </InstructionsContext.Provider>
  ); 
};

