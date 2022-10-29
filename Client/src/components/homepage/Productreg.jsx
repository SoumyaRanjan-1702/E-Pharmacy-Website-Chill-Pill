import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../stylesheet/Counter.css'
//carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import {useParams} from 'react-router-dom';
import {Grid,Paper} from '@material-ui/core';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
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
import ExtensionIcon from '@mui/icons-material/Extension';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Rating from '@mui/material/Rating';
import ButtonGroup from '@mui/material/ButtonGroup';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import RemoveIcon from '@mui/icons-material/Remove';
import { purple } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import RateReviewIcon from '@mui/icons-material/RateReview';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import ShareIcon from '@mui/icons-material/Share';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import DescriptionIcon from '@mui/icons-material/Description';
import { CartState } from "../context/Context";
import axios from 'axios'
// Components
import Slider from './Slider';

import './Slider/slider.css';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { BoxContainer } from '../accountBox/common';
import '../stylesheet/Product.css';
import StarIcon from '@mui/icons-material/Star';
import NotesIcon from '@mui/icons-material/Notes';
const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};
const SliderProps = {
  zoomFactor: 8, // How much the image should zoom on hover in percent
  slideMargin: 10, // Margin on each side of slides
  maxVisibleSlides: 6,
  pageTransition: 500 // Transition when flipping pages
};



const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: '#264653',
    },
    primary: {
      main:'#DE3163'
    },
    info:{
      light: '#757ce8',
      main: purple[500],
      dark: '#ba000d',
      contrastText: '#fff',
     
    }
  },
  typography: {
    h5: {
      fontWeight: 450 // or 'bold'
    }
  }
});


function Productreg({Id}) {
  const {
    state: { cart, products },
    dispatch,
  } = CartState();
  const [customervalue, setcustomerValue] = React.useState(4.5);
  const [value, setValue] = React.useState(customervalue);
  const [hover, setHover] = React.useState(-1);
  const [values, setValues] = React.useState('');
  const [wishlst,setwishlst] = useState([]);
  const [num,setnum] = useState(1);
  const increase = (n) =>{
    n++;
    setnum(n);
  };
  const decrease = (n) =>{
    if(n>1)
    {
      n--;
      setnum(n);
    }
  }
  const [message,setmessage]=useState(false);
  const shoot=()=>{
    setmessage2(false);
    setmessage(true);
}
const [message2,setmessage2]=useState(false);
  const shoot2=()=>{
    setmessage(false);
    setmessage2(true);
}
  const handleChanges = (event) => {
    setValues(event.target.value);
  };
  console.log(Id);
  let product = {
    id: "",
    name:"",
    size: "",
    price:"",
    img_url: "",
    description:""
   
  };
  const params = useParams();
  
  //store data
  const [show,setshow]=useState([]);
  useEffect(() => {
    axios
        .get(`http://localhost:8000/admin/products`)
        .then(res => {
    console.log(res)
    setshow(res.data)
    console.log(res.data);
    
        })
        .catch(err => {
            console.log(err)
        })
        axios
        .get(`http://localhost:8000/user/${Id}/wishlist`)
        .then(res => {
    console.log(res)
    setwishlst(res.data)
    console.log(res.data);
    
        })
        .catch(err => {
            console.log(err)
        })
}, [])

    show.map(products => {
    
          var id=products._id;
          if(id===params.id)
          {
            product._id=products._id;
            product.name=products.name;
            product.img_url=products.imageUrl1;
            product.img_url1=products.imageUrl2;
            product.img_url2=products.imageUrl3;
            product.size=products.size;
            product.price=products.price;
            product.description=products.description;
            product.isAvailable=products.isAvailable;
            console.log(cart);
            console.log(id);
          }
      });

 
const commonStyles = {
  bgcolor: 'background.paper'
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

const addprod =async (productinfo) =>{
  dispatch({
    type: "ADD_TO_CART",
    payload: productinfo,
  })
  await fetch(`http://localhost:8000/user/${Id}/add-to-cart/${productinfo._id}`, {
    method: 'PUT',
   
});
}

const wish = async (product) =>{
  await fetch(`http://localhost:8000/user/${Id}/add-to-wishlist/${product._id}`, {
    method: 'PUT',
});
axios
.get(`http://localhost:8000/user/${Id}/wishlist`)
.then(res => {
console.log(res)
setwishlst(res.data)
console.log(res.data);

})
.catch(err => {
    console.log(err)
})
}
const wishrem = async (product) =>{
  await fetch(`http://localhost:8000/user/${Id}/remove-from-wishlist/${product._id}`, {
    method: 'PUT',
});
axios
.get(`http://localhost:8000/user/${Id}/wishlist`)
.then(res => {
console.log(res)
setwishlst(res.data)
console.log(res.data);

})
.catch(err => {
    console.log(err)
})
}
    return (
      <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1}} >
      <AppBar position="static" color="secondary">
        <Toolbar>
        
        <IconButton
          size="large"
          color="inherit"
        >
          
          <ExtensionIcon />
          
        </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }} >
          Product
          </Typography>
          <Box>
          <Link to="/home" className="link"> <HomeIcon fontSize="large" /> </Link>
          <Link to={"/all_products_user/"+Id} className="link"> <StoreIcon fontSize="large"/> </Link>
        
          <Link to={"/cart/"+Id} className="link"> 
          <IconButton
          size="large"
          aria-label="show 0 items"
          color="inherit"
        >
          <Badge badgeContent={cart.length} color="error">
          <ShoppingCartIcon />
          
          </Badge>
        </IconButton>
        
         </Link>
          </Box>
          </Toolbar>
          </AppBar>
          {message===true?
            <Alert variant="filled" severity="error" id="acenter">
            <AlertTitle><Link to="/account" className="link">Please Login </Link>(To add products)</AlertTitle>
            
          </Alert>
                      :null}    
                      
          <Grid sx={{ flexGrow: 1 }} container spacing={2} id="itemss">
          <Grid item xs={12}>
            <Grid container justifyContent="center" spacing={10} id="griditem">
          
              <Grid item id="cardgrid">
              <Carousel infiniteLoop useKeyboardArrows autoPlay className="main-slide" >
              <div>
                  <img src={product.img_url}  />
                 
              </div>
              <div>
                  <img src={product.img_url1} />
                 
              </div>
              <div>
                  <img src={product.img_url2} />
                  
              </div>
          </Carousel>
              </Grid>
              <Grid item id="cardgrid2">
          <Typography variant="h4" color="text.secondary" id="prdname" > <strong> {product.name} </strong></Typography>
        
          
         
          <Typography variant="body2" color="text.secondary" mt={2} id="sizes">
          Pack size : {product.size}
          { wishlst.some((p) => p._id === product._id) ? (
            
            <Fab onClick={()=>wishrem(product)} size="small" sx={{ml:20,mb:1}}  color="primary" aria-label="add"><FavoriteBorderIcon /></Fab>
              )
            :(
           
              <Fab onClick={()=>wish(product)} size="small"  sx={{ml:20,mb:1}}  aria-label="like">
              <FavoriteBorderIcon color="primary"/>
            </Fab>
          )}
        </Typography>
        <Typography variant="h6" color="text.secondary" mt={1} id="titlecart2">
         MRP: ₹{product.price}.00
        </Typography>
        <Typography variant="body2" color="text.secondary" >
        {"(Incl of all taxes)"}
      </Typography>
      <Typography  color="text.secondary" mt={1} id="rate">
          Rating :  
          <Rating name="read-only" value={customervalue} precision={0.5} readOnly />
        </Typography>
      
        <div id="cartbutton2">
        {cart.some((p) => p._id === product._id) ? (
          <Button variant="contained" color="error"onClick={() =>
            removeprod(product)
          } >Remove From Cart  </Button>) :(
        <Button variant="contained" color="success" onClick={() =>
          addprod(product)
        } disabled={!product.isAvailable}> {!product.isAvailable ? "Out of Stock" : "Add To Cart"}</Button>
        )}
        </div>
          </Grid>
          </Grid>
          </Grid>
          </Grid>
          <div id="reveiw">
          <Typography variant="h4" color="text.secondary" mt={3} id="revname" > 
          <strong>   <NotesIcon /> Description </strong></Typography>
          <Typography variant="body1" color="text.secondary" mr={3} id="desp">
        <strong>{product.description}</strong>
        
      </Typography>
      </div>
          {message2===true?
            <Alert variant="filled" severity="warning" id="acenter">
            <AlertTitle><Link to="/account" className="link">Please Login </Link>(To Share Review)</AlertTitle>
            
          </Alert>
                      :null} 
         <div id="reveiw">
         <Typography variant="h4" color="text.secondary" mt={3} id="revname" > <RateReviewIcon /> <strong>Rating & Reviews </strong></Typography>
          <Typography variant="body2" color="text.secondary" >
        <strong>Share your thoughts with other customers</strong>
        
      </Typography>
      <Typography variant="body2" color="text.secondary" id="rate">
      <strong>Rate :</strong>
      
   
         <Rating
          name="hover-feedback"
          
          value={value}
          precision={0.5}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        </Typography>
        {value !== null && (
          <Typography variant="body2" sx={{ ml: 9 }}>{labels[hover !== -1 ? hover : value]}</Typography>)}
          
      <Box
      component="form"
      
      sx={{
        '& .MuiTextField-root': { m: 1},
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      id="filled-multiline-static"
        label="Review"
        placeholder="Write your review here..."
        multiline
        rows={4}
        variant="filled"
        value={values}
        onChange={handleChanges}
      />
      <br />
      <Fab onClick={shoot2} color="info" variant="extended">
      <ShareIcon sx={{ mr: 1 }} />
      Share
    </Fab>
      </Box>
         </div>
      </Box>
      </ThemeProvider>
    );
  }

export default Productreg