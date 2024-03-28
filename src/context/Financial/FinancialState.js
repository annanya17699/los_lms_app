import React from "react";
import FinancialContext from "./FinancialContext";

function FinancialState(props) {
    const accounttypelist = ['Savings Account', 'Current Account', 'Salary Account', 'Fixed Deposit Account', 'Recurring Deposit Account', 'NRI Account']

    const bankstructure = {
        bankname : '',
        branchname : '',
        ifsc : '',
        micr : '',
        beneficiary : '',
        accountnumber : '',
        accounttype : ''
    };
    return (
        <FinancialContext.Provider
            value={{
                bankstructure, accounttypelist
            }}
        >
            {props.children}
        </FinancialContext.Provider>
    );
}

export default FinancialState;
