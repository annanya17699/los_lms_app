import React, { useEffect, useState } from "react";
import CreateLoanScreen from "./CreateLoanScreen";
import {
  Button,
  Modal,
  Container,
  Card,
  Row,
  Col,
  Form,
} from "react-bootstrap";
import { FaPlusCircle, FaFilter, FaTrash } from "react-icons/fa";
import { GrView } from "react-icons/gr";
import { MdHomeWork } from "react-icons/md";
import { AiFillGolden } from "react-icons/ai";
import { FaMoneyBillTransfer , FaCar, FaPerson} from "react-icons/fa6";
import { IoIosSchool } from "react-icons/io";
import { RiEBikeFill } from "react-icons/ri";
function LoanList() {
  const [show, setShow] = useState(false);
  const [loanList, setLoanList] = useState([]);
  const loanTypesVSIcon = {
    "Home Loan" : <MdHomeWork className="icon"/> ,
    "Gold Loan" : <AiFillGolden className="icon"/> ,
    "Loan Against Property" : <FaMoneyBillTransfer className="icon"/> ,
    "Education Loan" : <IoIosSchool className="icon"/> ,
    "Vehicle Loan - Car" : <FaCar className="icon"/> ,
    "Vehicle Loan - Two Wheeler" : <RiEBikeFill className="icon"/> ,
    "Personal Loan" : <FaPerson className="icon"/> ,
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
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Container className="listContainer">
      <Button className="createBtn" onClick={handleShow}>
        Create Loan <FaPlusCircle />
      </Button>
      <Form></Form>
      <Button className="inputBtn">
        <FaFilter />
      </Button>
      <h3>Loan Applications</h3>
        {loanList &&
          loanList.map((loan) => {
            return (
              <div className="inputBodyCard">{loan.lan}</div>
            );
          })}

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
  );
}

export default LoanList;
