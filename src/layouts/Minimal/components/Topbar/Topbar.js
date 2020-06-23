import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar, IconButton } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import { history } from "../../../../history";
const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const Topbar = props => {
  const { className, ...rest } = props;

  const classes = useStyles();
  const onSignOut = () => {
    history.push('/sign-up')
  }
  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="primary"
      position="fixed"
    >
      <Toolbar>
          <IconButton
            className={classes.signOutButton}
            color="inherit"
            onClick={onSignOut}
          >
            <InputIcon />
          </IconButton>
          Register
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
