import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import { ThemeProvider } from '@material-ui/styles';
// import MenuIcon from '@material-ui/icons/Menu';

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
                    <IconButton edge="start" className={classes.menuButton} color="primary" aria-label="Menu">
                        {/* <MenuIcon /> */}
                    </IconButton>
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