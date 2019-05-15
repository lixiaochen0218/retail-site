import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';

import Snackbar from '@material-ui/core/Snackbar';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';


const data = {
  "name":"Classic Tee",
  "price":75.00,
  "desp":"Dolor sit amet, consectetur adipiscing elit. Haec et tu ita posuisti, et verba vestra sunt. Quod autem ratione actum est, id officium appellamus dolor sit amet, consectetur adipiscing elit. Haed et tu ita posuisti, et verba vestra sunt. Quodautem ratione actum est, id officium appellamus",
  "image":"https://drive.google.com/file/d/0B8KYnbdnrRGXSXVoMzdqRWhCTXc/view?usp=sharing",
  "sizes": [
      "S","M","L"
  ]
};

const styles = theme => ({
  root: {
    position: 'relative',
    flexGrow: 1,
  },
  divider: {
    marginBottom: "8.4px"
  },
  popper: {
    width: '350px',
    height: 'auto',
  },
  cartContainer: {
    padding: '20px',
  },
  myCart: {
    cursor:'pointer',
    marginLeft: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
    marginRight: '50px',
    width: 130,
    height: 32,
    lineHeight: '32px',
    textAlign: 'center',
  },
  myCartPhone: {
    cursor:'pointer',
    marginLeft: 'auto',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
    marginRight: '0px',
    width: 130,
    height: 32,
    lineHeight: '32px',
    textAlign: 'center',
  },
  appBar: {
    color: "grey",
    backgroundColor: '#F6F6F7',
    [theme.breakpoints.down('sm')]: {
      margin: '16px 0px 16px 0px'
    },
    [theme.breakpoints.up('md')]: {
      margin: '16px 100px 16px 100px',
    },
  },
  appBarPhone: {
    backgroundColor: '#F6F6F7',
    margin: '16px 10px 16px 100px',
  },
  two: {
    padding:30,
  },
  button1: {
    border: '1px solid #CCCCCC',
    marginRight: '8px',
    width: "40px",
    height: "40px",
    lineHeight: "40px",
    textAlign: "center",
    cursor:'pointer',
  },
  button2: {
    border: '2px solid #222222',
    marginRight: '8px',
    width: "40px",
    height: "38px",
    lineHeight: "40px",
    textAlign: "center",
    cursor:'pointer',
  },

  addbtn1: {
    // padding: '14px 0px',
    borderRadius: '0px',
    border: '2px solid #222222',
    transition: 'background-color 0.2s',
    width: "150px",
    height: "35px",
    fontWeight: 600,
    lineHeight: "35px",
    textAlign: "center",
    cursor:'pointer',
  },

  addbtn2: {
    // padding: '14px 0px',
    color: 'white',
    backgroundColor: '#222222',
    transition: 'background-color 0.2s',
    borderRadius: '0px',
    border: '2px solid #222222',
    width: "150px",
    height: "35px",
    fontWeight: 600,
    lineHeight: "35px",
    textAlign: "center",
    cursor:'pointer',
  },

  image: {
    width: 'auto',
    height: '550px',
  },
  thumbnail: {
    width: '100px',
    height: 'auto',
  },
  grid: {
    margin : '16px',
  }

});



class App extends React.Component {
  state = {
    open: true,
    openSnack:false,
    anchorEl: null,
    carts: [],
    selected: "",
    hover: false,
    total:0,
  };

  handleClick = event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: true,
    }));
  };

  handleClickAway = () => {
    this.setState({
      open: false,
    });
    this.setState({
      openSnack: false,
    });
  };

  //snack bar error message
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  handleToggleHover = () => {
    this.setState({hover: !this.state.hover})
  };

  handleClickAddToCart = () => {
    if(!this.state.selected){
      this.setState({openSnack: true});
      return;
    }
    let carts = this.state.carts;
    if(carts.length === 0){
      carts.push({"id" : 1 , "size" : this.state.selected, "quanity" : 1});
    }else{
      let update = false;
      carts.forEach(c => {
        if(c.size === this.state.selected){
          c.quanity++;
          update = true;
        }
      })
      if(!update){
        carts.push({"id" : 1 , "size" : this.state.selected, "quanity" : 1});
      }
      // console.log(carts);
    }
    let total = 0;
    carts.forEach(c => {
      total += c.quanity;
    })

    this.setState({carts: carts});
    this.setState({total: total});
    // if(carts.length > 1){
    //   this.setState({open: true});
    // }
  }

  handleChangeSize = (size) => {
    this.setState({selected: size});
  }

  render() {
    const { classes } = this.props;
    const { open, anchorEl, selected, hover, total} = this.state;
    const  carts  = this.state.carts;

    return (
      <div className={classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div className={classes.appBar}>
              <div className={classes.myCart} onMouseOver={this.handleClick}>My Cart ({total})</div>
              <div className={classes.myCartPhone} onMouseOver={this.handleClick}>
                <ShoppingCartIcon></ShoppingCartIcon><span>({total})</span> 
              </div>
                <Popper open={open} anchorEl={anchorEl} transition placement='bottom-end' className={classes.popper}>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        {carts.map( item => (
                          <Grid container spacing={0} key={item.size}>
                            <Grid item xs={4} md={4}>
                              <div className={classes.cartContainer}>
                                <img className={classes.thumbnail} src='classic-tee.jpg' alt={data.name}/>
                              </div>
                              <p></p>
                            </Grid>
                            <Grid item xs={4} md={4}>
                              <div className={classes.cartContainer}>
                                <Typography variant="body2" gutterBottom>
                                  {data.name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                {item.quanity}x <b>${data.price}.00</b>
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                  Size: {item.size}
                                </Typography>
                              </div>
                            </Grid>
                            <Grid item xs={4} md={4}>
                            </Grid>
                          </Grid>
                        ))}
                      </Paper>
                    </Fade>
                  )}
                </Popper>
            
          </div>
        </ClickAwayListener>
        <div className={classes.root}>
          <Grid className={classes.grid} container spacing={0}>
            <Grid item xs={false} md={3}>
            </Grid>
            <Grid item xs={12} md={3}>
                <img className={classes.image} src='classic-tee.jpg' alt={data.name}/>
            </Grid>
            <Grid item xs={false} md={1}></Grid>
            <Grid item xs={12} md={3}>
                <Typography variant="h5" gutterBottom>
                  {data.name}
                </Typography>
                <Divider className={classes.divider} />
                <Typography variant="h6" gutterBottom>
                  ${data.price}
                </Typography>
                <Divider className={classes.divider}/>
                <Typography variant="body2" gutterBottom>
                  ${data.desp}
                </Typography>
                <p></p>
                

                <b variant="h6" style={{'color': 'grey'}}>
                  SIZE<span style={{'color': '#C90000'}}>*</span> <b style={{'color': '#222222'}}>{selected}</b>
                </b>
                <p></p>
                <div style={{"display": "flex"}}>
                  {data.sizes.map( size => (
                  <div size="small" color="inherit" key={size} className={size===selected?classes.button2:classes.button1} onClick={() => this.handleChangeSize(size)}>
                    {size}
                  </div>
                  ))}
                </div>
                <p></p>
                <div>
                  <div size="small" color="inherit" className={hover?classes.addbtn2:classes.addbtn1} onMouseEnter={this.handleToggleHover} onMouseLeave={this.handleToggleHover} onClick={this.handleClickAddToCart}>
                    ADD TO CART
                  </div>
                </div>
            </Grid>
            <Grid item xs={false} md={2}></Grid>
          </Grid>
        </div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          open={this.state.openSnack}
          autoHideDuration={3000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">Please select SIZE</span>}
        />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
