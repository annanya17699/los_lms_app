import './App.css';
import KYCScreen from './components/LOS/KYCScreen';
import LOSHome from './components/LOS/LOSHome';
import ApplicantState from './context/Applicant/ApplicantState';
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
    <ApplicantState>
    <Router>
        <Switch>
          <Route exact path="/">
          <LOSHome/>
          </Route>
          <Route exact path="/kyc">
          <KYCScreen/>
          </Route>
        </Switch>
    </Router>
    </ApplicantState>
    </LoanState>
    
    </>
  );
}

export default App;
