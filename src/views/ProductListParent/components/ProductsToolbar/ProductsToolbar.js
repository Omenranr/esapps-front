import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { 
  Button,
  FormControl,
  NativeSelect,
  InputLabel,
  FormHelperText
} from '@material-ui/core'

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

const ProductsToolbar = props => {
  const { className, handleSearchChange, filterState, handleSelectChange, ...rest } = props;

  const classes = useStyles();
  const [state, setState] = React.useState({
    age: '',
    name: 'hai',
  })


  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <div className={classes.row}>
        <span className={classes.spacer} />
      </div>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Chercher une application"
          onChange={handleSearchChange}
          value={filterState.search || ''}
        />
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-native-helper">Objectif</InputLabel>
          <NativeSelect
            value={filterState.objective}
            onChange={handleSelectChange}
            inputProps={{
              name: 'objective',
              id: 'age-native-helper',
            }}
          >
            <option aria-label="None" value="" />
            {
              filterState.objectives.map((obj, id) => (
                <option key={id} value={obj}>{obj}</option>
              ))
            }
          </NativeSelect>
          <FormHelperText>Filtrer selon les objectifs</FormHelperText>
        </FormControl>
      </div>
    </div>
  )
}

ProductsToolbar.propTypes = {
  className: PropTypes.string,
  filterState: PropTypes.object,
  handleSearchChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
}

export default ProductsToolbar
