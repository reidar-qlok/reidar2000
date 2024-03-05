import React from 'react';
import './App.css';
import './NotionTable.css';
import NotionDataFetcher from './NotionDataFetcher';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <NotionDataFetcher />
      </header>
    </div>
  );
}

export default App;
