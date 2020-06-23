import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
  Link,
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  details: {
    display: 'flex'
  },
  avatar: {
    marginLeft: 'auto',
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  progress: {
    marginTop: theme.spacing(2)
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
}));

const AppCard = props => {
  const { className, request, ...rest } = props;
  console.log(request)
  const classes = useStyles();

  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/products/product_3.png'
  }
  const preventDefault = (event) => event.preventDefault()

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.details}>
          <div>
            <Typography
              gutterBottom
              variant="h2"
            >
              Application: {request.application.name}
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Type: {request.application.type}
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {"Organisation: " + request.organization.name}
            </Typography>
          </div>
          <Avatar
            className={classes.avatar}
            src={'/images/products/'+request.application.image+'.png'}
          />
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">{request.application.description}</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          className={classes.uploadButton}
          color="primary"
          variant="text"
        >
          <Link href={request.application.download} onClick={preventDefault} color="inherit">
            Download Link
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
};

AppCard.propTypes = {
  className: PropTypes.string,
  request: PropTypes.object
};

export default AppCard
