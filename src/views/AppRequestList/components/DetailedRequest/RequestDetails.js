import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import { AppCard, DetailedRequest } from './components'
import { IconButton } from "@material-ui/core"
import ArrowBackIcon from '@material-ui/icons/ArrowBack'
const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const RequestDetails = (props) => {
    const classes = useStyles()
    const { handleBack, request, ...rest } = props
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
                    <AppCard request={request}/>
                </Grid>
                <Grid
                    item
                    lg={8}
                    md={6}
                    xl={8}
                    xs={12}
                >
                    <DetailedRequest request={request}/>
                </Grid>
            </Grid>
        </div>
    )
}

RequestDetails.propTypes = {
    handleBack: PropTypes.func,
    request: PropTypes.object
}

export default RequestDetails
