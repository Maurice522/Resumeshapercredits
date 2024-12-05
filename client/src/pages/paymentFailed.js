import React from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailedPage = () => {
const navigate = useNavigate()

  const redirectToUpgrade = () => {
    navigate('/upgrade');
  };

  return (
    <div style={styles.container}>
      <div style={styles.errorIcon}>✗</div>
      <h2 style={styles.heading}>Payment Failed</h2>
      <p style={styles.message}>Oops! Something went wrong with your payment. Please try again.</p>
      <button style={styles.button} onClick={redirectToUpgrade}>
        Try Again
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: 'white',
  },
  errorIcon: {
    fontSize: '3rem',
    color: '#35b276',
    marginBottom: '20px',
  },
  heading: {
    color: '#35b276',
    marginBottom: '10px',
  },
  message: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#35b276',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1rem',
    cursor: 'pointer',
    border: 'none',
    borderRadius: '5px',
    outline: 'none',
  },
};

export default PaymentFailedPage;
