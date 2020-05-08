import React from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    TextField,
    // Link,
    // FormHelperText,
    // Checkbox,
    Typography
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100%'
    },
    grid: {
        height: '100%'
    },
    quoteContainer: {
        [theme.breakpoints.down('md')]: {
            display: 'none'
        }
    },
    quote: {
        backgroundColor: theme.palette.neutral,
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url(/images/auth.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
    },
    quoteInner: {
        textAlign: 'center',
        flexBasis: '600px'
    },
    quoteText: {
        color: theme.palette.white,
        fontWeight: 300
    },
    name: {
        marginTop: theme.spacing(3),
        color: theme.palette.white
    },
    bio: {
        color: theme.palette.white
    },
    contentContainer: {},
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column'
    },
    contentHeader: {
        display: 'flex',
        alignItems: 'center',
        paddingTop: theme.spacing(5),
        paddingBototm: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2)
    },
    logoImage: {
        marginLeft: theme.spacing(4)
    },
    addOrgButton: {
        position: 'absolute',
        right: '10px',
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            justifyContent: 'center'
        }
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2)
        }
    },
    title: {
        marginTop: theme.spacing(3)
    },
    textField: {
        marginTop: theme.spacing(2)
    },
    policy: {
        marginTop: theme.spacing(1),
        display: 'flex',
        alignItems: 'center'
    },
    policyCheckbox: {
        marginLeft: '-14px'
    },
    signUpButton: {
        margin: theme.spacing(2, 0)
    }
}))

const TutorForm = props => {
    {/* classes, handleSignup, handleChange, hasError, formState */ }
    const { handleAddSubmit, handleChange, hasError, formState } = props
    const classes = useStyles()
    return (
        <div>
            <form
                className={classes.form}
                onSubmit={handleAddSubmit}
            >
                <Typography
                    className={classes.title}
                    variant="h2"
                >
                    Ajouter un tuteur
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom
                >
                    Veuillez indiquer les informations
                </Typography>
                <TextField
                    className={classes.textField}
                    error={hasError('firstName')}
                    fullWidth
                    helperText={
                        hasError('firstName') ? formState.errors.firstName[0] : null
                    }
                    label="Prénom"
                    name="firstName"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.firstName || ''}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={hasError('lastName')}
                    fullWidth
                    helperText={
                        hasError('lastName') ? formState.errors.lastName[0] : null
                    }
                    label="Nom"
                    name="lastName"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.lastName || ''}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={hasError('email')}
                    fullWidth
                    helperText={
                        hasError('email') ? formState.errors.email[0] : null
                    }
                    label="Adresse mail"
                    name="email"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.email || ''}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={hasError('phone')}
                    fullWidth
                    helperText={
                        hasError('phone') ? formState.errors.phone[0] : null
                    }
                    label="Numéro de téléphone"
                    name="phone"
                    onChange={handleChange}
                    type="number"
                    value={formState.values.phone || ''}
                    variant="outlined"
                />
                <TextField
                    className={classes.textField}
                    error={hasError('address')}
                    fullWidth
                    helperText={
                        hasError('address') ? formState.errors.address[0] : null
                    }
                    label="Adresse"
                    name="address"
                    onChange={handleChange}
                    type="text"
                    value={formState.values.address || ''}
                    variant="outlined"
                />
                <Button
                    className={classes.signUpButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    S'enregistrer
        </Button>
            </form>
        </div>
    )
}

TutorForm.propTypes = {
    handleChange: PropTypes.func,
    handleAddSubmit: PropTypes.func,
    hasError: PropTypes.func,
    formState: PropTypes.object,
    classes: PropTypes.object
}

export default TutorForm;