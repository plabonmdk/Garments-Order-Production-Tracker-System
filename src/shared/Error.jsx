import React from 'react';
import { useNavigate } from 'react-router';

const Error = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/');
    };

    return (
        <div style={styles.container}>
            <img 
                src="https://i.ibb.co/7xQjrVnz/error-404-page-not-found-landing-page-concept-for-mobile-and-pc-free-vector-removebg-preview.png" 
                alt="Error" 
                style={styles.image} 
            />
            <h1 style={styles.title}>Oops! Page not found.</h1>
            <button onClick={goHome} style={styles.button}>
                Back to Home
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
        textAlign: 'center',
        backgroundColor: '#f8f8f8',
    },
    image: {
        width: '300px',
        marginBottom: '20px',
    },
    title: {
        marginBottom: '20px',
        fontSize: '24px',
        color: '#333',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        cursor: 'pointer',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        borderRadius: '5px',
    },
};

export default Error;
