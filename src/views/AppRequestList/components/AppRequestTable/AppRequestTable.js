import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { makeStyles } from '@material-ui/styles'
import {
  Card,
  CardActions,
  CardContent,
  Avatar,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  TextField,
  Button,
  ButtonGroup,
  IconButton,
  Popper,
  Fade,
  CardActionArea,
  Paper
} from '@material-ui/core'

import CheckIcon from '@material-ui/icons/Check'
import CloseIcon from '@material-ui/icons/Close'
import AddIcon from '@material-ui/icons/Add'

import { getInitials } from 'helpers'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  buttonAccept: {
    backgroundColor: '#52bf52',
    marginLeft: '3%',
  },
  buttonRefuse: {
    backgroundColor: '#ff6666',
  },
  buttonSeeMore: {
    marginLeft: '3%'
  },
  seeMore: {
    color: 'black',
    fontSize: '0.5em'
  },
  inner: {
    minWidth: 1050
  },
  nameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    marginRight: theme.spacing(2)
  },
  actions: {
    justifyContent: 'flex-end'
  }
}));

const AppRequestTable = props => {
  const { className,
    reqs,
    seeMore,
    decisionClick,
    anchorEl,
    open,
    handleClick,
    closePopup,
    hasError,
    handleChange,
    formState,
    handleValidate,
    filterValue,
    ...rest } = props;

  const classes = useStyles()

  const [selectedUsers, setSelectedUsers] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)


  const handleSelectAll = event => {
    const { reqs } = props

    let selectedUsers

    if (event.target.checked) {
      selectedUsers = reqs.map(req => req._id)
    } else {
      selectedUsers = []
    }

    setSelectedUsers(selectedUsers);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelectedUsers = [];

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      );
    }

    setSelectedUsers(newSelectedUsers);
  };

  const handlePageChange = (event, page) => {
    setPage(page);
  };

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Popper open={open} anchorEl={anchorEl} placement="bottom" transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Card>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Motif
                  </Typography>
                  <TextField
                    type="text"
                    name="motif"
                    onChange={handleChange}
                    error={hasError('motif')}
                    helperText={
                      hasError('motif') ? formState.errors.motif[0] : null
                    }
                    value={formState.values.motif || ''}
                  />
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary" onClick={handleValidate} disabled={!formState.isValid}>
                  Valider
                </Button>
                <Button size="small" color="primary" onClick={closePopup}>
                  Annuler
                </Button>
              </CardActions>
            </Card>
          </Fade>
        )}
      </Popper>
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === reqs.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < reqs.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell align="center">Nom</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Application</TableCell>
                  <TableCell align="center">Nombre d'apprenants</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reqs.slice(0, rowsPerPage).map(req => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={req._id}
                    selected={selectedUsers.indexOf(req._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(req._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, req._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={req.avatarUrl}
                        >
                          {getInitials(req.organization ? req.organization.name : "")}
                        </Avatar>
                        <Typography variant="body1">{req.organization ? req.organization.name : ""}</Typography>
                      </div>
                    </TableCell>
                    <TableCell align="center">{req.organization ? req.organization.email : req.parentEmail}</TableCell>
                    <TableCell align="center">
                      {req.application.name}
                    </TableCell>
                    <TableCell align="center">{req.learners ? req.learners.length: ""}</TableCell>
                    <TableCell align="center">
                      {filterValue === "pending" ?
                        <ButtonGroup>
                          <Button
                            variant="contained"
                            className={classes.buttonRefuse}
                            startIcon={<CloseIcon />}
                            size='medium'
                            onClick={handleClick}
                            name={"reject," + req._id}
                          >
                            Refuser
                          </Button>
                          <Button
                            variant="contained"
                            className={classes.buttonAccept}
                            startIcon={<CheckIcon />}
                            size='medium'
                            onClick={decisionClick}
                            name={"accept," + req._id}
                          >
                            Accepter
                          </Button>
                        </ButtonGroup>
                        : ""
                      }
                      {req.organization ?                    
                      <Button
                        variant="outlined"
                        className={classes.buttonSeeMore}
                        color="primary"
                        startIcon={<AddIcon />}
                        size='small'
                        name={req._id}
                        onClick={seeMore}
                      >
                        Voir plus
                      </Button>
                      : ""}
                      {req.status === 'rejected' ?" Motif : " + req.motif : ""}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </PerfectScrollbar>
      </CardContent>
      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={reqs.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  )
}

AppRequestTable.propTypes = {
  className: PropTypes.string,
  reqs: PropTypes.array.isRequired,
  seeMore: PropTypes.func.isRequired,
  decisionClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
  handleValidate: PropTypes.func.isRequired,
  filterValue: PropTypes.string
}

export default AppRequestTable
