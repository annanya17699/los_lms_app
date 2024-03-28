import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Row, Col, Card, CardHeader, CardTitle } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import FinancialContext from "../../context/Financial/FinancialContext";
function FinancialScreen({handleDisableNext}) {
  const context = useContext(FinancialContext);
  const { bankstructure, accounttypelist } = context;
  let location = useLocation();
  const [loan, setLoan] = useState(location.state);
  const [bank, setBank] = useState(bankstructure);
  const [readonly, setReadonly] = useState(false);

  const onApplicantChange = (e) => {
    setBank({ ...bank, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoan(location.state);
  }, [location]);

  const createBankDetails = async (e) =>{
    e.preventDefault();
    setReadonly(true);
    const resp = await fetch(`http://localhost:5000/data/bank/createbankdetails`,{
      method : 'POST',
      headers : {
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify(bank)
    });
    let bankdetailsNew = await resp.json();
    await handleDisableNext(bankdetailsNew, loan,'Asset Details', 'Asset Details');
  }

  return (
    <Card className="inputBodyCard"> 
    <CardHeader className="inputheadercard">
      <CardTitle>Financial Details</CardTitle>
    </CardHeader>
      {loan && (
        <Form
          onSubmit={(e) => {
            createBankDetails(e);
          }}
        >
          <Form.Group className="mb-3" controlId="bank1">
            <Row>
              <Col>
                <Form.Label>Bank Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="bankname"
                  type="text"
                  value={bank.bankname}
                  minLength={3}
                  required={true}
                  readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Branch Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="branchname"
                  type="text"
                  value={bank.branchname}
                readOnly={readonly}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="bank2">
            <Row>
              <Col>
                <Form.Label>IFSC Code</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="ifsc"
                  type="text"
                  minLength={3}
                  required={true}
                  value={bank.ifsc}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>MICR Code</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="micr"
                  type="text"
                  minLength={3}
                  required={true}
                  value={bank.micr}
                readOnly={readonly}
                />
              </Col>
              </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="family">
            <Row>
              <Col>
                <Form.Label>Account Number</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="accountnumber"
                  type="text"
                  value={bank.accountnumber}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Beneficiary Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="beneficiary"
                  type="text"
                  value={bank.beneficiary}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Account Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="accounttype"
                  onChange={(e) => onApplicantChange(e)}
                  value={bank.accounttype}
                  required={true}
                >
                  <option value=''>None</option>
                  {accounttypelist &&
                    accounttypelist.map((type) => {
                      return <option value={type} selected={type === bank.accounttypelist}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Button className="inputSubmitBtn" type="submit" disabled={readonly}>
            Save Financial Details
          </Button>
        </Form>
      )}
    </Card>
  );
}

export default FinancialScreen;
