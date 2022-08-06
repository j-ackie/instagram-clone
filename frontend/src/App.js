import './App.css';
import { Switch, Route, Link } from "react-router-dom";
import PostDataService from './services/post';

function App() {
  return (
    <div className="App">
      <button onClick={ () => {
        PostDataService.createPos("hello")
        .then(response => {
          console.log(response.data);
        });
      } }>
        hey
      </button>
    </div>
  );
}

export default App;
