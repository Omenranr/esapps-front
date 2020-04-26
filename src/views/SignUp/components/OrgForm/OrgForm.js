import React, { useState, useEffect } from 'react';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import validate from 'validate.js';
import { makeStyles } from '@material-ui/styles';
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography
} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const OrgForm = props => {
    const {classes, handleSignUp, handleChange, hasError, formState} = props
    return (
        <div>
        <form
          className={classes.form}
          onSubmit={handleSignUp}
        >
          <Typography
            className={classes.title}
            variant="h2"
          >
            Créer votre compte d'organisation
                  </Typography>
          <Typography
            color="textSecondary"
            gutterBottom
          >
            Utiliser l'email pour s'enregistrer
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
            error={hasError('orgName')}
            fullWidth
            helperText={
              hasError('orgName') ? formState.errors.orgName[0] : null
            }
            label="Nom d'organisation"
            name="orgName"
            onChange={handleChange}
            type="text"
            value={formState.values.orgName || ''}
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
            error={hasError('password')}
            fullWidth
            helperText={
              hasError('password') ? formState.errors.password[0] : null
            }
            label="Mot de passe"
            name="password"
            onChange={handleChange}
            type="password"
            value={formState.values.password || ''}
            variant="outlined"
          />
          <div className={classes.policy}>
            <Checkbox
              checked={formState.values.policy || false}
              className={classes.policyCheckbox}
              color="primary"
              name="policy"
              onChange={handleChange}
            />
            <Typography
              className={classes.policyText}
              color="textSecondary"
              variant="body1"
            >
              J'ai bien lu les{' '}
              <Link
                color="primary"
                component={RouterLink}
                to="#"
                underline="always"
                variant="h6"
              >
                Termes et conditions
                      </Link>
            </Typography>
          </div>
          {hasError('policy') && (
            <FormHelperText error>
              {formState.errors.policy[0]}
            </FormHelperText>
          )}
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
          <Typography
            color="textSecondary"
            variant="body1"
          >
            Déjà enregistrer?{' '}
            <Link
              component={RouterLink}
              to="/sign-in"
              variant="h6"
            >
              Se connecter
                    </Link>
          </Typography>
        </form>
      </div>
    )
}
OrgForm.propTypes = {
    handleChange: PropTypes.func,
    handleSignUp: PropTypes.func,
    hasError: PropTypes.func,
    formState: PropTypes.object,
    classes: PropTypes.object
}

export default OrgForm;