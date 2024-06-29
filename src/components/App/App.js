import logo from './logo.svg';
import './App.css';
import SearchResults from '../SearchResults/SearchResults';
import SearchBar from '../SearchBar/SearchBar';
import { useState } from 'react';

const searchResults = [{
  name: 'PDFfile',
  artist: 'Bina',
  album: 'PDFfile',
  id: '1'
},
{
  name: 'Diarrhea Angel',
  artist: 'Senya',
  album: 'Shittida',
  id: '2'
},
{
  name: 'Diarrhea Angel',
  artist: 'Senya',
  album: 'Shittida',
  id: '3'
}];

function App() {

  // useState for results, etc
  const [ searchResult, setSearchResult ] = useState([]);

  const handleSearch = () => {
    setSearchResult(searchResults);
  }

  return (
    <div className="App">
      <SearchBar />
      <SearchResults searchResult={searchResult}/>
    </div>
  );
}

export default App;
