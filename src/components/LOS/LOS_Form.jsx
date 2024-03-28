import React, { useState , useEffect} from 'react'
import { Container, Button } from 'react-bootstrap';
import KYCScreen from './KYCScreen';
import { useLocation, useHistory } from "react-router-dom";
import FinancialScreen from './FinancialScreen';
const LOS_Form = () => {
    const steps = [{ label: 'Applicant KYC', step: 1 }, { label: 'Co-Applicant KYC', step: 2 }, { label: 'Financial Details', step: 3 }, { label: 'Asset Details', step: 4 }, { label: 'Underwriting', step: 5 }, { label: 'Upload Documents', step: 6 }, { label: 'Disbursal', step: 7 }];
    const [currentStep, setCurrentStep] = useState(1)
    const [disbursed, setDisbursed] = useState(false);
    const [disableNext, setDisableNext] = useState(true);
    const location = useLocation();
    const history = useHistory();
    useEffect(() => {
        let index = steps.findIndex( step => step.label === location.state.substage);
        setCurrentStep(index+1);
      }, [location]);

    const handleDisableNext = (data, loan,stage, substage) => {
        console.log(data._id);
        console.log(data);
        setDisableNext(false);
        updateLoan(loan._id, data._id,stage, substage)
    }
    const updateLoan = async (id, appId, stage, substage) =>{
        const resp = await fetch(`http://localhost:5000/data/loan/updateLoan/${id}/${appId}/${stage}/${substage}`,{
          method : 'PUT',
          headers : {
            "Content-Type": "application/json"
          } ,
        });
        let savedLoan = await resp.json();
    }      
    const handleSteps = () => {
        if (currentStep === steps.length) {
            setDisbursed(true);
        }
        if (currentStep >= steps.length) {
            setCurrentStep(steps.length);
        } else {
            setCurrentStep(currentStep + 1);
        }
        setDisableNext(true);
    }

    const handleHome = () => {
        history.push('/');
    }
    return (
        <Container>
            <div className='progressBar my-3'>
                {steps && steps.map((step, index) => (
                    <div key={index} className={`step-item ${currentStep === (index + 1) ? 'active' : ''}  ${(currentStep > (index + 1)) || disbursed ? 'complete' : ''}`}>
                        <div className='step'>{step.step}</div>
                        <p>{step.label}</p>
                    </div>
                ))}
            </div>
            <div className='inputContainer'>
                {currentStep === 1 && <KYCScreen handleDisableNext={handleDisableNext} type="Applicant"/>}
                {currentStep === 2 && <KYCScreen handleDisableNext={handleDisableNext} type="Co-Applicant"/>}
                {currentStep === 3 && <FinancialScreen handleDisableNext={handleDisableNext}/>}
                <Button className="createBtn" disabled={disableNext} onClick={handleSteps}>
                    Next
                </Button>
                <Button className="secondaryInputBtn mx-5" onClick={handleHome}>
                    Home
                </Button>
            </div>
        </Container>
    )
}

export default LOS_Form