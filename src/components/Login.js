import React, { useEffect, useState } from 'react';
import { Container, Box, TextField, Button } from '@mui/material';
import { userLogin } from '../api';
import { Link } from 'react-router-dom';

const Login = ({ setTabValue }) => {

    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        setTabValue('login');
        // eslint-disable-next-line
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user = await userLogin(username, password);
        
        if(user.error) {
            console.log(user.error);
            console.log(user.message);
        }
        else {
            console.log(user.message);
            console.log(user);
        }
    }

    return (
        <Container maxWidth='xs' sx={{minHeight: '100vh'}}>
            <Box>
                <h2 style={{textAlign: 'center'}}>Sign In</h2>
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