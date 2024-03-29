import React, { useEffect, useState } from "react";
import CreateLoanScreen from "./CreateLoanScreen";
import {
  Button,
  Modal,
  Container,
  Row,
  Col,
  Form,
  Image,
  InputGroup,
  Alert
} from "react-bootstrap";
import HL from "../../assets/HL.jpg";
import PL from "../../assets/PL.jpg";
import GL from "../../assets/GL.jpg";
import LAP from "../../assets/LAP.jpg";
import NC from "../../assets/NC.jpg";
import TW from "../../assets/TW.jpg";
import EL from "../../assets/EL.jpg";
import { useHistory } from "react-router-dom";
import { FaPlusCircle, FaFilter, FaSearch, FaEdit } from "react-icons/fa";

function LoanList() {
  let history = useHistory();
  const [show, setShow] = useState(false);
  const [loanList, setLoanList] = useState([]);
  const loanTypesVSIcon = {
    "Home Loan": <Image src={HL} height={100} />,
    "Gold Loan": <Image src={GL} height={100} />,
    "Loan Against Property": <Image src={LAP} height={100} />,
    "Education Loan": <Image src={EL} height={100} />,
    "Vehicle Loan - Car": <Image src={NC} height={100} />,
    "Vehicle Loan - Two Wheeler": <Image src={TW} height={100} />,
    "Personal Loan": <Image src={PL} height={100} />,
  };
  useEffect(() => {
    fetchAllLoans();
  }, []);
  const fetchAllLoans = async () => {
    const resp = await fetch(`http://localhost:5000/data/loan/getloanlist`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    console.log(json);
    setLoanList(json);
  };
  const openExistingLoan = async (id) => {
    const resp = await fetch(`http://localhost:5000/data/loan/getloan/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await resp.json();
    history.push({pathname:`/loan/${json.lan}`, state :json});
  }
  const cancelLoan = async (id) => {
    const resp = await fetch(`http://localhost:5000/data/loan/cancelLoan/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        'cancelreason' : 'Cancel Loan'
      })
    });
    setShowAlert(true);
    fetchAllLoans();
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [showAlert, setShowAlert] = useState(false);

  return (
    <>
    { showAlert  ?  <>
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          <Alert.Heading>Loan Cancelled!</Alert.Heading>
        </Alert>
        </> : <></>
}
    <Container className="my-5">
      <Row>
        <Col>
          <Button className="createBtn mx-2" onClick={handleShow}>
            Create Loan <FaPlusCircle />
          </Button>
          <Button className="secondaryInputBtn" onClick={handleShow}>
            Filter <FaFilter />
          </Button>
        </Col>
        <Col>
          <Form>
            <InputGroup className="mb-3">
              <Form.Control type="text" placeholder="Search Loan Application" />
              <Button className="createBtn" type="submit">
                <FaSearch />
              </Button>
            </InputGroup>
          </Form>
        </Col>
      </Row>

      <h3>Loan Applications</h3>
      {loanList && loanList.length === 0 ? (
        <div className="inputBodyCard">No Loans Available</div>
      ) : (
        loanList.map((loan) => {
          return (
            <div className="inputBodyCard">
              <Row>
                <Col>{loanTypesVSIcon[loan.bu]}</Col>
                <Col>
                  <b className="textSecondary">{loan.lan}</b>
                  <br />
                  <b className="largeTextPrimary">{loan.primaryApplicant}</b>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <b className="textSecondary">
                        {loan.stage} | {loan.substage}
                      </b>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <b className="textSecondary">
                        Created : {new Date(loan.startdate).toLocaleDateString('en-GB')}
                      </b>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <span style={{ float: "center" }}>
                    <Button className="deleteBtn" hidden={loan.stage === 'Cancel' || loan.stage === 'Disbursal'} onClick={()=>cancelLoan(loan._id)}>
                      Cancel Loan
                    </Button>
                    <Button className="inputSubmitBtn mx-3" hidden={loan.stage === 'Cancel'} onClick={()=>openExistingLoan(loan._id)}>
                      Edit <FaEdit />
                    </Button>
                  </span>
                </Col>
              </Row>
            </div>
          );
        })
      )}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Body>
          <CreateLoanScreen handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </Container>
    </>
  );
}

export default LoanList;
