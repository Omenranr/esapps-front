import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import validate from 'validate.js'
import PropTypes from 'prop-types'
import uuid from 'uuid/v1'
import { connect } from "react-redux"
import { UsersToolbar, UsersTable, LearnerForm } from './components';
import { addLearner } from "../../actions/learnerActions";
import { loadUser } from "../../actions/authActions"
import {history} from '../../history'
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
  parentEmail: {
    presence: { allowEmpty: false, message: 'is required' },
    email: true,
    length: {
      maximum: 64
    }
  },
  gender: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  tutor: {
    presence: {allowEmpty: false, message: 'is required'}
  },
  selectedDate: {
    presence: { allowEmpty: false, message: 'is required' },
  },
  mentalAge: {
    presence: { allowEmpty: false, message: 'is required' },
  }
}

const UserList = props => {

  const classes = useStyles();
  const { user, addLearner, loadUser } = props
  // const [users] = useState(mockData);
  const [learnerState, setLearnerState] = useState({
    addMode: false,
    isValid: false,
    loaded: false,
    values: {
      selectedDate: new Date(),
    },
    touched: {},
    errors: {},
    learners: [],
    tutors: [],
  })

  useEffect(() => {
    loadUser()
    if(props.user) {
      setLearnerState((prev) => ({
        ...prev,
        tutors: props.user.organizations[0].tutors
        .map(tutor => { return { id: tutor._id, name: tutor.firstName + ' ' + tutor.lastName } })
      }))
    }
  }, [])

  useEffect(() => {
    const errors = validate(learnerState.values, schema);
    console.log("form errors", errors)
    if (props.user && !learnerState.loaded) {
      console.log("user loaded", props.user.organizations[0])
      setLearnerState((learnerState) => ({
        ...learnerState,
        loaded: true,
        learners: props.user.organizations[0].learners.map(learner => showData(learner)),
        tutors: props.user.organizations[0].tutors
          .map(tutor => { return { id: tutor._id, name: tutor.firstName + ' ' + tutor.lastName } })
      }))
    }
    setLearnerState((learnerState) => ({
      ...learnerState,
      errors: errors || {},
      isValid: errors ? false : true,
    }))
    console.log(learnerState.values)
  }, [learnerState.values, learnerState.learners, props.user, learnerState.loaded])

  const handleChange = event => {
    event.persist()
    setLearnerState(learnerState => ({
      ...learnerState,
      values: {
        ...learnerState.values,
        [event.target.name]:
          event.target.type === 'checkbox'
            ? event.target.checked
            : event.target.value
      },
      touched: {
        ...learnerState.touched,
        [event.target.name]: true
      }
    }))
  }

  const handleSelectChange = event => {
    event.persist()
    let value = event.target.value
    let name = ""
    console.log(learnerState.isValid)
    if(value === 'male' || value === 'female') {
      name = "gender"
    } else {
      name = "tutor"
    }
    setLearnerState(learnerState => ({
      ...learnerState,
      values: {
        ...learnerState.values,
        [name]: value
      },
      touched: {
        ...learnerState.touched,
        [name]: true
      }
    }))
  }

  const handleDateChange = (date) => {
    setLearnerState(learnerState => ({
      ...learnerState,
      values: {
        ...learnerState.values,
        selectedDate: date
      },
      touched: {
        ...learnerState.touched,
        selectedDate: true
      }
    }))
  }
  const hasError = field =>
    learnerState.touched[field] && learnerState.errors[field] ? true : false;
  const showData = (values) => {
    return {
      id: uuid(),
      name: values.firstName + " " + values.lastName,
      gender: values.gender,
      birthday: values.selectedDate,
      mentalAge: values.mentalAge,
      parentEmail: values.parentEmail,
      idTutor: values.tutor,
      organizations: values.organizations,
      avatarUrl: '/images/avatars/avatar_3.png',
      createdAt: Date.now()
    }
  }

  const handleAddSubmit = event => {
    event.preventDefault()
    console.log("learnerStatzdzdzdzde", learnerState)
    addLearner(learnerState.values, user.organizations[0]._id)
    setLearnerState((learnerState) => ({
      ...learnerState,
      values: {},
      touched: {},
      learners: [...learnerState.learners, showData(learnerState.values)]
    }))
    window.location.reload()
  }

  const onClickAdd = () => {
    setLearnerState((learnerState) => ({
      ...learnerState,
      addMode: !learnerState.addMode
    }))
  }

  return (
    <div className={classes.root}>
      <UsersToolbar onClickAdd={onClickAdd} addMode={learnerState.addMode} />
      <div className={classes.content}>
        {learnerState.addMode ?
          <LearnerForm
            handleChange={handleChange}
            handleDateChange={handleDateChange}
            handleSelectChange={handleSelectChange}
            hasError={hasError}
            formState={learnerState}
            handleAddSubmit={handleAddSubmit}
          /> :
          <UsersTable users={learnerState.learners} tutors={learnerState.tutors} addMode={learnerState.addMode} />}
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  addLeaner: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: state.auth.user,
})

export default connect(mapStateToProps, {addLearner, loadUser})(UserList);
