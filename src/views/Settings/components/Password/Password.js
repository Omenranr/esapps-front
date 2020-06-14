import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import validate from 'validate.js'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Button,
  TextField
} from '@material-ui/core'
import { modifyPassword } from "../../../../actions/authActions"

const useStyles = makeStyles(() => ({
  root: {}
}))

const schema = {
  password: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
  confirm: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 128
    }
  },
}


const Password = props => {
  const { className, modifyPassword, user, ...rest } = props

  const classes = useStyles();

  const [formState, setFormState] = useState({
    values: {},
    equal: true,
    isValid: false,
    touched: {},
    errors: {}
  })
  
  const passwordChange = (event) => {
    event.preventDefault()
    console.log("clicked password update")
    modifyPassword(formState.values)
  }

  const hasError = field =>
    formState.touched[field] && formState.errors[field] ? true : false

  useEffect(() => {
    const errors = validate(formState.values, schema)
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  useEffect(() => {
    if(user !== null) {
      setFormState(prev => ({
        ...prev,
        values: {
          ...prev.values,
          id: user._id
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

  useEffect(() => {
    let password = formState.values.password
    let confirm = formState.values.confirm
    if(password !== confirm) {
      setFormState(prev=>({
        ...prev,
        isValid: false
      }))
    }
  }, [formState.values])

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        onSubmit={passwordChange}
      >
        <CardHeader
          subheader="Update password"
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            error={hasError('password')}
            helperText={
              hasError('password') ? formState.errors.firstName[0] : null
            }
            label="Mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmer"
            error={hasError('confirm')}
            helperText={
              hasError('confirm') ? formState.errors.firstName[0] : null
            }
            name="confirm"
            onChange={handleChange}
            style={{ marginTop: '1rem' }}
            type="password"
            value={formState.values.confirm || ''}
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions>
          <Button
            color="primary"
            variant="outlined"
            disabled={!formState.isValid}
            onClick={passwordChange}
          >
            Update
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  className: PropTypes.string,
  modifyPassword: PropTypes.func
})

export default connect(mapStateToProps, { modifyPassword })(Password)

