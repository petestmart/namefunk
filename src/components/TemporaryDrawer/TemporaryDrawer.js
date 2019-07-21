// ========== REACT ========== //
import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// ========== MATERIAL UI ========== //
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// ========== STYLE ========== //
import { makeStyles } from '@material-ui/core/styles';
import './TemporaryDrawer.css';

// ========== ICONS ========== //
import IconButton from '@material-ui/core/IconButton';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuIcon from '@material-ui/icons/Menu';
import HomeIcon from '@material-ui/icons/Home';
import FolderIcon from '@material-ui/icons/Folder';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoIcon from '@material-ui/icons/Info';
import AccountIcon from '@material-ui/icons/AccountCircle';


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
                <ListItem component={Link} to="/home" button><HomeIcon className="icon" /> Home</ListItem>
                {props.user.username ? <ListItem component={Link} to="/names" button><FolderIcon className="icon" /> Saved Names</ListItem> : <div></div> }
                {props.user.username ? <ListItem component={Link} to="/project" button><DashboardIcon className="icon" /> My Project</ListItem> : <div></div>}
                <ListItem component={Link} to="/about" button><InfoIcon className="icon" /> About</ListItem>
            </List>

            <Divider />
            {props.user.username ?
                <List>
                    <ListItem
                        component={Link} to="/home"
                        onClick={() => props.dispatch({ type: 'LOGOUT' })}
                        button>
                        <AccountIcon className="icon" />
                        Logout
                    </ListItem>
                </List>
                :
                <div></div>
            }
            
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
