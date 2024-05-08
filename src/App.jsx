import { useState } from 'react'

import './App.css'
import AppContextProvider from './context/AppContext';
import DarkTheme from './theme/DarkTheme';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Home from './components/Home';

function App() {


  return (
    <AppContextProvider>
      <DarkTheme>
        <Header />
        <Home />
        <Footer />
      </DarkTheme>
    </AppContextProvider>
  );
}

export default App
