import React from 'react';
import { useNavigate } from "react-router-dom";

const SuccessfulPaymentPage = () => {
  const navigate = useNavigate();
    const redirectToDashboard = () => {
        navigate("/dashboard")
  };

  return (
    <div style={styles.container}>
      <div style={styles.successIcon}>✓</div>
      <h2 style={styles.heading}>Payment Successful!</h2>
      <p style={styles.message}>Thank you for your payment. Your transaction was successful.</p>
      <button style={styles.button} onClick={redirectToDashboard}>
        Go to Dashboard
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
  successIcon: {
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

export default SuccessfulPaymentPage;
