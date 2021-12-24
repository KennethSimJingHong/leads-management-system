import React from "react";
import { AppBar, Button, Toolbar, Typography, Box } from "@material-ui/core";
import { Fragment } from "react";
import Login from "./guest/Login";
import { useGlobalStore } from "..";

function mapStates(store){
    return {authUser: store.authUser};
}

const Routes = () => {
    const {authUser} = useGlobalStore(mapStates);

    if(authUser){
        return (
        <Fragment>
            <AppBar position="fixed">
            <Toolbar>
                <Typography>Leads Management System</Typography>
            </Toolbar>
            </AppBar>
            <Toolbar />
            <h1>Hello World</h1>
        </Fragment>
        );
    }

    return <Login />
}

export default Routes;






