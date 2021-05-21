import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

test('renders all form controls', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toBeInTheDocument();
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toBeInTheDocument();
  const submitButton = screen.getByTestId('passwordSubmit');
  expect(submitButton).toBeInTheDocument();
  expect(submitButton).toBeDisabled();
  const showHideToggle = screen.getByTestId("showHideIcon");
  expect(showHideToggle).toBeInTheDocument();
});

test('show/hide icon works', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const showHideToggle = screen.getByTestId("showHideIcon");
  fireEvent.click(showHideToggle);
  expect(passwordInput).toHaveAttribute('type', 'text');
  expect(passwordConfirmInput).toHaveAttribute('type', 'text');
});

test('minimum length validation check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "abc" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-invalid");
  expect(passwordValidation).toHaveClass("invalid-feedback");
  expect(passwordValidation).toHaveTextContent("Password must be at least 6 characters");
  expect(submitButton).toBeDisabled();
});

test('uppercase letter validation check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "abc123" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-invalid");
  expect(passwordValidation).toHaveClass("invalid-feedback");
  expect(passwordValidation).toHaveTextContent("Password must contain at least one uppercase letter");
  expect(submitButton).toBeDisabled();
});

test('lowercase letter validation check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "ABC123" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-invalid");
  expect(passwordValidation).toHaveClass("invalid-feedback");
  expect(passwordValidation).toHaveTextContent("Password must contain at least one lowercase letter");
  expect(submitButton).toBeDisabled();
});

test('number validation check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "abcABC" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-invalid");
  expect(passwordValidation).toHaveClass("invalid-feedback");
  expect(passwordValidation).toHaveTextContent("Password must contain at least one number");
  expect(submitButton).toBeDisabled();
});

test('symbol validation check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "abcABC123" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-invalid");
  expect(passwordValidation).toHaveClass("invalid-feedback");
  expect(passwordValidation).toHaveTextContent("Password must contain at least one special character (!@#$%^&*()_-+={[}]|:;\"'<,>.)");
  expect(submitButton).toBeDisabled();
});

test('confirmation mismatch validation check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "abcABC123$%" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-invalid");
  expect(passwordValidation).toHaveClass("invalid-feedback");
  expect(passwordValidation).toHaveTextContent("Password does not match confirmation");
  expect(submitButton).toBeDisabled();
});

test('valid password check', () => {
  render(<App />);
  const passwordInput = screen.getByLabelText("Password");
  expect(passwordInput).toHaveAttribute('type', 'password');
  const passwordConfirmInput = screen.getByLabelText("Confirm Password");
  expect(passwordConfirmInput).toHaveAttribute('type', 'password');
  const submitButton = screen.getByTestId('passwordSubmit');
  fireEvent.change(passwordInput, { target: { value: "abcABC123$%" } });
  fireEvent.change(passwordConfirmInput, { target: { value: "abcABC123$%" } });
  expect(submitButton).toBeEnabled();
  fireEvent.submit(submitButton);
  const passwordValidation = screen.getByTestId("passwordValidation");
  expect(passwordInput).toHaveClass("is-valid");
  expect(passwordValidation).toHaveClass("valid-feedback");
  expect(passwordValidation).toHaveTextContent("Password is valid");
  expect(submitButton).toBeDisabled();
  fireEvent.change(passwordInput, { target: { value: "abcABC123$" } });
  fireEvent.change(passwordConfirmInput, { target: { value: "abcABC123$" } });
  expect(submitButton).toBeEnabled();
});