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
    marginRight: '50px',
    width: 150,
    height: 32,
    lineHeight: '32px',
    textAlign: 'center',
  },
  appBar: {
    backgroundColor: '#F6F6F7',
    margin: '16px 100px 16px 100px',
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
    height: '600px',
  },
  thumbnail: {
    width: '100px',
    height: 'auto',
  }

});



class App extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    carts: [
      {"id" : 1 , "size" : "S", "quanity" : 1},
      {"id" : 2 , "size" : "L", "quanity" : 3},
    ],
    selected: "S",
    hover: false,
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
  };

  handleToggleHover = () => {
    this.setState({hover: !this.state.hover})
  };

  render() {
    const { classes } = this.props;
    const { open, anchorEl, selected, hover} = this.state;
    const  carts  = this.state.carts;

    return (
      <div className={classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div className={classes.appBar}>
              <div className={classes.myCart} onMouseOver={this.handleClick}>My Cart (4)</div>
                <Popper open={open} anchorEl={anchorEl} transition placement='bottom-end' className={classes.popper}>
                  {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                      <Paper>
                        {carts.map( item => (
                          <Grid container spacing={0} key={item.id}>
                            <Grid item xs={4} md={4}>
                              <div className={classes.cartContainer}>
                                <img className={classes.thumbnail} src='classic-tee.jpg' alt={data.name}/>
                              </div>
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
          <Grid container spacing={0}>
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
                <p></p>

                <b variant="h6" gutterBottom style={{'color': 'grey'}}>
                  SIZE<span style={{'color': '#C90000'}}>*</span> <b style={{'color': '#222222'}}>{selected}</b>
                </b>
                <p></p>
                <div style={{"display": "flex"}}>
                  {data.sizes.map( size => (
                  <div size="small" color="inherit" key={size} className={size===selected?classes.button2:classes.button1}>
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
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
