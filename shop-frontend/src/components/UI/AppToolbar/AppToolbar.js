import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import {AppBar, Grid, Toolbar, Typography} from "@mui/material";
import Anonymous from "./Menu/Anonymous";
import UserMenu from "./Menu/UserMenu";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";

import {makeStyles} from "tss-react/mui";
const useStyles = makeStyles()(theme => ({
    mainLink: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            color: 'inherit'
        },
    },
    staticToolbar: {
        marginBottom: theme.spacing(2)
    },
}));
const AppToolbar = () => {
    const { classes } = useStyles(null);
    const user = useSelector(state => state.users.user);

    return (
        <>
            <AppBar position="fixed">
                <ToastContainer />

                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography variant="h6">
                                <Link to="/" className={classes.mainLink}>
                                    Computer parts shop
                                </Link>
                            </Typography>
                        </Grid>
                        <Grid item>
                            {user ? <UserMenu user={user}/> : <Anonymous/>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Toolbar className={classes.staticToolbar}/>
        </>
    );
};
export default AppToolbar;
