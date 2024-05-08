import { createContext, useContext } from "react";
import { InstructionsProvider } from "./Providers/Instructions";
import { MatrixContextProvider } from "./Providers/Matrix";

export const InstructionsContext = createContext();
export const MatrixContext = createContext();

const AppContextProvider = (props) => {
  return ( 
    <InstructionsProvider>
      <MatrixContextProvider>
        {props.children}
      </MatrixContextProvider>
    </InstructionsProvider>
  );
}

export const useInstructionsContext = () => useContext(InstructionsContext);
export const useMatrixContext = () => useContext(MatrixContext);

export default AppContextProvider