import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import moment from 'moment'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone'
import FaceIcon from '@material-ui/icons/Face'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles(() => ({
  root: {}
}))

const DetailedRequest = props => {
  const { className, request, ...rest } = props

  const classes = useStyles()

  const [values, setValues] = useState({
    firstName: 'Shen',
    lastName: 'Zhi',
    email: 'shen.zhi@devias.io',
    phone: '',
    state: 'Alabama',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const states = [
    {
      value: 'alabama',
      label: 'Alabama'
    },
    {
      value: 'new-york',
      label: 'New York'
    },
    {
      value: 'san-francisco',
      label: 'San Francisco'
    }
  ];

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Informations sur l'organisation:"
          title="Organisation"
        />
        <Divider />
        <CardContent>
          <List className={classes.root}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={"Organisation: " + request.organization.name + ". Email: " + request.organization.email}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                    </Typography>
                    <PhoneIphoneIcon /> {request.organization.apps.length} <FaceIcon /> {request.organization.learners.length} <PersonIcon /> {request.organization.tutors.length}
                  </React.Fragment>
                }
              />
            </ListItem>
          </List>
        </CardContent>
        <Divider />
        <CardHeader
          subheader="Informations sur les apprenants inclus:"
          title="Enfants inclus"
        />
        <CardContent>
          <List className={classes.root}>
              {request.learners.map(learner => (
                  <div key={learner._id}>
                      <ListItem alignItems="flex-start">
                      <ListItemText
                      primary={"Enfant: "+learner.firstName + 
                      " " + 
                      learner.lastName +
                      ", Genre: " +
                      learner.gender +
                      ", Age Mental: " +
                      learner.mentalAge
                      }
                      secondary={
                          <React.Fragment>
                          <Typography
                              component="span"
                              variant="body2"
                              className={classes.inline}
                              color="textPrimary"
                          >
                              Parent Email {learner.parentEmail},
                          </Typography>
                          {" Date de naissance: "+moment(learner.birthday).format('DD/MM/YYYY')}
                          </React.Fragment>
                      }
                      />
                      </ListItem>
                      <Divider variant="inset" component="li" />
                  </div>
              ))
              }
          </List>
        </CardContent>
      </form>
    </Card>
  );
};

DetailedRequest.propTypes = {
  className: PropTypes.string,
  request: PropTypes.object
}

export default DetailedRequest
