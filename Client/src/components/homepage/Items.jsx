import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
// import '../stylesheet/Counter.css'
import {useParams,useHistory} from 'react-router-dom';

import {Grid,Paper} from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Fab from '@mui/material/Fab';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartState } from "../context/Context";
import AccountCircle from '@mui/icons-material/AccountCircle';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import img from '../images/a1.jpg'
import img2 from '../images/a2.jpg'
import Dialog from '@material-ui/core/Dialog';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import InputUnstyled from '@mui/core/InputUnstyled';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';
import BallotIcon from '@mui/icons-material/Ballot';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { alpha } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';
import Select from '@mui/material/Select';
import HomeIcon from '@mui/icons-material/Home';
import StoreIcon from '@mui/icons-material/Store';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
//import { Scrollbars } from "react-custom-scrollbars-2";
import { Scrollbars } from "react-custom-scrollbars-2";

// Components
import Slider from './Slider';

import './Slider/slider.css';
import { BoxContainer } from '../accountBox/common';


const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#264653',
    },
  },
  typography: {
    h5: {
      fontWeight: 450 // or 'bold'
    },
    h4:{
      fontSize:'22px',
      fontWeight:420
    }
  }
});

function Items({ _id, description, name, imageUrl1, price, qty,Id }) {
  console.log(qty);
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();
  const [prod,setprod]=useState();
 
useEffect(() => {
  setTotal(
    cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0)
  );
  cart.map(function(product) {
    if(product._id===_id)
    setprod(product);
 
  })

}, [cart]);
let history=useHistory();
const handleDialogOpen = () => {
  history.push(`/product/registered/${name}/${_id}`);
};

const removeprod =async (productinfo) =>{
  dispatch({
    type: "REMOVE_FROM_CART",
    payload: productinfo,
  })
  await fetch(`http://localhost:8000/user/${Id}/remove-from-cart/${productinfo._id}`, {
    method: 'PUT',
   
});
}

const incprod =async (productinfo) =>{
  dispatch({
    type: "INCREMENT",
    payload: prod
  })
  await fetch(`http://localhost:8000/user/${Id}/cart/increase/${productinfo._id}`, {
    method: 'PUT'
   
});
}

const dcrprod =async (productinfo) =>{
  dispatch({
    type: "DECREMENT",
    payload: prod
  })

  await fetch(`http://localhost:8000/user/${Id}/cart/decrease/${productinfo._id}`, {
    method: 'PUT'
   
});
}
    return (
      
      <>
      <div className="items-info">
        <div className="product-img">
        <a onClick={() => handleDialogOpen()} style={{cursor:'pointer'}}>
          <img src={imageUrl1} alt="image" />
          </a>
        </div>

        <div id="newtb">
        <a onClick={() => handleDialogOpen()} style={{cursor:'pointer'}}>
        <Typography variant="h6" color="text.secondary" id="namenew" > <strong> {name} </strong></Typography>
        </a>
        </div>
        <div className="price">
        <div>
        <ButtonGroup color="info" variant="contained" aria-label="split button" >
        {qty===1?
          <Button
        color="primary"
        size="small"
        
        aria-label="select merge strategy"
        aria-haspopup="menu"
        disabled
      >
      <RemoveIcon />
      </Button>
          :
        <Button
        color="primary"
        size="small"
        
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onClick={() =>
         dcrprod(prod)
        }
      >
      <RemoveIcon />
      </Button>
        }
       
      
        <Button variant="outlined">{qty}</Button>
        
        <Button
        color="primary"
          size="small"
          
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={() =>
            incprod(prod)
          } 
        >
          <AddIcon />
        </Button>
      </ButtonGroup>
        </div>
        </div>
        
        <div className="price" >
          <h4>₹{qty*price}.00</h4>
        </div>
        <div className="price" >
        <Fab color="error" aria-label="delete" onClick={() =>
          removeprod(prod)
        } > <DeleteIcon /></Fab>
        
        </div>
      </div>

      <hr />
    </>
      
    );
  }

export default Items