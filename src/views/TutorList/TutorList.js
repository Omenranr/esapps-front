import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { UsersToolbar, UsersTable, TutorForm } from './components'
import validate from 'validate.js'
import { connect } from "react-redux"
import { addTutor } from "../../actions/tutorActions"
import uuid from 'uuid/v1'

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
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
  phone: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 13
    }
  },
  address: {
    presence: {allowEmpty: false, message: 'is required'},
    length: {
      maximum: 64
    }
  }
}

const TutorList = props => {
  const classes = useStyles();
  const {user, addTutor} = props
  // const [users] = useState(mockData);
  const [tutorState, setTutorState] = useState({
    addMode: false,
    isValid: false,
    loaded: false,
    values: {},
    touched: {},
    errors: {},
    tutors: [],
    search: "",
  })

  useEffect(() => {
    const errors = validate(tutorState.values, schema);
    if(props.user && !tutorState.loaded) {
      console.log("user loaded", props.user.organizations[0])
      setTutorState((tutorState) => ({
        ...tutorState,
        loaded: true,
        tutors: props.user.organizations[0].tutors.map(tutor => showData(tutor))
      }))
    }
    setTutorState((tutorState) => ({
      ...tutorState,
      errors: errors || {},
      isValid: errors ? false : true,
    }))
    console.log(tutorState.values)
  }, [tutorState.values, tutorState.tutors, props.user, tutorState.loaded])

  const handleChange = event => {
    event.persist();

    setTutorState(tutorState => ({
      ...tutorState,
      values: {
        ...tutorState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...tutorState.touched,
        [event.target.name]: true
      }
    }))
    console.log(tutorState.touched)
  }

  const hasError = field =>
    tutorState.touched[field] && tutorState.errors[field] ? true : false;

  const showData = (values) => {
    return {
      id: uuid(),
      name: values.firstName + " " + values.lastName,
      address: {
        country: values.address,
      },
      email: values.email,
      phone: values.phone,
      avatarUrl: '/images/avatars/avatar_3.png',
      createdAt: Date.now()
    }
  }

  const handleAddSubmit = event => {
    event.preventDefault()
    console.log("tutorState", tutorState)
    addTutor(tutorState.values, user.organizations[0]._id)
    setTutorState((tutorState) => ({
      ...tutorState,
      values: {},
      touched: {},
      errors: {},
      tutors: [...tutorState.tutors, showData(tutorState.values)]
    }))
  }

  const onClickAdd = () => {
    setTutorState((tutorState) => ({
      ...tutorState,
      addMode: !tutorState.addMode
    }))
  }

  const handleSearch = () => {

  }

  return (
    <div className={classes.root}>
      <UsersToolbar onClickAdd={onClickAdd} addMode={tutorState.addMode} />
      <div className={classes.content}>
        {tutorState.addMode ?
          <TutorForm
            handleChange={handleChange}
            hasError={hasError}
            formState={tutorState}
            handleAddSubmit={handleAddSubmit}
          /> :
          <UsersTable users={tutorState.tutors} />}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  addTutor: PropTypes.func.isRequired,
  user: state.auth.user,
})

export default connect(mapStateToProps, { addTutor })(TutorList);
