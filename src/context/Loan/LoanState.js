import React from "react";
import LoanContext from "./LoanContext";

function LoanState(props) {
    const loanTypes = ['--','Home Loan', 'Gold Loan', 'Loan Against Property', 'Education Loan', 'Vehicle Loan - Car', 'Vehicle Loan - Two Wheeler', 'Personal Loan'];
    const locations = ['--','Mumbai', 'New Delhi', 'Banglore', 'Kolkata', 'Chennai'];
    const loanStructure = {
      lan: '',
      primaryApplicant: '',
      startdate: '',
      applicantList: [],
      assetList: [],
      so: '',
      uw: '',
      eligibility: false,
      creditscore: 0,
      disbursal: null,
      stage: 'New',
      substage: 'New',
      bu: '',
      location: '',
      cancelreason: '',
      canceldate: null
    }
  return (
    <LoanContext.Provider value={{loanTypes, locations, loanStructure}}>
            {props.children}
    </LoanContext.Provider>
  )
}

export default LoanState
