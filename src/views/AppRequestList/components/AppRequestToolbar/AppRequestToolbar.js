import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
// import { Button } from '@material-ui/core'
import {
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@material-ui/core";
import { SearchInput } from 'components'

const useStyles = makeStyles(theme => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1)
  },
  spacer: {
    flexGrow: 1
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  searchInput: {
    marginRight: theme.spacing(1)
  }
}));

const AppRequestToolbar = props => {
  const { className, filterValue, handleChangeRadio, ...rest } = props
  const classes = useStyles()

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
        {/* <Button
          color="primary"
          variant="contained"
          onClick={onClickAdd}
        >
          {addMode ? "voir les tuteurs" : "ajouter un tuteur"}
        </Button> */}
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Trouver une demande"
        />
        <FormControl component="fieldset">
          <RadioGroup row aria-label="gender" name="gender1" value={filterValue} onChange={handleChangeRadio}>
            <FormControlLabel value="pending" control={<Radio />} label="En attente" />
            <FormControlLabel value="accepted" control={<Radio />} label="Acceptées" />
            <FormControlLabel value="rejected" control={<Radio />} label="Refusées" />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  )
}

AppRequestToolbar.propTypes = {
  className: PropTypes.string,
  filterValue: PropTypes.string,
  handleChangeRadio: PropTypes.func
}

export default AppRequestToolbar
