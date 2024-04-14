import React, { useState, useContext } from "react";
import LoanContext from "../../context/Loan/LoanContext";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
function CreateLoanScreen(props) {
  const context = useContext(LoanContext);
  const {loanTypes, locations, loanStructure} = context;
  const [newLoan, setNewLoan] = useState(loanStructure);
  const [validated, setValidated] = useState(false);
  let history = useHistory();
  const createLoan = async (e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }else if(form.checkValidity() === true){
    setValidated(true);
    const resp = await fetch(`http://localhost:5000/data/loan/createloan`,{
      method : 'POST',
      headers : {
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify(newLoan)
    });
    let savedLoan = await resp.json();
    history.push({pathname:`/loan/${savedLoan.lan}`, state :savedLoan});
    props.handleClose();
  }
  }

  const closeModal = () =>{
    props.handleClose();
  }
  const onChange = (e) =>{
    setNewLoan({...newLoan, [e.target.name]:e.target.value})
  }
  return (
    <div className="inputContainer">
      <h3>Create new Loan</h3>
      <Form onSubmit={(e)=>{createLoan(e)}}          
      noValidate
      validated={validated}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Stage</Form.Label>
          <Form.Control
          className="inputField"
          onChange={(e)=>onChange(e)}
          name="stage"
            type="text"
            value={newLoan.stage}
            readOnly
          />
          </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Primary Applicant Name</Form.Label>
          <Form.Control
          className="inputField"
          onChange={(e)=>onChange(e)}
          name="primaryApplicant"
            type="text"
            value={newLoan.primaryApplicant}
            required={true}
          />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Sub Stage</Form.Label>
          <Form.Control
          className="inputField"
          onChange={(e)=>onChange(e)}
          name="substage"
            type="text"
            readOnly
            value={newLoan.substage}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Location</Form.Label>
          <Form.Select aria-label="Default select example" className="inputField" name="location" required={true}
          onChange={(e)=>onChange(e)} value={newLoan.location}>
            {locations && locations.map((type)=>{
              return <option>{type}</option>
            })}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Business Unit</Form.Label>
          <Form.Select aria-label="Default select example" className="inputField" name="bu" required={true}
          onChange={(e)=>onChange(e)} value={newLoan.bu}>
            {loanTypes && loanTypes.map((type)=>{
              return <option>{type}</option>
            })}
          </Form.Select>
        </Form.Group>
        <Button className="createBtn" type="submit">
          Create Loan Application
        </Button>
        <Button className="inputBtnRev" style={{float : 'right'}} onClick={closeModal}>
            Cancel
        </Button>
      </Form>
    </div>
  );
}

export default CreateLoanScreen;
