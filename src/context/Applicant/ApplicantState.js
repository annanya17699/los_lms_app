import React from "react";
import ApplicantContext from "./ApplicantContext";

function ApplicantState(props) {
  const IdProofList = ['Aadhaar', 'Driver License', 'Voter Id Card', 'Passport'];
  const AddProofList = ['Aadhaar', 'Driver License', 'Voter Id Card', 'Passport'];
  const gender = ["Male", "Female", "Transgender"];
  const maritalStatus = ["Single", "Married", "Divorced", "Widowed"];
  const relation = ["Father", "Mother", "Son", "Daughter", "Spouse", "Brother", "Sister","Father In Law", "Mother In Law", "Brother In Law", "Sister in Law", "Son In Law", "Daughter In Law"];
  const nationality = ["Indian", "NRI"];
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
    relation: ""
  };
  return (
    <ApplicantContext.Provider
      value={{
        applicantStructure,
        gender,
        maritalStatus,
        education,
        occupation,
        nationality,
        AddProofList,
        IdProofList,
        relation
      }}
    >
      {props.children}
    </ApplicantContext.Provider>
  );
}

export default ApplicantState;
