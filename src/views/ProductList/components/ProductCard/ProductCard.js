import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles } from '@material-ui/styles'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import { green } from '@material-ui/core/colors'
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Divider,
  Button
} from '@material-ui/core'
import AccessTimeIcon from '@material-ui/icons/AccessTime'
import StarIcon from '@material-ui/icons/Star'

const useStyles = makeStyles(theme => ({
  root: {},
  imageContainer: {
    height: 64,
    width: 64,
    margin: '0 auto',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
  statsItem: {
    display: 'flex',
    alignItems: 'center'
  },
  statsIcon: {
    color: theme.palette.icon,
    marginRight: theme.spacing(1)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green,
  },
})

const ProductCard = props => {
  const { className, product, type, onDemandClick, ...rest } = props;
  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <div className={classes.imageContainer}>
          <img
            alt="Product"
            className={classes.image}
            src={"/images/products/product_2.png"}
          />
        </div>
        <Typography
          align="center"
          gutterBottom
          variant="h4"
        >
          {product.name}
        </Typography>
        <Typography
          align="center"
          variant="body1"
        >
          {product.description}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions>
        <Grid
          container
          justify="space-between"
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {product.difficulty}
            </Typography>
          </Grid>
          {
            type === "orgApps" ?
              <ThemeProvider theme={theme}>
                <Button variant="contained" target="_blank" href={product.download} size="small" color="primary">
                  Voir plus
                </Button>
              </ThemeProvider>
              :
              <Button 
                variant="contained" 
                size="small" 
                onClick={onDemandClick} 
                color="primary"
                name={product._id}
              >
                Demander
              </Button>
          }
          <Grid
            className={classes.statsItem}
            item
          >
            <StarIcon className={classes.statsIcon} />
            <Typography
              display="inline"
              variant="body2"
            >
              {product.type}
            </Typography>
          </Grid>
        </Grid>
      </CardActions>
    </Card>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  type: PropTypes.string,
  onDemandClick: PropTypes.func
};

export default ProductCard
