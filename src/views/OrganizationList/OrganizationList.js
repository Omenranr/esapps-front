import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import PropTypes from 'prop-types'
import { OrgTable, OrgToolbar, OrgDetails } from './components'
// import validate from 'validate.js'
// import uuid from 'uuid/v1'
import { connect } from "react-redux"
import { history } from '../../history'
import { loadOrgs } from "../../actions/orgActions"


const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}))

// const schema = {
//   firstName: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 32
//     }
//   },
//   lastName: {
//     presence: { allowEmpty: false, message: 'is required' },
//     length: {
//       maximum: 32
//     }
//   },
//   email: {
//     presence: { allowEmpty: false, message: 'is required' },
//     email: true,
//     length: {
//       maximum: 64
//     }
//   },
//   phone: {
//     presence: {allowEmpty: false, message: 'is required'},
//     length: {
//       maximum: 13
//     }
//   },
//   address: {
//     presence: {allowEmpty: false, message: 'is required'},
//     length: {
//       maximum: 64
//     }
//   }
// }

const OrganizationList = props => {
  const classes = useStyles();
  const { user, loadOrgs, organizations } = props
  // const [users] = useState(mockData);
  const [orgState, setOrgState] = useState({
    organizations: [],
    detailOrganization: {},
    detailsMode: false,
  })

  useEffect(() => {
    if (user !== null && user.type !== 'admin') history.push('/dashboard')
  }, [user])

  useEffect(() => {
    if (organizations !== undefined) {
      setOrgState(prevState => ({
        ...prevState,
        organizations: organizations
      }))
    }
  }, [organizations])

  useEffect(() => {
    loadOrgs()
  }, [])

  const seeMore = (event) => {
    const orgId = event.currentTarget.name
    const [selectedOrg] = orgState.organizations.filter(org => { return org._id === orgId })
    console.log(selectedOrg)
    setOrgState(prevState => ({
      ...prevState,
      detailsMode: true,
      detailOrganization: selectedOrg,
    }))
  }

  const handleBack = () => {
    setOrgState(prevState => ({
      ...prevState,
      detailsMode: false,
      detailOrganization: {}
    }))
  }

  return (
    <div className={classes.root}>
      {
        orgState.detailsMode ?
          ""
          :
          <OrgToolbar />
      }
      {!orgState.detailsMode ? 
        <div className={classes.content}>
          {orgState.organizations !== undefined ?
            <OrgTable orgs={orgState.organizations} seeMore={seeMore} />
            : ''
          }
        </div>
        :
        <OrgDetails handleBack={handleBack} org={orgState.detailOrganization} />
      }
    </div>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  organizations: state.org.organizations,
  loadOrgs: PropTypes.func.isRequired,
})

export default connect(mapStateToProps, { loadOrgs })(OrganizationList)
