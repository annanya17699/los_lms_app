import './App.css';
import LOSHome from './components/LOS/LOSHome';
import LoanState from './context/Loan/LoanState';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
function App() {
  return (
    <>
    <LoanState>
    <Router>
        <Switch>
          <Route path="/">
          <LOSHome/>
          </Route>
        </Switch>
    </Router>
    </LoanState>
    </>
  );
}

export default App;
