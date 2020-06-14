import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import validate from 'validate.js'
import { AppRequestTable, AppRequestToolbar, DetailedRequest } from './components'
// import validate from 'validate.js'
// import uuid from 'uuid/v1'
import { connect } from "react-redux"
import { history } from '../../history'
import { loadReqs, sendDecision } from "../../actions/reqActions"


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

const schema = {
  motif: {
    presence: { allowEmpty: false, message: 'is required' },
    length: {
      maximum: 150
    }
  }
}

const AppRequestList = props => {
  const classes = useStyles();
  const {user, loadReqs, sendDecision, requests} = props
  // const [users] = useState(mockData);
  const [filterValue, setFilterValue] = React.useState('pending')
  const [reqState, setReqState] = useState({
    requests: [],
    acceptedReqs: [],
    pendingReqs: [],
    toShowReqs: [],
    rejectedReqs: [],
    detailsMode: false,
    detailRequest: {}
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [open, setOpen] = useState(false)
  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
    decision: "",
    selectedReq: {}
  })

  const hasError = field =>
  formState.touched[field] && formState.errors[field] ? true : false

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
    console.log(formState.values)
  }

  useEffect(() => {
    const errors = validate(formState.values, schema)
    setFormState(formState => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {}
    }))
  }, [formState.values])

  const handleBack = () => {
    setReqState(prevState => ({
      ...prevState,
      detailsMode: false,
      detailRequest: {}
    }))
  }

  const removeFromList = (decision, reqId) => {

    setReqState(prevState => {
      let [selectedReq] = prevState.requests.filter(req => {return req._id === reqId})
      let toChangeName = decision === 'accept' ? 'acceptedReqs' : 'rejectedReqs'
      return {
        ...prevState,
        pendingReqs: prevState.pendingReqs.filter(req => {return req._id !== reqId}),
        [toChangeName]: prevState[toChangeName].concat([selectedReq]),
        toShowReqs: prevState.pendingReqs.filter(req => {return req._id !== reqId}),
      }
    })
  }

  const handleClick = (event) => {
    console.log("handle click")
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
    let [decision, reqId] = event.currentTarget.name.split(',')
    let [selectedReq] = reqState.requests.filter(req => {return req._id === reqId})
    setReqState(prevState => ({
      ...prevState,
      decision: decision,
      selectedReq: selectedReq
    }))
  }

  const handleValidate = (event) => {
    console.log("validated reject")
    sendDecision(reqState.decision, reqState.selectedReq, formState.values.motif)
    closePopup(event)
    // il faut supprimer la requête
    removeFromList(reqState.decision, reqState.selectedReq._id)
  }

  const closePopup = (event) => {
    setAnchorEl(event.currentTarget)
    setOpen((prev) => !prev)
  }

  const decisionClick = (event) => {
    let [decision, reqId] = event.currentTarget.name.split(',')
    let [selectedReq] = reqState.toShowReqs.filter(req => {return req._id === reqId})
    console.log(decision)
    console.log(selectedReq)
    sendDecision(decision, selectedReq)
    // il faut supprimer la requête
    removeFromList(decision, reqId)
  }

  const handleChangeRadio = (event) => {
    setFilterValue(event.target.value)
    let status = event.target.value
    let toChangeName = ""
    switch(status) {
      case 'pending':
        toChangeName = 'pendingReqs'
        break
      case 'accepted':
        toChangeName = 'acceptedReqs'
        break
      case 'rejected':
        toChangeName = 'rejectedReqs'
        break
    }
    console.log("status", status, toChangeName)
    console.log(reqState)
    console.log(toChangeName, reqState[toChangeName])
    setReqState(prevState => ({
      ...prevState,
      toShowReqs: prevState[toChangeName]
    }))
  }

  const seeMore = (event) => {
    const reqId = event.currentTarget.name
    const [selectedReq] = reqState.toShowReqs.filter(req => {return req._id === reqId})
    console.log(selectedReq)
    console.log(reqState.toShowReqs)
    setReqState(prevState => ({
      ...prevState,
      detailsMode: true,
      detailRequest: selectedReq,
    }))
  }

  useEffect(() => {
    if(user !== null && user.type !== 'admin') history.push('/dashboard')
  }, [user])

  useEffect(() => {
    if(requests !== undefined) {
      setReqState(prevState => ({
        ...prevState,
        requests: requests.filter(req => {return req.status === 'pending'}),
        toShowReqs: requests.filter(req => {return req.status === 'pending'}),
        pendingReqs: requests.filter(req => {return req.status === 'pending'}),
        acceptedReqs: requests.filter(req => {return req.status === 'accepted'}),
        rejectedReqs: requests.filter(req => {return req.status === 'rejected'}),
      }))
    }
  }, [requests])

  useEffect(() => {
    loadReqs()
  }, [])

  return (
    <div className={classes.root}>
      {reqState.detailsMode ? " " :<AppRequestToolbar filterValue={filterValue} handleChangeRadio={handleChangeRadio}/>}
      <div className={classes.content}>
        {!reqState.detailsMode ?
          <div>
          {reqState.requests !== undefined ?
            <AppRequestTable 
              reqs={reqState.toShowReqs} 
              seeMore={seeMore} 
              decisionClick={decisionClick}
              anchorEl={anchorEl}
              open={open}
              handleClick={handleClick}
              closePopup={closePopup}
              hasError={hasError}
              handleChange={handleChange}
              formState={formState}
              handleValidate={handleValidate}
              filterValue={filterValue}
            />
            : ''
          }
          </div>
          :
            <DetailedRequest 
              className={classes.root} 
              request={reqState.detailRequest}
              handleBack={handleBack}
              request={reqState.detailRequest}
            />
        }
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  requests: state.req.requests,
  loadReqs: PropTypes.func.isRequired,
  sendDecision: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, { loadReqs, sendDecision })(AppRequestList)
