import React, { useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

//Validation state type
type ValidationState = {
  type?: "valid" | "invalid";
  message?: string;
};

//Form validation logic
//Extracted to a pure function
//Takes in the password and the confirmation input values
//Return a validation state(either valid or invalid with the reason)
const validateForm = (password: string, confirmPassword: string): ValidationState => {

  //Assume the state is valid
  const state: ValidationState = {
    type: "valid",
    message: "Password is valid"
  };

  //Go through validation checks
  //Update state to invalid accordingly

  //Check the min length
  if (password.length < 6) {
    state.type = "invalid";
    state.message = "Password must be at least 6 characters";
  //Check for at least one capital letter via regex
  } else if (!/^(?=.*[A-Z])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must contain at least one uppercase letter";
  //Check for at least one lowercase letter
  } else if (!/^(?=.*[a-z])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must contain at least one lowercase letter";
  //Check for at least one number
  } else if (!/^(?=.*[0-9])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must contain at least one number";
  //Check for at least one special character
  } else if (!/^(?=.*[!@#$%^&*()_\-+={[}\]|:;"'<,>.])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must contain at least one special character (!@#$%^&*()_-+={[}]|:;\"'<,>.)";
  //Make sure password matches confirmation
  } else if (password !== confirmPassword) {
    state.type = "invalid";
    state.message = "Password does not match confirmation";
  }

  //Return state
  return state;
}

const PasswordForm: React.FC = ({ }) => {
  //Password input
  const [password, setPassword] = useState("");
  //Confirmation input
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //Toggle to show inputs mask or unmasked
  const [showInputs, setShowInputs] = useState(false);
  //Toggle disabled flag for submit button
  const [submitDisabled, setSubmitDisabled] = useState(true);
  //Validation state of form
  const [validationState, setValidationState] = useState<ValidationState>({});

  //Submit handler
  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    //Prevent default browser behavior 
    event.preventDefault();
    event.stopPropagation();
    //Check validation
    const validation = validateForm(password, passwordConfirm);
    //Update state
    setValidationState(validation);
    //Disable button to avoid resubmission until form value changes
    setSubmitDisabled(true);
  }, [password, passwordConfirm, setValidationState, setSubmitDisabled]);

  //Password input change handler
  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);//Update stateful value
    setValidationState({});//Clear validation state
    setSubmitDisabled(false);//Re-enable submit button
  }, [setPassword, setValidationState, setSubmitDisabled]);

  //Password confirmation input change handler
  const onPasswordConfirmationChange = useCallback((value: string) => {
    setPasswordConfirm(value);//Update staeful value
    setValidationState({});//Clear validation state
    setSubmitDisabled(false);//Re-enable submit button
  }, [setPasswordConfirm, setValidationState, setSubmitDisabled]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
          <Form.Label data-testid="passwordLabel" htmlFor="password">Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showInputs ? "text" : "password"}
              data-testid="password"
              id="password"
              aria-describedby="password"
              value={password}
              onChange={e => onPasswordChange(e.target.value)}
              isInvalid={validationState.type === 'invalid'}
              isValid={validationState.type === 'valid'}
            />
             <InputGroup.Append>
              <InputGroup.Text>
                <FontAwesomeIcon data-testid="showHideIcon" onClick={() => setShowInputs(showInputs => !showInputs)} icon={showInputs ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup.Append>
            <FormControl.Feedback data-testid="passwordValidation" type={validationState.type}>
              {validationState.message}
            </FormControl.Feedback>
            <Form.Text data-testid="passwordHelp" muted>
              Your password must be at 6 characters long and contains at least one of each of the following;
              uppercase letter, lowercase letter, number, and a special character{"(!@#$%^&*()_-+={[}]|:;\"'<,>.)"}
            </Form.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
          <Form.Label data-testid="passwordConfirmLabel" htmlFor="passwordConfirm">Confirm Password</Form.Label>
          <Form.Control
            type={showInputs ? "text" : "password"}
            id="passwordConfirm"
            data-testid="passwordConfirm"
            aria-describedby="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onPasswordConfirmationChange(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Button data-testid="passwordSubmit" type="submit" disabled={submitDisabled}>Submit Password</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default PasswordForm;
