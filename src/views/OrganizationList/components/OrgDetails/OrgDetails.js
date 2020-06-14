import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { OrgCard, DetailedOrg } from './components'
import { IconButton } from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const OrgDetails = (props) => {
    const classes = useStyles()
    const { handleBack, org, ...rest } = props
    return (
        <div className={classes.root}>
            <IconButton onClick={handleBack}>
                <ArrowBackIcon />
            </IconButton>
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
                    <OrgCard org={org}/>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <DetailedOrg org={org}/>
                </Grid>
            </Grid>
        </div>
    )
}

OrgDetails.propTypes = {
    handleBack: PropTypes.func,
    org: PropTypes.object
}

export default OrgDetails
