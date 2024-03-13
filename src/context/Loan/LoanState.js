import React from "react";
import LoanContext from "./LoanContext";

function LoanState(props) {
    const loanTypes = ['--','Home Loan', 'Gold Loan', 'Loan Against Property', 'Education Loan', 'Vehicle Loan - Car', 'Vehicle Loan - Two Wheeler', 'Personal Loan'];
    const locations = ['--','Mumbai', 'New Delhi', 'Banglore', 'Kolkata', 'Chennai'];
  return (
    <LoanContext.Provider value={{loanTypes, locations}}>
            {props.children}
    </LoanContext.Provider>
  )
}

export default LoanState
