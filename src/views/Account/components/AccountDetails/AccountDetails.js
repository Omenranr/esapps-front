import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const AccountDetails = props => {
  const { className, formState, handleChange, hasError, onSubmitClick, ...rest } = props

  const classes = useStyles()

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader="Vous pouvez changer les informations"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Prénom"
                margin="dense"
                name="firstName"
                error={hasError('firstName')}
                helperText={
                  hasError('firstName') ? formState.errors.firstName[0] : null
                }
                onChange={handleChange}
                required
                value={formState.values.firstName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Nom"
                margin="dense"
                name="lastName"
                error={hasError('lastName')}
                helperText={
                  hasError('lastName') ? formState.errors.lastName[0] : null
                }
                onChange={handleChange}
                required
                value={formState.values.lastName || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Adresse mail"
                margin="dense"
                name="email"
                error={hasError('email')}
                helperText={
                  hasError('email') ? formState.errors.email[0] : null
                }
                onChange={handleChange}
                required
                value={formState.values.email || ''}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Téléphone"
                margin="dense"
                name="phone"
                error={hasError('phone')}
                helperText={
                  hasError('phone') ? formState.errors.phone[0] : null
                }
                onChange={handleChange}
                type="number"
                required
                value={formState.values.phone || ''}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <CardActions >
          <Button
            color="primary"
            variant="contained"
            disabled={!formState.isValid}
            onClick={onSubmitClick}
          >
            Modifier le Profile
          </Button>
        </CardActions>
      </form>
    </Card>
  )
}

AccountDetails.propTypes = {
  className: PropTypes.string,
  formState: PropTypes.object,
  user: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  onSubmitClick: PropTypes.func.isRequired,
}

export default AccountDetails
