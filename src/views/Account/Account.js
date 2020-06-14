import React, {useState, useEffect} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { connect } from "react-redux"
import { AccountProfile, AccountDetails } from './components'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { history } from "../../history"
import { modifyUser } from "../../actions/authActions"

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4)
  }
}))

const schema = {
  firstName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  lastName: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 32
    }
  },
  email: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
}


const Account = (props) => {
  const classes = useStyles()
  const {user, modifyUser} = props
  const [userState, setUserState] = useState({
    user: null,
  })
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {}
  })

  useEffect(() => {
    const errors = validate(formState.values, schema)
    console.log(errors)
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false

  useEffect(() => {
    if(user !== null) {
      console.log(user)
      setUserState(prev => ({
        ...prev,
        user: user
      }))
      setFormState(prev => ({
        ...prev,
        values: {
          ...prev.values,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phone: user.phone,
        }
      }))
    }
  }, [user])

  const handleChange = event => {
    event.persist()
    setFormState(prev => ({
      ...prev,
      values: {
        ...prev.values,
        [event.target.name]: event.target.value
      }
    }))
  }

  const onSubmitClick = () => {
    modifyUser(formState.values)
    history.push('/account')
    
  }

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          lg={4}
          md={6}
          xl={4}
          xs={12}
        >
          {userState.user !== null ? <AccountProfile user={user}/> : ""}
        </Grid>
        <Grid
          item
          lg={8}
          md={6}
          xl={8}
          xs={12}
        >
          {userState.user !== null ? 
          <AccountDetails 
            user={user} 
            formState={formState} 
            handleChange={handleChange} 
            hasError={hasError}
            onSubmitClick={onSubmitClick}
          /> 
          : 
          ""}
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user,
  modifyUser: PropTypes.func
})

export default connect(mapStateToProps, { modifyUser })(Account)
