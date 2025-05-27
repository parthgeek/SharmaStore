import React, { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f7fafc;
`;

const Card = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 500px;
  width: 90%;
`;

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      
      if (!token) {
        alert('Invalid verification link');
        return navigate('/');
      }

      const { error } = await supabase.auth.verify({
        type: 'email',
        token,
      });

      if (error) {
        alert(`Verification failed: ${error.message}`);
        navigate('/login');
      } else {
        alert('Email verified successfully!');
        navigate('/home');
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <Container>
      <Card>
        <h2>Verifying Email...</h2>
        <p>Please wait while we verify your email address</p>
      </Card>
    </Container>
  );
};

export default VerifyEmail;