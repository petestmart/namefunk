import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';

const theme = createMuiTheme({
    palette: {
        primary: { main: '#e61610'},
    },
});

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function ButtonAppBar() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
            <AppBar position="static">
                <Toolbar>
                        <TemporaryDrawer />
                    <Typography variant="h6" className={classes.title}>
                        NameFunk
          </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            </ThemeProvider>
        </div>
    );
}

export default ButtonAppBar;