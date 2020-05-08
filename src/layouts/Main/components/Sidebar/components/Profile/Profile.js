import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const [formState, setFormState] = useState({
    name: '',
    avatar: '/images/avatars/avatar_11.png',
    bio: '',
  });
  useEffect(() => {
    console.log(props.user)
    if (props.user) {
      const { firstName, lastName, type } = props.user
      setFormState(formState => ({
        ...formState,
        name: firstName + ' ' + lastName,
        bio: type
      }))
    }
  }, [props.user]);

  const { className, ...rest } = props;
  const classes = useStyles();
  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        component={RouterLink}
        src={formState.avatar}
        to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {formState.name}
      </Typography>
      <Typography variant="body2">{formState.bio}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object
};

export default Profile;
