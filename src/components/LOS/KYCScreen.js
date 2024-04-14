import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Row, Col, Card, CardHeader, CardTitle } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ApplicantContext from "../../context/Applicant/ApplicantContext";
function KYCScreen({handleDisableNext, type}) {
  const context = useContext(ApplicantContext);
  const { applicantStructure, gender, maritalStatus, occupation, nationality, IdProofList, AddProofList, education, relation } = context;
  let location = useLocation();
  const [loan, setLoan] = useState(location.state);
  const [applicant, setApplicant] = useState(applicantStructure);
  const [readonly, setReadonly] = useState(false);
  const [validated, setValidated] = useState(false);
  const onApplicantChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  useEffect(() => {
      setLoan(location.state);
      setApplicant({...applicant, lan: location.state.lan, type : type, relation: 'Self'});
  }, [location]);
 
  const createApplicant = async (e) =>{
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }else if(form.checkValidity() === true){
    setValidated(true);
    setReadonly(true);
    const resp = await fetch(`http://localhost:5000/data/applicant/createapplicant`,{
      method : 'POST',
      headers : {
        "Content-Type": "application/json"
      } ,
      body: JSON.stringify(applicant)
    });
    let applicantNew = await resp.json();
    if(type === 'Applicant') await handleDisableNext(applicantNew, loan,'KYC', 'Co-Applicant KYC');
    else if(type === 'Co-Applicant') await handleDisableNext(applicantNew, loan, 'Financial Details', 'Financial Details');
  }
  }

  return (
    <Card className="inputBodyCard"> 
    <CardHeader className="inputheadercard">
      <CardTitle>{type} Details</CardTitle>
    </CardHeader>
      {loan && (
        <Form
        noValidate
          validated={validated}
          onSubmit={(e) => {
            createApplicant(e);
          }}
        >
          <Form.Group className="mb-3" controlId="lan">
          <Form.Label>Loan Application Number</Form.Label>
                <Form.Control
                  className="inputField"
                  name="lan"
                  type="text"
                  value={applicant.lan}
                  readOnly={true}
                />
          </Form.Group>
          <Form.Group className="mb-3" controlId="name">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="fname"
                  type="text"
                  value={applicant.fname}
                  minLength={3}
                  required={true}
                  readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Middle Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="mname"
                  type="text"
                  value={applicant.mname}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="lname"
                  type="text"
                  value={applicant.lname}
                  minLength={3}
                  required={true}
                  readOnly={readonly}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="demographic">
            <Row>
              <Col>
                <Form.Label>Date of Birth</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="dob"
                  type="date"
                  value={applicant.dob}
                  required={true}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Gender</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="gender"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.gender}
                  required={true}
                >
                  <option value=''>None</option>
                  {gender &&
                    gender.map((type) => {
                      return <option value={type} selected={type === applicant.gender}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Occupation</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="occupation"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.occupation}
                  required={true}
                >
                  <option value=''>None</option>
                  {occupation &&
                    occupation.map((type) => {
                      return <option value={type} selected={type === applicant.occupation}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Education</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="education"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.education}
                  required={true}
                >
                  <option value=''>None</option>
                  {education &&
                    education.map((type) => {
                      return <option value={type} selected={type === applicant.education}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Marital Status</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="maritalStatus"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.maritalStatus}
                  required={true}
                >
                  <option value=''>None</option>
                  {maritalStatus &&
                    maritalStatus.map((type) => {
                      return <option value={type} selected={type === applicant.maritalStatus}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="contact">
            <Row>
              <Col>
                <Form.Label>PAN</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="pan"
                  type="text"
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                  required={true}
                  value={applicant.pan}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="mobile"
                  type="phone"
                  maxLength={10}
                  minLength={10}
                  required={true}
                  value={applicant.mobile}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="email"
                  type="email"
                  value={applicant.email}
                  required={true}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Nationality</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="nationality"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.nationality}
                  required={true}
                >
                  <option value=''>None</option>
                  {nationality &&
                    nationality.map((type) => {
                      return <option value={type} selected={type === applicant.nationality}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="demographic2">
            <Row>
              <Col>
                <Form.Label>House No/Building Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="house"
                  type="text"
                  value={applicant.house}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Street</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="street"
                  type="text"
                  value={applicant.street}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="city"
                  type="text"
                  required={true}
                  value={applicant.city}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>State</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="state"
                  type="text"
                  required={true}
                  value={applicant.state}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="pincode"
                  maxLength={6}
                  minLength={6}
                  type="number"
                  required={true}
                  value={applicant.pincode}
                readOnly={readonly}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="family">
            <Row>
              <Col>
                <Form.Label>Father Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="fatherName"
                  type="text"
                  value={applicant.fatherName}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Mother Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="motherName"
                  type="text"
                  value={applicant.motherName}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Spouse Name</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="spouse"
                  type="text"
                  value={applicant.spouse}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              {type === 'Co-Applicant' &&
              <Col>
                <Form.Label>Relation with Applicant</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="relation"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.relation}
                  required={true}
                >
                  <option value=''>None</option>
                  {relation &&
                    relation.map((type) => {
                      return <option value={type} selected={type === applicant.relation}>{type}</option>;
                    })}
                </Form.Select>
              </Col>}
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="proof">
            <Row>
              <Col>
                <Form.Label>Proof of Identity</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="poi"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.poi}
                  required={true}
                >
                  <option value=''>None</option>
                  {IdProofList &&
                    IdProofList.map((type) => {
                      return <option value={type} selected={type === applicant.poi}>{type}</option>;
                    })}
                </Form.Select>
                <br/>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="poinum"
                  type="text"
                  value={applicant.poinum}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Proof of Address</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="poa"
                  onChange={(e) => onApplicantChange(e)}
                  value={applicant.poa}
                  required={true}
                >
                  <option value=''>None</option>
                  {AddProofList &&
                    AddProofList.map((type) => {
                      return <option value={type} selected={type === applicant.poa}>{type}</option>;
                    })}
                </Form.Select>
                <br/>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="poanum"
                  type="text"
                  value={applicant.poanum}
                  required={true}
                  minLength={3}
                readOnly={readonly}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button className="inputSubmitBtn" type="submit" disabled={readonly}>
            Save KYC Details
          </Button>
        </Form>
      )}
    </Card>
  );
}

export default KYCScreen;
