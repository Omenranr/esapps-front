import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import moment from 'moment'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@material-ui/core'

import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import FaceIcon from '@material-ui/icons/Face'
import PersonIcon from '@material-ui/icons/Person'
import { getInitials } from 'helpers'

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
}))

const OrgCard = props => {
  const { className, org, ...rest } = props;
  const classes = useStyles();
  console.log(org)
  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/products/product_3.png'
  };

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
              Infos sur l'admin:
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Nom Complet: {org.admins[0].firstName+" "+org.admins[0].lastName} 
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {"Email: " + org.admins[0].email}
            </Typography>
          </div>
            <Avatar
                className={classes.avatar}
                src={org.avatarUrl}
            >
                {getInitials(org.name)}
            </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Organisation: {org.name}</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardActions>
        <PhoneIphoneIcon/> {org.apps.length} <FaceIcon/> {org.learners.length} <PersonIcon/> {org.tutors.length} 
      </CardActions>
    </Card>
  );
};

OrgCard.propTypes = {
  className: PropTypes.string,
  org: PropTypes.object
};

export default OrgCard
