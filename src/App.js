import './App.css';
import LOSHome from './components/LOS/LOSHome';
import LoanState from './context/Loan/LoanState';

function App() {
  return (
    <>
    <LoanState>
    <LOSHome/>
    </LoanState>
    
    </>
  );
}

export default App;
