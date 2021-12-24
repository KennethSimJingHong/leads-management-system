import React, { useCallback, useState } from 'react';
import { Box, Button, Divider, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import { globalStore } from '../..';

const useStyles = makeStyles(({spacing}) => { 
    return {
        wrapper: {
            display: 'flex',
            justifyContent: 'center',
            marginTop:spacing(10),
            
        },
        titleContainer: {
            display: 'flex',
            flexDirection: 'column'
        }
    }
})

const Login = () => {
    const classes = useStyles();

    const [{email, password, isSubmitting}, setState] = useState({
        email: {
            input: '',
            error: ''
        },
        password: {
            input: '',
            error: ''
        },
        isSubmitting: false
    })

    const emailChanged = useCallback(({target: {value}}) => {
        setState(oldState => ({
            ...oldState,
            email: {
                input: value,
                error: validateEmail(value)
            }
        }))
    }, []);

    const passwordChanged = useCallback(({target: {value}}) => {
        setState(oldState => ({
            ...oldState,
            password: {
                input: value,
                error: validatePassword(value)
            }
        }))
    }, []);

    const submit = useCallback(async e => {
        e.preventDefault();
        const emailError = validateEmail (email.input);
        const passwordError = validatePassword (password.input);

        if(emailError || passwordError){
            setState(oldState => ({
                ...oldState,
                email: {
                    input: oldState.email.input,
                    error: emailError
                },
                password: {
                    input: oldState.password.input,
                    error: passwordError
                }
            }))

            return;
        }

        setState(oldState => ({
            ...oldState,
            isSubmitting:true
        }))
    
        globalStore.updateStore({loading:true});

        try{
            const user = await Auth.signIn(email.input, password.input);
        }catch(error){
            globalStore.updateStore({loading:false});
        }

    }, [email.input, password.input]);

    function validateEmail(email){
        if(!email) return 'Required.';
        if( email.length > 320 ||
            (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)))
             return "Invalid format.";
        return '';
    }

    function validatePassword(password){
        if(!password) return 'Required.';

    }

    return (
        <form onSubmit={submit}>
            <Box className={classes.wrapper}>
                <Paper>
                    <Box p={2}>
                        <Box className={classes.titleContainer}>
                            <Typography variant="h4">Leads Management System</Typography>
                            <Typography>Login</Typography>
                        </Box>
                        <Box mt={1} mb={1}>
                            <Divider />
                        </Box>
                        <TextField 
                        error = {Boolean(email.error)}
                        helperText={<Typography variant='caption' color="error">{email.error}</Typography>}
                        disabled={isSubmitting}
                        value={email.input} onChange={emailChanged} placeholder='e.g., ken@gmail.com' fullWidth margin="dense" variant="outlined" label="Your email" type="email"/>
                        <TextField 
                        error = {Boolean(password.error)}
                        disabled={isSubmitting}
                        helperText={<Typography variant='caption' color="error">{password.error}</Typography>}
                        value={password.input} onChange={passwordChanged} placeholder='e.g., ken@gmail.com' fullWidth margin="dense" variant="outlined" label="Your password" type="password"/>
                        <Button disabled={isSubmitting} variant="contained" color="primary" fullWidth type='submit'>Login</Button>
                    </Box>
                </Paper>
            </Box>
        </form>
    );
};

export default Login;