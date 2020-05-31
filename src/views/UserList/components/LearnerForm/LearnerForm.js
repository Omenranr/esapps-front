import React from 'react'
import 'date-fns'
// import { Link as RouterLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
    Button,
    TextField,
    // Link,
    // FormHelperText,
    // Checkbox,
    Typography,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
} from '@material-ui/core'
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers'

import DateFnsUtils from '@date-io/date-fns'
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
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))
// firstName: {type: String, required: true},
// lastName: {type: String, required: true},
// gender: { type: String, required: true},
// birthday: {type: Date,required: true},
// mentalAge: {type: Number,required: true},
// parentEmail: {type: String, required: true},
// createdAt: {type: Date, default: Date.now},
// idTutor: {type: mongoose.Schema.Types.ObjectId, ref: 'campanions', required: true},
// organizations: [{type:mongoose.Schema.Types.ObjectId, ref: 'organizations', required: true}]
const LearnerForm = props => {
    {/* classes, handleSignup, handleChange, hasError, formState */ }
    const { handleAddSubmit, handleChange, handleDateChange, handleSelectChange, hasError, tutors, formState } = props
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
                <FormControl className={classes.formControl}>
                    <InputLabel id="gender">Genre</InputLabel>
                    <Select
                        id="demo-simple-select"
                        value={formState.values.gender || ""}
                        fullWidth
                        onChange={handleSelectChange}
                        type="select"
                        helperText={
                            hasError('gender') ? formState.errors.gender[0] : null
                        }
                        error={hasError('gender')}
                        variant="outlined"
                    >
                        <MenuItem value={"male"}>Mâle</MenuItem>
                        <MenuItem value={"female"}>Femelle</MenuItem>
                    </Select>
                </FormControl>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={formState.values.selectedDate}
                        onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                </MuiPickersUtilsProvider>
                <FormControl className={classes.formControl}>
                    <InputLabel id="tutor">Tuteur</InputLabel>
                    <Select
                        label="Tuteur"
                        id="tutor"
                        value={formState.values.tutor || ""}
                        fullWidth
                        onChange={handleSelectChange}
                        type="select"
                        helperText={
                            hasError('tutor') ? formState.errors.tutor[0] : null
                        }
                        error={hasError('tutor')}
                        variant="outlined"
                    >
                        {
                            formState.tutors.map(tutor => {
                                return (
                                    <MenuItem value = {tutor.id} > {tutor.name}</MenuItem>
                                )
                            })
                        }
                    </Select>
                </FormControl>
            <TextField
                className={classes.textField}
                error={hasError('mentalAge')}
                fullWidth
                helperText={
                    hasError('mentalAge') ? formState.errors.mentalAge[0] : null
                }
                label="Age mental"
                name="mentalAge"
                onChange={handleChange}
                type="number"
                value={formState.values.mentalAge || ''}
                variant="outlined"
            />
            <TextField
                className={classes.textField}
                error={hasError('parentEmail')}
                fullWidth
                helperText={
                    hasError('parentEmail') ? formState.errors.parentEmail[0] : null
                }
                label="Email du parent"
                name="parentEmail"
                onChange={handleChange}
                type="text"
                value={formState.values.parentEmail || ''}
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
                Ajouter
        </Button>
            </form>
        </div >
    )
}

LearnerForm.propTypes = {
    handleChange: PropTypes.func,
    handleAddSubmit: PropTypes.func,
    handleDateChange: PropTypes.func,
    handleSelectChange: PropTypes.func,
    hasError: PropTypes.func,
    formState: PropTypes.object,
    classes: PropTypes.object,
    tutors: PropTypes.array,
}

export default LearnerForm;