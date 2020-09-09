import React from 'react';
import './App.css';
import Main from './components/Main/Main';

function App() {
  return (
    <div className="app">
      <header className="header">
        <p>Text</p>
        <img src="#" alt="Logo" />
      </header>

      <Main />

      <footer className="footer">
        <span className="footer__copyright">2020 all right reserved</span>
      </footer>
    </div>
  );
}

export default App;
