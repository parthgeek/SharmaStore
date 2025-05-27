import React from 'react';
import { useFormik } from 'formik';
import { supabase } from '../supabase';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
  font-family: 'Arial', sans-serif;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  width: 100%;
  max-width: 400px;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  color: #2d3748;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: #4a5568;
  display: block;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.625rem 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.25);
    outline: none;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #5a67d8;
  color: white;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: #4c51bf;
  }
`;

const Message = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: ${props => (props.error ? '#e53e3e' : '#38a169')};
  margin-top: 1rem;
`;

const SignupPage = () => {
  const navigate = useNavigate();
  const [message, setMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async values => {
      setMessage('');
      setError('');
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          emailRedirectTo: '${window.location.origin}/verify'
        }
      });

      if (error) {
        setError(error.message);
      } else {
        setMessage('Signup successful! Please check your email to verify your account.');
        setTimeout(() => navigate('/'), 2000);
      }
    }
  });

  return (
    <Container>
      <Card>
        <Title>Create Account</Title>
        <Subtitle>Sign up to continue shopping</Subtitle>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              required
            />
          </FormGroup>
          <Button type="submit">Sign Up</Button>
        </form>
        {message && <Message>{message}</Message>}
        {error && <Message error>{error}</Message>}
      </Card>
    </Container>
  );
};

export default SignupPage;

