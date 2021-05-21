import React, { useCallback, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

type ValidationState = {
  type?: "valid" | "invalid";
  message?: string;
};

const validateForm = (password: string, confirmPassword: string): ValidationState => {
  const state: ValidationState = {
    type: "valid",
    message: "Password is valid"
  };

  if (password.length < 6) {
    state.type = "invalid";
    state.message = "Password must be at least 6 characters";
  } else if (!/^(?=.*[A-Z])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must contain at least one uppercase letter";
  } else if (!/^(?=.*[a-z])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must be at least one lowercase letter";
  } else if (!/^(?=.*[0-9])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must be at least one number";
  } else if (!/^(?=.*[!@#$%^&*()_\-+={[}\]|:;"'<,>.])/.test(password)) {
    state.type = "invalid";
    state.message = "Password must be at least one special character (!@#$%^&*()_-+={[}]|:;\"'<,>.)";
  } else if (password !== confirmPassword) {
    state.type = "invalid";
    state.message = "Password does not match confirmation";
  }

  return state;
}

function App() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [showInputs, setShowInputs] = useState(false);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [validationState, setValidationState] = useState<ValidationState>({});

  const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const validation = validateForm(password, passwordConfirm);
    setValidationState(validation);
    setSubmitDisabled(true);
  }, [password, passwordConfirm, setValidationState, setSubmitDisabled]);

  const onPasswordChange = useCallback((value: string) => {
    setPassword(value);
    setValidationState({});
    setSubmitDisabled(false);
  }, [setPassword, setValidationState, setSubmitDisabled]);

  const onPasswordConfirmationChange = useCallback((value: string) => {
    setPasswordConfirm(value);
    setValidationState({});
    setSubmitDisabled(false);
  }, [setPasswordConfirm, setValidationState, setSubmitDisabled]);

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
          <Form.Label htmlFor="password">Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showInputs ? "text" : "password"}
              id="password"
              aria-describedby="password"
              value={password}
              onChange={e => onPasswordChange(e.target.value)}
              isInvalid={validationState.type === 'invalid'}
              isValid={validationState.type === 'valid'}
            />
             <InputGroup.Append>
              <InputGroup.Text>
                <FontAwesomeIcon onClick={() => setShowInputs(showInputs => !showInputs)} icon={showInputs ? faEyeSlash : faEye} />
              </InputGroup.Text>
            </InputGroup.Append>
            <FormControl.Feedback type={validationState.type}>
              {validationState.message}
            </FormControl.Feedback>
            <Form.Text id="passwordHelp" muted>
              Your password must be at 6 characters long and contains at least one of each of the following;
              uppercase letter, lowercase letter, number, and a special character{"(!@#$%^&*()_-+={[}]|:;\"'<,>.)"}
            </Form.Text>
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} md={{ span: 6, offset: 3 }}>
          <Form.Label htmlFor="passwordConfirm">Confirm Password</Form.Label>
          <Form.Control
            type={showInputs ? "text" : "password"}
            id="passwordConfirm"
            aria-describedby="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onPasswordConfirmationChange(e.target.value)}
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Col md={{ span: 6, offset: 3 }}>
          <Button type="submit" disabled={submitDisabled}>Submit Password</Button>
        </Col>
      </Form.Row>
    </Form>
  );
}

export default App;
