import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

export default function SimpleAppBar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Toolbar>
                    <Typography variant="h6" color="inherit">
                        History Progress
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}