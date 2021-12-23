import logo from './logo.svg';
import React from 'react';
import { AppBar, Button, Toolbar, Typography, Box } from '@material-ui/core';
import { Fragment } from 'react';

function App() {
  return (
    <Fragment>
        <AppBar position="fixed">
          <Toolbar>
            <Typography>Leads Management System</Typography>
          </Toolbar>
        </AppBar>
        <Toolbar />
        <h1>Hello World</h1>
        <Button variant="contained" color="primary">Test Button</Button>
        <Box color="error">Test typography</Box>
    </Fragment>
  );
}

export default React.memo(App);
