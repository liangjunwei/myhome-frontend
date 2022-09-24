import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import { createAccount } from '../api';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Register = ({ setTabValue, setToken, setIsAdmin }) => {

    let navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    
    useEffect(() => {
        setTabValue('login');
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: `Confirm Password Not Match`,
                text: `Please confirm your password again!`,
                showCloseButton: true
            });
        }
        else {
            const user = await createAccount(username, password);
        
            if(user.error) {
                Swal.fire({
                    icon: 'error',
                    title: `${user.error}`,
                    text: `${user.message}`,
                    showCloseButton: true
                });
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: `Welcome, ${user.user.username}`,
                    text: `${user.message}`,
                    showConfirmButton: false,
                    timer: 2000
                });
    
                window.localStorage.setItem('token', user.token);
                setToken(user.token);
                window.localStorage.setItem('isAdmin', user.user.isAdmin);
                setIsAdmin(user.user.isAdmin);
    
                setTabValue('listings');
                navigate("/listings", { replace: true });
            }
        }
    }

    return (
        <Container maxWidth='xs' sx={{minHeight: '100vh'}}>
            <Box>
                <h2 style={{textAlign: 'center'}}>Register Account</h2>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth id='register-username' label='Username' variant='outlined' value={username}
                               margin="normal" required onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField fullWidth id='register-password' label='Password' variant='outlined' value={password}
                               margin="normal" required type='password' onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField fullWidth id='register-confirm-password' label='Confirm Password' variant='outlined' value={confirmPassword}
                               margin="normal" required type='password' onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <Button fullWidth id='login-button' variant='contained' type='submit' size="large"
                            sx={{marginTop: '10px', marginBottom: '20px'}}
                    >
                        Sign Up
                    </Button>
                </form>
            </Box>
        </Container>
    );
}

export default Register;