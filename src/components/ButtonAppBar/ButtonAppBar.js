import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import TemporaryDrawer from '../TemporaryDrawer/TemporaryDrawer';
import { connect } from 'react-redux';


const theme = createMuiTheme({
    palette: {
        primary: { main: '#e61610' },
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
        fontSize: 24,
    },
}));

function ButtonAppBar(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <ThemeProvider theme={theme}>
                <AppBar position="static">
                    <Toolbar>
                        <TemporaryDrawer />
                        <Typography variant="h1" className={classes.title}>
                            Welcome, {props.user.username}!
                    </Typography>
                        <Button
                            color="inherit"
                            onClick={() => props.dispatch({ type: 'LOGOUT' })}
                        >Logout</Button>
                    </Toolbar>
                </AppBar>
            </ThemeProvider>
        </div>
    );
}
const mapStateToProps = state => ({
    user: state.user,
});
export default connect(mapStateToProps)(ButtonAppBar);