import { LinearProgress, makeStyles } from "@material-ui/core";
import React, { Fragment } from "react";
import { useGlobalStore } from ".";

import Routes from './routes/index';

const useStyle = makeStyles({
  LinearProgress: {
    position: 'fixed',
    top: 0,
    left:0, 
    width:'100%'

  }
})

function mapStates (store){
  return {
    loading: store.loading
  }; 
}

function App() {
  const {loading} = useGlobalStore(mapStates);
  const classes = useStyle();

  return (
    <Fragment>
      {loading ? <Box className={classes.LinearProgress}><LinearProgress/></Box> : null}
      <Routes />
    </Fragment>
  );
}

export default React.memo(App);
