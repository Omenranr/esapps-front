import React from 'react'
// import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    TextField,
    Typography,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    FormHelperText,
    Checkbox
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
        },
    },
    formControl: {
        margin: theme.spacing(3),
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

const ProductForm = props => {
    const { handleRequestSubmit, handleChange, hasError, formState } = props
    const classes = useStyles()

    return (
        <div>
            <form
                className={classes.form}
                onSubmit={handleRequestSubmit}
            >
                <Typography
                    className={classes.title}
                    variant="h2"
                >
                    Demander l'application
                </Typography>
                <Typography
                    color="textSecondary"
                    gutterBottom
                >
                    Veuillez remplir les champs suivants
                </Typography>
                    <FormLabel component="legend">Ajouer maximum 3 enfants avec une description complete</FormLabel>
                    <TextField
                        className={classes.textField}
                        error={hasError('enfant1')}
                        fullWidth
                        helperText={
                            hasError('enfant1') ? formState.errors.enfant1[0] : null
                        }
                        label="Enfant1"
                        name="enfant1"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.enfant1 || ''}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        error={hasError('enfant2')}
                        fullWidth
                        helperText={
                            hasError('enfant2') ? formState.errors.enfant2[0] : null
                        }
                        label="Enfant2"
                        name="enfant2"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.enfant2 || ''}
                        variant="outlined"
                    />
                    <TextField
                        className={classes.textField}
                        error={hasError('enfant3')}
                        fullWidth
                        helperText={
                            hasError('enfant3') ? formState.errors.enfant3[0] : null
                        }
                        label="Enfant 3"
                        name="enfant3"
                        onChange={handleChange}
                        type="text"
                        value={formState.values.enfant3 || ''}
                        variant="outlined"
                    />
                    <FormHelperText>Enfants</FormHelperText>
                <Button
                    className={classes.signUpButton}
                    color="primary"
                    disabled={!formState.isValid}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                >
                    Demander
                </Button>
            </form>
        </div>
    )
}

ProductForm.propTypes = {
    handleChange: PropTypes.func,
    handleAddSubmit: PropTypes.func,
    hasError: PropTypes.func,
    formState: PropTypes.object,
    classes: PropTypes.object,
    learners: PropTypes.array
}

export default ProductForm