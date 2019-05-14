import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
// import grey from '@material-ui/core/colors/grey';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
  paper: {
    
  },
  myCart: {
    // position: "absolute",
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
    padding: '14px 0px',
    borderRadius: '0px',
    border: '2px solid #222222',
    marginRight: '8px',
  },

  button2: {
    // padding: '14px 0px',
    borderRadius: '0px',
    border: '2px solid #222222',
  },
  image: {
    width: 'auto',
    height: '600px',
  }

});



class App extends React.Component {
  state = {
    open: false,
    anchorEl: null,
    cart: [
      {"id" : 1 , "size" : "S", "quanity" : 1},
      {"id" : 1 , "size" : "L", "quanity" : 3},
    ]
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

  render() {
    const { classes } = this.props;
    const { open, anchorEl} = this.state;

    return (
      <div className={classes.root}>
        <ClickAwayListener onClickAway={this.handleClickAway}>
          <div className={classes.appBar}>
            
              <div className={classes.myCart} onMouseOver={this.handleClick}>My Cart (4)</div>
              {/* {open ? (
                <Paper className={classes.paper}>
                12334
                </Paper>
              ) : null} */}
              <Popper open={open} anchorEl={anchorEl} transition>
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper>
                      <Typography>The content of the Popper.</Typography>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            
          </div>
        </ClickAwayListener>
        <div className={classes.root}>
          <Grid container spacing={0}>
            <Grid item xs={0} md={3}>
            </Grid>
            <Grid item xs={12} md={3}>
                <img className={classes.image} src='classic-tee.jpg' alt={data.name}/>
            </Grid>
            <Grid item xs={0} md={1}></Grid>
            <Grid item xs={12} md={4}>
                <Typography variant="h5" gutterBottom>
                  {data.name}
                </Typography>
                <Divider/>
                <Typography variant="h6" gutterBottom>
                  ${data.price}
                </Typography>
                <Divider/>
                <Typography variant="body2" gutterBottom>
                  ${data.desp}
                </Typography>

                <Typography variant="h6" gutterBottom>
                  SIZE*
                </Typography>
                {data.sizes.map( size => (
                <Button size="small" color="inherit" className={classes.button1}>
                  {size}
                </Button>
                ))}
                <div>
                  <Button size="small" color="inherit" className={classes.button2}>
                    ADD TO CART
                  </Button>
                </div>
            </Grid>
            <Grid item xs={0} md={1}></Grid>
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
