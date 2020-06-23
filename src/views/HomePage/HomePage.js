import React, { useState, useEffect } from 'react'
import { Link as RouterLink, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { makeStyles } from '@material-ui/styles'
import { history } from "../../history";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  CardActions,
  Divider,
} from '@material-ui/core'
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import StarIcon from '@material-ui/icons/Star'
import { Facebook as FacebookIcon, Google as GoogleIcon } from 'icons'

//REDUX IMPORTS

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: '100%'
  },
  nowMore: {
    marginTop: '30px',
    marginLeft: "15px"
  },
  errorMessage: {
    marginTop: theme.spacing(3)
  },
  loadingBar: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(5),
    },
    marginTop: theme.spacing(1.5)
  },
  grid: {
    height: '100%'
  },
  quoteContainer: {
    [theme.breakpoints.down('md')]: {
      display: 'none'
    }
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: 'url(/images/auth.jpg)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
  },
  quoteInner: {
    textAlign: 'center',
    flexBasis: '600px'
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white
  },
  bio: {
    color: theme.palette.white
  },
  contentContainer: {},
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  },
  contentHeader: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  },
  logoImage: {
    marginLeft: theme.spacing(4)
  },
  contentBody: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    }
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down('sm')]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2)
    }
  },
  title: {
    marginTop: theme.spacing(3)
  },
  socialButtons: {
    marginTop: theme.spacing(3)
  },
  socialIcon: {
    marginRight: theme.spacing(1)
  },
  sugestion: {
    marginTop: theme.spacing(2)
  },
  errorText: {
    color: 'red',
    marginTop: theme.spacing(2),
  },
  textField: {
    marginTop: theme.spacing(2)
  },
  signInButton: {
    margin: theme.spacing(2, 0)
  },
    imageContainer: {
      height: 64,
      width: 64,
      margin: '0 auto',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '5px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    image: {
      width: '100%'
    },
    statsItem: {
      display: 'flex',
      alignItems: 'center'
    },
    statsIcon: {
      color: theme.palette.icon,
      marginRight: theme.spacing(1)
    }
  
}))

const HomePage = props => {

  const classes = useStyles();

  const goRegister = (event) => {
      console.log("clicked")
      history.push('/sign-up')
  }
  useEffect(() => {
    if (localStorage.getItem('token') || props.isAuthenticated === true) {
      history.push('/dashboard')
    }
  }, []);

  return (
    <div className={classes.root}>
      <Grid
        className={classes.grid}
        container
      >
        <Grid
          className={classes.quoteContainer}
          item
          lg={4}
        >
          <div className={classes.quote}>
            <div className={classes.quoteInner}>
              <Typography
                className={classes.quoteText}
                variant="h1"
              >
                Retrouvez une panolie d'applications.
              </Typography>
              <div className={classes.person}>
                <Typography
                  className={classes.name}
                  variant="body1"
                >
                  Esapps 2020
                </Typography>
                <Typography
                  className={classes.bio}
                  variant="body2"
                >
                  Page d'accueil
                </Typography>
              </div>
            </div>
          </div>
        </Grid>
        <Grid
          className={classes.content}
          item
          lg={7}
          xs={15}
        >
          <div className={classes.content}>
          <div className={classes.contentHeader}>
          <Typography
                  variant="h3"
                >
                  Applications de la plateforme, enregistrez vous pour profiter des applications
            </Typography>
            </div>
            <div className={classes.contentHeader}>
            <Card>
            <CardContent>
                <div className={classes.imageContainer}>
                <img
                    alt="Product"
                    className={classes.image}
                    src={"/images/products/blocks.png"}
                />
                </div>
                <Typography
                align="center"
                gutterBottom
                variant="h4"
                >
                Blocks
                </Typography>
                <Typography
                align="center"
                variant="body1"
                >
                Jeu de construction de formes géométriques. Aide à développer la créativité
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid
                container
                justify="space-between"
                >
                <Grid
                    className={classes.statsItem}
                    item
                >
                    <AccessTimeIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    normale
                    </Typography>
                    </Grid>
                    <Grid
                        className={classes.statsItem}
                        item
                    >
                    <StarIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    visual
                    </Typography>
                </Grid>
                </Grid>
            </CardActions>
            </Card>
            <Card>
            <CardContent>
                <div className={classes.imageContainer}>
                <img
                    alt="Product"
                    className={classes.image}
                    src={"/images/products/dessinEcriture.png"}
                />
                </div>
                <Typography
                align="center"
                gutterBottom
                variant="h4"
                >
                Dessin and Ecriture
                </Typography>
                <Typography
                align="center"
                variant="body1"
                >
                Jeu pour travailler le dessin l'écriture. Développement de la motricité et de la compréhension...etc
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid
                container
                justify="space-between"
                >
                <Grid
                    className={classes.statsItem}
                    item
                >
                    <AccessTimeIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    difficile
                    </Typography>
                    </Grid>
                    <Grid
                        className={classes.statsItem}
                        item
                    >
                    <StarIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    writing
                    </Typography>
                </Grid>
                </Grid>
            </CardActions>
            </Card>
            <Card>
            <CardContent>
                <div className={classes.imageContainer}>
                <img
                    alt="Product"
                    className={classes.image}
                    src={"/images/products/listenandanswer.png"}
                />
                </div>
                <Typography
                align="center"
                gutterBottom
                variant="h4"
                >
                Listen and Answer
                </Typography>
                <Typography
                align="center"
                variant="body1"
                >
                Jeu de construction de formes géométriques. Aide à développer la créativité
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid
                container
                justify="space-between"
                >
                <Grid
                    className={classes.statsItem}
                    item
                >
                    <AccessTimeIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    facile
                    </Typography>
                    </Grid>
                    <Grid
                        className={classes.statsItem}
                        item
                    >
                    <StarIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    reflexion
                    </Typography>
                </Grid>
                </Grid>
            </CardActions>
            </Card>
            <Card>
            <CardContent>
                <div className={classes.imageContainer}>
                <img
                    alt="Product"
                    className={classes.image}
                    src={"/images/products/puzzle.png"}
                />
                </div>
                <Typography
                align="center"
                gutterBottom
                variant="h4"
                >
                Puzzle
                </Typography>
                <Typography
                align="center"
                variant="body1"
                >
                Jeu de puzzle, dessins animés ou paysages connus. Developpement de la refléxion
                </Typography>
            </CardContent>
            <Divider />
            <CardActions>
                <Grid
                container
                justify="space-between"
                >
                <Grid
                    className={classes.statsItem}
                    item
                >
                    <AccessTimeIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    difficile
                    </Typography>
                    </Grid>
                    <Grid
                        className={classes.statsItem}
                        item
                    >
                    <StarIcon className={classes.statsIcon} />
                    <Typography
                    display="inline"
                    variant="body2"
                    >
                    reflexion
                    </Typography>
                </Grid>
                </Grid>
            </CardActions>
            </Card>
            </div>
            <Button variant="contained" className={classes.nowMore} color="primary" onClick={goRegister}>En savoir plus</Button>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

HomePage.propTypes = {
  history: PropTypes.object
};


export default HomePage