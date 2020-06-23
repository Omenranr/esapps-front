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
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
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

const ProductDetails = props => {
  const { className, app, handleBack, ...rest } = props
  console.log(app)
  const classes = useStyles()
  const user = {
    name: 'Shen Zhi',
    city: 'Los Angeles',
    country: 'USA',
    timezone: 'GTM-7',
    avatar: '/images/products/product_3.png'
  }

  return (
    <div>
    <IconButton onClick={handleBack}>
        <ArrowBackIcon />
    </IconButton>
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
              Infos sur l'application:
            </Typography>
            <Typography
              className={classes.locationText}
              color="textSecondary"
              variant="body1"
            >
              Designation: {app.name} 
            </Typography>
            <Typography
              className={classes.dateText}
              color="textSecondary"
              variant="body1"
            >
              {app.description}
            </Typography>
          </div>
            <Avatar
                className={classes.avatar}
                src={'/images/products/'+app.image+'.png'}
            >
            </Avatar>
        </div>
        <div className={classes.progress}>
          <Typography variant="body1">Difficulté: {app.difficulty}, Type: {app.type}</Typography>
        </div>
      </CardContent>
      <Divider />
      <CardContent>
      <List className={classes.root}>
            {app.exercices.map(exo => (
                <div key={exo._id}>
                    <ListItem alignItems="flex-start">
                    <ListItemText
                    primary={exo.name}
                    secondary={
                        <React.Fragment>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Description: {exo.description}
                        </Typography><br/>
                        <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                        >
                            Objectif: {exo.objective}
                        </Typography><br/>
                        {
                            exo.goals.map((goal,id) => (
                                <List className={classes.root}>
                                <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                                key={id}
                                >
                                But: {goal}
                                </Typography>
                                </List>
                            ))
                        }
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
      <CardActions>
        <PhoneIphoneIcon/> {app.exercices.length} Exercices
      </CardActions>
    </Card>
    </div>
  )
}

ProductDetails.propTypes = {
  className: PropTypes.string,
  app: PropTypes.object,
  handleBack: PropTypes.func
}

export default ProductDetails
