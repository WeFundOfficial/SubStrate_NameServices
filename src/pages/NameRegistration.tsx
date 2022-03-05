import { useState } from 'react';
import { useParams } from 'react-router';
import { Card } from 'react-bootstrap';

interface CounterInputProps {
  unit?: string;
  value: any;
  setValue: (any) => void;
}
const CounterInput = ({ unit, value, setValue }: CounterInputProps) => {
  return (
    <div className="input-group">
      <button
        className="btn btn-outline-secondary"
        onClick={() => setValue(value - 1)}
      >
        -
      </button>
      <input
        type="text"
        className="form-control"
        aria-label="counter input"
        value={value}
        onChange={(value) => setValue(value)}
      />
      <span className="input-group-text">{unit}</span>
      <button
        className="btn btn-outline-secondary"
        onClick={() => setValue(value + 1)}
      >
        +
      </button>
    </div>
  );
};
const ButtonNavBar = ({ titles, activeTitle, setActiveTitle }) => {
  return (
    <div className="btn-group" role="group" aria-label="Button Navigation Bar">
      {titles.map((title, index) => (
        <button
          type="button"
          style={{ minWidth: 100 }}
          key={index}
          className={`btn ${
            title === activeTitle ? 'btn-primary' : 'btn-outline-primary'
          }`}
        >
          {title}
        </button>
      ))}
    </div>
  );
};
const RegistrationSteps = ({ activeStep, ...rest }) => {
  return (
    <div className={`container-fluid ${rest?.className || ''}`}>
      <div className="row">
        <div className="col-12">
          <hr />
          <div className="fs-4">
            To Register your name you need to complete 3 steps:
          </div>
        </div>

        <div
          className={`col-12 pt-2 col-md-4 pt-md-3 ${
            activeStep === 1 ? 'text-primary' : 'text-muted'
          }`}
        >
          <h4> Step 1 : Request to Register</h4>
          <p>
            Your wallet will open and you will be asked to confirm the first of
            two transactions required for registration. If the second
            transaction is not processed within 7 days of the first, you will
            need to start again from step 1.
          </p>
        </div>
        <div
          className={`col-12 pt-2 col-md-4 pt-md-3 ${
            activeStep === 2 ? 'text-success' : 'text-muted'
          }`}
        >
          <h4> Step 2 : Wait at least for 1 minute</h4>
          <p>
            The waiting period is required to ensure another person hasn’t tried
            to register the same name and protect you after your request.
          </p>
        </div>
        <div
          className={`col-12 pt-2 col-md-4 pt-md-3 ${
            activeStep === 3 ? 'text-success' : 'text-muted'
          }`}
        >
          <h4> Step 3 :Complete your registration</h4>
          <p>
            Click ‘register’ and your wallet will re-open. Only after the 2nd
            transaction is confirmed you'll know if you got the name.
          </p>
        </div>
      </div>
    </div>
  );
};

const NameRegistrationForm = () => {
  let [leaseTime, setLeaseTime] = useState(1);
  return (
    <>
      <form>
        <div className="row">
          <div className="col-12 col-md-6 my-2">
            <CounterInput
              value={leaseTime}
              setValue={setLeaseTime}
              unit={leaseTime === 1 ? 'year' : 'years'}
            />
            <div className="form-text">Registration Period</div>
          </div>
          <div className="col-12 col-md-6 my-2">
            <div className="fw-light fs-4">{`${leaseTime * 2} DOT`}</div>
            <div className="form-text">Registration Price</div>
          </div>
        </div>
        <RegistrationSteps activeStep={0} className="pt-5" />
        <div className="row">
          <div className="col d-flex justify-content-end pe-3">
            <button className="btn btn-outline-primary">
              Request to Register
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

const NameRegistrationCard = () => {
  let { name } = useParams();

  return (
    <Card>
      <Card.Header>
        <div className="d-flex flex-column flex-md-row px-md-4 py-1 justify-content-between">
          <div className="d-flex align-items-center">
            <div className="fw-light fs-4">{name}</div>
          </div>
          <ButtonNavBar
            titles={['Register', 'Details', 'Subdomains']}
            activeTitle="Register"
            setActiveTitle={() => {}}
          />
        </div>
      </Card.Header>
      <Card.Body>
        <NameRegistrationForm />
      </Card.Body>
    </Card>
  );
};

export default NameRegistrationCard;
