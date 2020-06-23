import React, {useState} from 'react'
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
  AppBar,
  Tabs,
  Tab,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core'
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

function TabPanel(props) {
    const { children, value, index, ...other } = props
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </div>
    )
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
}

function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    }
}

const OrgCard = props => {
  const { className, org, ...rest } = props
  const classes = useStyles();

  const user = {
    avatar: '/images/products/product_3.png'
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Apps" {...a11yProps(0)} />
          <Tab label="Tuteurs" {...a11yProps(1)} />
          <Tab label="Enfants" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <List className={classes.root}>
            {org.apps.map(app => (
                <div key={app._id}>
                    <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Travis Howard" src={"/images/products/"+app.image+".png"} />
                    </ListItemAvatar>
                    <ListItemText
                    primary={"Application: " + app.name + ", " + "Difficulté: " + app.difficulty}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Type {app.type},
                        </Typography>
                        {" "+app.description}
                        </React.Fragment>
                    }
                    />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))
            }
        </List>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <List className={classes.root}>
            {org.tutors.map(tutor => (
                <div key={tutor._id}>
                    <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={"Tuteur: "+tutor.firstName + " " + tutor.lastName}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Email {tutor.email},
                        </Typography>
                        {" Créer le: "+moment(tutor.created_at).format('DD/MM/YYYY')}
                        </React.Fragment>
                    }
                    />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))
            }
        </List>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <List className={classes.root}>
            {org.learners.map(learner => (
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
      </TabPanel>
    </Card>
  )
}

OrgCard.propTypes = {
  className: PropTypes.string,
  org: PropTypes.object
}

export default OrgCard
