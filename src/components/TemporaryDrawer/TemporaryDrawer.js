import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
// import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
// import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
// import LogoutIcon from '@material-ui/core/LogoutIcon';
// import logo from '../App/logo.svg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


const useStyles = makeStyles({
    list: {
        width: 250,
    },

    fullList: {
        width: 'auto',

    },
});

function TemporaryDrawer(props) {
    const classes = useStyles();
    const [state, setState] = React.useState({
        left: false,
    });

    const toggleDrawer = (side, open) => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [side]: open });
    };

    const sideList = side => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer(side, false)}
            onKeyDown={toggleDrawer(side, false)}
        >
            <List>
                {['NameFunk'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>
                            <MenuIcon />
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>

            <Divider />

            <List>
                {[
                    <Link to="/home">
                        {props.user.id ? 'Get More Names' : 'Login / Register'}
                    </Link>,
                    <Link to="/names">
                        {props.user.id ? 'Saved Names' : ''}
                    </Link>
                    ,
                    <Link to="/project">
                        { props.user.id ? 'My Projects' : '' }
                    </Link>,
                    <Link to="/new">
                        { props.user.id ? 'New Project' : ''}
                    </Link>
                ,
                    // {props.user.id && (
                    //         <>
                    <Link className="nav-link" to="/info">
                        Info Page
                    </Link>
                    // </>
                    // )}
                ].map((text, index) => (
                    <ListItem button key={text}>
                    <ListItemIcon>{index % 2 === 0 ?
                        <i class="material-icons">
                            folder
                            </i> :
                        <MailIcon />
                    }
                    </ListItemIcon>
                    <ListItemText primary={text} />
                </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['Logout'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ?
                            <i class="material-icons">
                                check_box_outline_blank
                            </i> :
                            <i class="material-icons">
                                account_circle
                            </i>}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <div>
            <IconButton onClick={toggleDrawer('left', true)}><MenuIcon /></IconButton>
            <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
                {sideList('left')}
            </Drawer>
        </div>
    );
}

const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(TemporaryDrawer);
