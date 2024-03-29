import React, { useEffect, useState, useContext } from "react";
import { Form, Button, Row, Col, Card, CardHeader, CardTitle } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import AssetContext from "../../context/Asset/AssetContext";
function AssetScreen({ handleDisableNext }) {
  const context = useContext(AssetContext);
  const { assetstructure, assetType, frequency } = context;
  let location = useLocation();
  const [loan, setLoan] = useState(location.state);
  const [asset, setAsset] = useState(assetstructure);
  const [readonly, setReadonly] = useState(false);

  const onApplicantChange = (e) => {
    setAsset({ ...asset, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setLoan(location.state);
    setAsset({ ...asset, category: location.state.bu })
  }, [location]);

  const createAsset = async (e) => {
    e.preventDefault();
    setReadonly(true);
    const resp = await fetch(`http://localhost:5000/data/asset/createasset`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(asset)
    });
    let assetNew = await resp.json();
    await handleDisableNext(assetNew, loan, 'Underwriting', 'Underwriting');
  }

  return (
    <Card className="inputBodyCard">
      <CardHeader className="inputheadercard">
        <CardTitle>Asset/Collateral Details</CardTitle>
      </CardHeader>
      {loan && (
        <Form
          onSubmit={(e) => {
            createAsset(e);
          }}
        >
          <Form.Group className="mb-3" controlId="bank1">
            <Row>
              <Col>
                <Form.Label>Loan Tenure in Months</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="loantenure"
                  type="number"
                  value={asset.loantenure}
                  max={72}
                  min={6}
                  step={6}
                  required={true}
                  readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Loan Amount</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="loanamount"
                  type="number"
                  min={1}
                  value={asset.loanamount}
                  readOnly={readonly}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="bank2">
            <Row>
              <Col>
                <Form.Label>Description</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="description"
                  type="text"
                  minLength={3}
                  required={true}
                  value={asset.description}
                  readOnly={readonly}
                />
              </Col>
              <Col>
                <Form.Label>Category</Form.Label>
                <Form.Control
                  className="inputField"
                  onChange={(e) => onApplicantChange(e)}
                  name="category"
                  type="text"
                  minLength={3}
                  value={asset.category}
                  readOnly={true}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3" controlId="family">
            <Row>
              <Col>
                <Form.Label>Frequency</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="frequency"
                  onChange={(e) => onApplicantChange(e)}
                  value={asset.frequency}
                  required={true}
                >
                  <option value=''>None</option>
                  {frequency &&
                    frequency.map((type) => {
                      return <option value={type} selected={type === asset.frequency}>{type}</option>;
                    })}
                </Form.Select>
              </Col>
              <Col>
                <Form.Label>Asset Type</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  className="inputField"
                  name="type"
                  onChange={(e) => onApplicantChange(e)}
                  value={asset.type}
                  required={true}
                >
                  <option value=''>None</option>
                  {assetType &&
                    assetType.map((type) => {
                      return <option value={type} selected={type === asset.type}>{type}</option>;
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

export default AssetScreen;
