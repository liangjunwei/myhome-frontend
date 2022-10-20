import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import { userLogin } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = ({ setTabValue, setToken, setIsAdmin }) => {

    let navigate = useNavigate();

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        window.scrollTo(0, 0);
        setTabValue('login');
        sessionStorage.setItem('tabValue', JSON.stringify('login'));
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await userLogin(username, password);
        
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

            sessionStorage.setItem('token', user.token);
            setToken(user.token);
            sessionStorage.setItem('isAdmin', JSON.stringify(user.user.isAdmin));
            setIsAdmin(user.user.isAdmin);

            setTabValue('listings');
            navigate("/listings", { replace: true });
        }
    }

    return (
        <Container maxWidth='xs' sx={{minHeight: '100vh'}}>
            <Box sx={{marginTop: '100px'}}>
                <h2 className='small-title'>Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <TextField fullWidth id='login-username' label='Username' variant='outlined' value={username}
                               margin="normal" required onChange={(e) => setUserName(e.target.value)}
                    />
                    <TextField fullWidth id='login-password' label='Password' variant='outlined' value={password}
                               margin="normal" required type='password' onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button fullWidth id='login-button' variant='contained' type='submit' size="large"
                            sx={{marginTop: '10px', marginBottom: '20px'}}
                    >
                        Sign In
                    </Button>
                </form>
                <Link id='register-link' to='/register'><p style={{textAlign: 'center'}}>Don't have account? Register here!</p></Link>
            </Box>
        </Container>
    );
}

export default Login;