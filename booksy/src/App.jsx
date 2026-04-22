
import './App.css';
import Books from './components/Books/Books';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Hero></Hero>
      <Books></Books>
    </div>
  );
}

export default App;
