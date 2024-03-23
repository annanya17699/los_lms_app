import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import ApplicantContext from "../../context/Applicant/ApplicantContext";
function KYCScreen() {
  const context = useContext(ApplicantContext);
  const { applicantStructure, gender, maritalStatus, occupation } = context;
  let location = useLocation();
  const [loan, setLoan] = useState(location.state);
  const [applicant, setApplicant] = useState(applicantStructure);

  const onApplicantChange = (e) => {
    setApplicant({ ...applicant, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoan(location.state);
    setApplicant({...applicant, lan: location.state.lan, type : 'Applicant'});
    console.log(location.state)
  }, [location]);
  const updateLoan = () => {};
  return (
    <Container>
      {loan && (
        <Form
          onSubmit={(e) => {
            updateLoan(e);
          }}
        >
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
                  {gender &&
                    gender.map((type) => {
                      return <option>{type}</option>;
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
                  {occupation &&
                    occupation.map((type) => {
                      return <option>{type}</option>;
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
                  {maritalStatus &&
                    maritalStatus.map((type) => {
                      return <option>{type}</option>;
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
                  maxLength={10}
                  minLength={10}
                  required={true}
                  value={applicant.pan}
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
                />
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
                />
              </Col>
              <Col>
                <Form.Label>City</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="text"
                  type="city"
                  value={applicant.city}
                  required={true}
                  minLength={3}
                />
              </Col>
              <Col>
                <Form.Label>State</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="text"
                  type="state"
                  value={applicant.state}
                  required={true}
                  minLength={3}
                />
              </Col>
              <Col>
                <Form.Label>Pincode</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="number"
                  maxLength={6}
                  minLength={6}
                  required={true}
                  type="state"
                  value={applicant.state}
                />
              </Col>
            </Row>
          </Form.Group>
          <Button className="createBtn" type="submit">
            Save KYC Details
          </Button>
        </Form>
      )}
    </Container>
  );
}

export default KYCScreen;
