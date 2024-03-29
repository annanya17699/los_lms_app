import "./App.css";
import LOSHome from "./components/LOS/LOSHome";
import LOS_Form from "./components/LOS/LOS_Form";
import ApplicantState from "./context/Applicant/ApplicantState";
import AssetState from "./context/Asset/AssetState";
import FinancialState from "./context/Financial/FinancialState";
import LoanState from "./context/Loan/LoanState";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  return (
    <>
      <LoanState>
        <ApplicantState>
          <FinancialState>
            <AssetState>
              {
                <Router>
                  <Switch>
                    <Route exact path="/">
                      <LOSHome />
                    </Route>
                    <Route exact path="/loan/:loannumber">
                      <LOS_Form />
                    </Route>
                  </Switch>
                </Router>
              }
            </AssetState>
          </FinancialState>
        </ApplicantState>
      </LoanState>
    </>
  );
}

export default App;
