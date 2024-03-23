import React from "react";
import ApplicantContext from "./ApplicantContext";

function ApplicantState(props) {
  const gender = ["Male", "Female", "Transgender"];
  const maritalStatus = ["Single", "Married", "Divorced", "Widowed"];
  const education = [
    "Matric",
    "Intermediate",
    "Graduate",
    "Post Graduate",
    "Diploma",
    "Doctorate",
    "Illiterate",
  ];
  const occupation = [
    "Student",
    "Business",
    "Bank Employee",
    "Govt. Employee",
    "Medical Professional",
    "Engineering",
    "Farming/Dairy",
    "Costruction",
    "Courier Services",
    "Other",
  ];
  const applicantStructure = {
    lan: "",
    type: "",
    fname: "",
    mname: "",
    lname: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    education: "",
    poi: "",
    poa: "",
    poinum: "",
    poanum: "",
    occupation: "",
    pan: "",
    nationality: "",
    house: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    fatherName: "",
    motherName: "",
    spouse: "",
    email: "",
    mobile: "",
  };
  return (
    <ApplicantContext.Provider
      value={{
        applicantStructure,
        gender,
        maritalStatus,
        education,
        occupation,
      }}
    >
      {props.children}
    </ApplicantContext.Provider>
  );
}

export default ApplicantState;
