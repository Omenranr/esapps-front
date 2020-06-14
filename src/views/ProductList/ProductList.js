import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Grid, Typography, Divider } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { connect } from "react-redux"
import { loadApps, sendRequest } from "../../actions/appActions"
import { ProductsToolbar, ProductCard, ProductForm } from './components'
import mockData from './data'
import PropTypes from 'prop-types'
import validate from 'validate.js'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2),
  },
  toolBar: {
    marginBottom: theme.spacing(3)
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  noApp: {
    marginBottom: '1em',
    color: 'gray',
    marginLeft: '25%'
  },
  section1: {
    marginBottom: '1em'
  }
}));

const schema = {
}


const ProductList = props => {
  const classes = useStyles();
  const [products] = useState(mockData)
  const { loadApps, sendRequest} = props
  const [appState, setAppState] = useState({
    apps: [],
    orgApps: [],
    demandMode: false,
    detailMode: false,
    appSelected: {}
  })

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    learners: []
  })

  const handleChange = event => {
    event.persist();

    setFormState(formState => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true
      }
    }))
    console.log(formState.touched)
    console.log(formState)
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false;


  const handleRequestSubmit = (event) => {
    event.preventDefault()
    console.log("formState", formState)
    console.log("appState", appState)
    sendRequest(formState.values, props.user, appState.appSelected)
    setFormState((formState) => ({
      ...formState,
      values: {},
      touched: {},
      errors: {},
    }))
    setAppState((appState) => ({
      ...appState,
      demandMode: false,
      appSelected: {}
    }))
  }

  useEffect(() => {

    const errors = validate(formState.values, schema)
    setFormState((formState) => ({
      ...formState,
      errors: errors || {},
      isValid: errors ? false : true,
    }))
  }, [formState.values])

  useEffect(() => {
    loadApps()
  }, [])

  useEffect(() => {
    if (props.user != null) {
      console.log("props orgApps", props.user)
      setAppState((appState) => ({
        ...appState,
        apps: props.apps.apps.filter(app => {
          return !props.user.organizations[0].apps.find(f => {
            return app._id === f._id
          })
        }),
        orgApps: props.user.organizations[0].apps,
        learners: props.user.organizations[0].learners,
      }))
    }
  }, [props.apps, props.user])

  const onDemandClick = (event) => {
    event.persist()
    console.log("ondemandeclicked")
    const id = event.target.parentElement.name
    const appSelected = appState.apps.filter(app => { return app._id === id })
    setAppState((appState) => ({
      ...appState,
      demandMode: true,
      appSelected: appSelected[0],
    }))
  }

  const onDetailClick = (event) => {
    event.persist()
    console.log('ondetailclicked')
    const id = event.target.parentElement.name
    const appSelected = appState.apps.filter(app => {return app._id === id})
    setAppState((appState) => ({
      ...appState,
      detailMode: true,
      appSelected: appSelected[0]
    }))
  }

  return (
    <div className={classes.root}>
      {appState.demandMode ? "" : <div className={classes.toolBar}>
        <ProductsToolbar />
      </div>}

      {appState.demandMode ?
        <ProductForm
          handleChange={handleChange}
          hasError={hasError}
          formState={formState}
          handleRequestSubmit={handleRequestSubmit}
          learners={appState.learners}
        />
        :
        <div>
          <div className={classes.section1}>
            <Typography variant="h3">Vos applications</Typography>
            {appState.orgApps.length !== 0 ?
              <div className={classes.content}>
                <Grid
                  container
                  spacing={3}
                >
                  {appState.orgApps.map(app => (
                    <Grid
                      item
                      key={app._id}
                      lg={4}
                      md={6}
                      xs={12}
                    >
                      <ProductCard product={app} type="orgApps" />
                    </Grid>
                  ))}
                </Grid>
              </div>
              :
              <Typography variant="h3" className={classes.noApp}>Vous n'avez aucune application</Typography>
            }
          </div>

          <Divider variant="middle" />

          <div className={classes.content}>
            <Typography variant="h3" className={classes.toolBar}>Applications non acquises</Typography>
            <Grid
              container
              spacing={3}
            >
              {appState.apps.map(app => (
                <Grid
                  item
                  key={app._id}
                  lg={4}
                  md={6}
                  xs={12}
                >
                  <ProductCard product={app} type="esapp" onDemandClick={onDemandClick} />
                </Grid>
              ))}
            </Grid>
          </div>
          <div className={classes.pagination}>
            <Typography variant="caption">1-6 of 20</Typography>
            <IconButton>
              <ChevronLeftIcon />
            </IconButton>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </div>
        </div>}
    </div>
  );
};

const mapStateToProps = state => ({
  loadApps: PropTypes.func.isRequired,
  sendRequest: PropTypes.func.isRequired,
  apps: state.app,
  user: state.auth.user
})

export default connect(mapStateToProps, { loadApps, sendRequest })(ProductList);