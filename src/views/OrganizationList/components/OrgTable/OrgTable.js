import React, { useState } from 'react'
import clsx from 'clsx'
import PropTypes from 'prop-types'
import moment from 'moment'
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
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add'
import { getInitials } from 'helpers'

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
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
}))

const OrgTable = props => {
  const { className, orgs, seeMore, ...rest } = props

  const classes = useStyles();

  const [selectedUsers, setSelectedUsers] = useState([])
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)

  const handleSelectAll = event => {
    const { orgs } = props

    let selectedUsers

    if (event.target.checked) {
      selectedUsers = orgs.map(org => org._id)
    } else {
      selectedUsers = []
    }

    setSelectedUsers(selectedUsers)
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedUsers.indexOf(id)
    let newSelectedUsers = []

    if (selectedIndex === -1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers, id)
    } else if (selectedIndex === 0) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(1))
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelectedUsers = newSelectedUsers.concat(selectedUsers.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelectedUsers = newSelectedUsers.concat(
        selectedUsers.slice(0, selectedIndex),
        selectedUsers.slice(selectedIndex + 1)
      )
    }

    setSelectedUsers(newSelectedUsers);
  }

  const handlePageChange = (event, page) => {
    setPage(page);
  }

  const handleRowsPerPageChange = event => {
    setRowsPerPage(event.target.value);
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selectedUsers.length === orgs.length}
                      color="primary"
                      indeterminate={
                        selectedUsers.length > 0 &&
                        selectedUsers.length < orgs.length
                      }
                      onChange={handleSelectAll}
                    />
                  </TableCell>
                  <TableCell>Organisation</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Admin</TableCell>
                  <TableCell>Applications</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orgs.slice(0, rowsPerPage).map(org => (
                  <TableRow
                    className={classes.tableRow}
                    hover
                    key={org._id}
                    selected={selectedUsers.indexOf(org._id) !== -1}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedUsers.indexOf(org._id) !== -1}
                        color="primary"
                        onChange={event => handleSelectOne(event, org._id)}
                        value="true"
                      />
                    </TableCell>
                    <TableCell>
                      <div className={classes.nameContainer}>
                        <Avatar
                          className={classes.avatar}
                          src={org.avatarUrl}
                        >
                          {getInitials(org.name)}
                        </Avatar>
                        <Typography variant="body1">{org.name}</Typography>
                      </div>
                    </TableCell>
                    <TableCell>{org.email}</TableCell>
                    <TableCell>
                      {org.admins[0].firstName + " " + org.admins[0].lastName}
                    </TableCell>
                    <TableCell>{org.apps.length}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        className={classes.buttonSeeMore}
                        color="primary"
                        startIcon={<AddIcon />}
                        size='small'
                        name={org._id}
                        onClick={seeMore}
                      >
                        Voir plus
                      </Button>
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
          count={orgs.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleRowsPerPageChange}
          page={page}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>
    </Card>
  );
};

OrgTable.propTypes = {
  className: PropTypes.string,
  orgs: PropTypes.array.isRequired,
  seeMore: PropTypes.func.isRequired
};

export default OrgTable
