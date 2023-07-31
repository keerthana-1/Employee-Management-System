import logo from './logo.svg';
import './App.css';
import ListEmployeeComponent from './components/ListEmployeeComponent';
import AddEmployeeComponent from './components/AddEmployeeComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import UpdateEmployeeComponent from './components/UpdateEmployeeComponent';


function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
       
          <Route path="/" exact ><ListEmployeeComponent></ListEmployeeComponent></Route>
          <Route path="/employees"><ListEmployeeComponent/></Route>
          <Route path="/add-employee/:id"><AddEmployeeComponent/></Route>
          {/* <Route path="/update-employee/:id"><UpdateEmployeeComponent/></Route> */}
        </Switch>
       
        </div>
    </Router>
  );
}

export default App;
