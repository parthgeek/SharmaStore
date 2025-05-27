import React, { useState } from 'react';
import { supabase } from '../supabase';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// Animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
`;

// Styled Components
const FormContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
  background-size: 400% 400%;
  animation: ${gradientShift} 15s ease infinite;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.3) 0%, transparent 50%);
    animation: ${float} 20s ease-in-out infinite;
  }
`;

const FormCard = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 3rem 2.5rem;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15),
              0 0 0 1px rgba(255, 255, 255, 0.05);
  animation: ${fadeInUp} 0.8s ease-out;
  position: relative;
  z-index: 1;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%);
    border-radius: 24px;
    pointer-events: none;
  }
`;

const FormHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
  position: relative;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  background: linear-gradient(135deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #64748b;
  font-weight: 400;
`;

const FormGroup = styled.div`
  margin-bottom: 1.75rem;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  letter-spacing: 0.025em;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;

  &:focus {
    outline: none;
    border-color: #667eea;
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1),
                0 10px 25px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }

  &::placeholder {
    color: #9ca3af;
    font-weight: 400;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  letter-spacing: 0.025em;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 20px 40px rgba(102, 126, 234, 0.4),
                0 0 0 1px rgba(255, 255, 255, 0.1);

    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.3);
  }
`;

const ToggleLink = styled.p`
  text-align: center;
  color: #667eea;
  cursor: pointer;
  margin-top: 2rem;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    color: #764ba2;
    transform: translateY(-1px);
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 50%;
    background: linear-gradient(135deg, #667eea, #764ba2);
    transition: all 0.3s ease;
    transform: translateX(-50%);
  }

  &:hover::after {
    width: 100%;
  }
`;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: async values => {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password
        });
        if (error) {
          alert('Login failed: ' + error.message);
        } else {
          formik.resetForm(); // Reset form before navigation
          navigate('/home');
        }
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: '${window.location.origin}/verify' // Update as needed
          }
        });
        if (error) {
          alert('Signup failed: ' + error.message);
        } else {
          alert('Signup successful! Please check your email to verify your account.');
          formik.resetForm(); // Reset form after successful signup
        }
      }
    }
  });

  // Reset form when toggling between login and signup
  const handleToggle = () => {
    formik.resetForm();
    setIsLogin(!isLogin);
  };

  return (
    <FormContainer>
      <FormCard>
        <FormHeader>
          <Title>{isLogin ? 'Welcome Back' : 'Join Us Today'}</Title>
          <Subtitle>{isLogin ? 'Enter your credentials to continue' : 'Create a new account to get started'}</Subtitle>
        </FormHeader>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <Label htmlFor="email">Email Address</Label>
            <InputWrapper>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                onChange={formik.handleChange}
                value={formik.values.email}
                required
              />
            </InputWrapper>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <InputWrapper>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                onChange={formik.handleChange}
                value={formik.values.password}
                required
              />
            </InputWrapper>
          </FormGroup>
          <SubmitButton type="submit">
            {isLogin ? 'Sign In' : 'Create Account'}
          </SubmitButton>
        </form>
        <ToggleLink onClick={handleToggle}>
          {isLogin
            ? "Don't have an account? Sign Up"
            : "Already have an account? Sign In"}
        </ToggleLink>
      </FormCard>
    </FormContainer>
  );
};
export default LoginPage;