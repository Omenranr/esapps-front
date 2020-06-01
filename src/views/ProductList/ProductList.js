import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { IconButton, Grid, Typography, Divider } from '@material-ui/core'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import { connect } from "react-redux"
import { loadApps } from "../../actions/appActions"
import { ProductsToolbar, ProductCard, ProductForm } from './components'
import mockData from './data'
import PropTypes from 'prop-types'
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

const ProductList = props => {
  const classes = useStyles();
  const [products] = useState(mockData)
  const { loadApps } = props
  const [appState, setAppState] = useState({
    apps: [],
    orgApps: [],
    demandMode: false,
  })

  const [formState, setFormState] = useState({
    
  })

  useEffect(() => {
    loadApps()
  }, [])

  useEffect(() => {
    if (props.orgApps != null) {
      console.log("props orgApps", props.orgApps)
      setAppState((appState) => ({
        ...appState,
        apps: props.apps.apps.filter(app => {
          return !props.orgApps.organizations[0].apps.find(f => {
            return app._id === f._id
          })
        }),
        orgApps: props.orgApps.organizations[0].apps
      }))
    }
  }, [props.apps, props.orgApps])

  const onDemandClick = () => {
    setAppState((appState) => ({
      ...appState,
      demandMode: true
    }))
  }

  return (
    <div className={classes.root}>
      {appState.demandMode ? "" : <div className={classes.toolBar}>
        <ProductsToolbar />
      </div>}

      {appState.demandMode ?
        <ProductForm
          formState={formState}
        />
        :
        <div>
          <div className={classes.section1}>
            <Typography variant="h3">Vos applications</Typography>
            {appState.orgApps.length != 0 ?
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
                      <ProductCard product={app} type="orgApps" onDemandClick={onDemandClick} />
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
                  <ProductCard product={app} type="esapp" />
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
  apps: state.app,
  orgApps: state.auth.user
})

export default connect(mapStateToProps, { loadApps })(ProductList);