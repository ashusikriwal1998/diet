import React,{useState} from 'react'
import {useResponseDataMutation,usePlanMutation} from "../Services"
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'universal-cookie';
import {toast } from 'react-toastify';

const Homepage = () => {
  const navigate = useNavigate();
const [loading,setLoading] = useState(true);
const [response, setResponse] = useState([]);

const cookies = new Cookies();


const [responseData] = useResponseDataMutation();
const [user_data] = usePlanMutation();
  
  let [info, setInfo] = useState({
    first_name: null,
    last_name: null,
    age: null,
    height: null,
    weight: null,
    gender: null,
    purpose: null,
    meal_type: null,
    include: null,
    exclude: null,
  });

  

  const plan = "make a weekly desi "+info.meal_type+" diet plan with quantity of nutrition for "+info.purpose+" for "+info.gender+" age of "+info.age+" years and height is "+info.height+" cm and wight is "+info.weight+" kg.must include "+info.include+" and strictly not including "+info.exclude;


  const handleSubmit =(e)=>{

    e.preventDefault();
  
    user_data({
      "firstname": info.first_name,
    "lastname": info.last_name,
    "plan" : plan

    })
    .then((success)=>{
      toast("Data Uploading for "+ success.data.firstname);
    })

    responseData({plan})
      .then((success) => {
          setResponse(success.data.text.split('\n'));
          setLoading(false);
      })
     
        



    };

  let handleChanges = (e, state) => {
    setInfo({...info, [[state]] : e.target.value})
  }
  let logout = () =>{
    localStorage.clear();
    cookies.remove("token");
     setAnchorEl(null);
    navigate("/login");
    
  }


  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  

  return (
    <div className='outer'>
    <div className='navbar'>
    <Avatar 
    style={{cursor:"pointer"}}
    id="basic-button"
    aria-controls={open ? 'basic-menu' : undefined}
    aria-haspopup="true"
    aria-expanded={open ? 'true' : undefined}
    onClick={handleClick}
    >{localStorage.getItem("data").charAt(0).toUpperCase()}</Avatar>
   
    
    </div>
    <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>{localStorage.getItem("email")}</MenuItem>
         <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>

    <div className='main'>
      <p>Make your own Diet</p>
       
      <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Get Started
      </button>

<div className="modal fade" id="exampleModal-1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Your Diet plan</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  className="main_window modal-body">
     
        {loading?<div className="d-flex justify-content-center">
                  <div className="spinner-grow text-primary m-5" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                  <div className="text-secondary mt-5" >wait a moment<br/>AI is thinking 🤔</div>
                </div>  
                :
            response.map((e,key)=>{
              switch (e) {
                case 'Monday':
                  return(<h3>{e}</h3>)
                case 'Tuesday':
                  return(<h3>{e}</h3>)
                case 'Wednesday':
                  return(<h3>{e}</h3>)
                case 'Thursday':
                  return(<h3>{e}</h3>)
                case 'Sunday':
                  return(<h3>{e}</h3>)
                case 'Friday':
                  return(<h3>{e}</h3>)
                case 'Saturday':
                  return(<h3>{e}</h3>)
                default:
                  return(<p>{e}</p>)
                }
            })
         }
     
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Back</button>
        {/* <button type="button" className="btn btn-primary">Save changes</button> */}
      </div>
    </div>
  </div>
</div>

   {/*  end */}


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Enter your details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <div className="input-group mb-3">
            <span className="input-group-text">First and last name<p className='imp'>*</p></span>
            <input type="text" aria-label="First name" className="form-control" onChange={(e) => handleChanges(e, 'first_name')}/>
            <input type="text" aria-label="Last name" className="form-control" onChange={(e) => handleChanges(e, 'last_name')}/ >
            </div>

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">Age<p className='imp'>*</p></span>
              <input type="number" className="form-control " placeholder="e.g. 24" aria-label="age" aria-describedby="basic-addon1" onChange={(e) => handleChanges(e, 'age')}/>
            </div>

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">Height<p className='imp'>*</p></span>
              <input type="number" className="form-control " placeholder="in cms" aria-label="height" aria-describedby="basic-addon1" onChange={(e) => handleChanges(e, 'height')}/>
              <span className="input-group-text" id="basic-addon1">Weight<p className='imp'>*</p></span>
              <input type="number" className="form-control " placeholder="in Kgs" aria-label="weight" aria-describedby="basic-addon1" onChange={(e) => handleChanges(e, 'weight')}/>
            </div>

            <div className="input-group mb-3 w-75">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Gender<p className='imp'>*</p></label>
              <select className="form-select" id="gender" onChange={(e) => handleChanges(e, 'gender')}>
                <option defaultValue="" >Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group mb-3 w-75">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Purpose<p className='imp'>*</p></label>
              <select className="form-select" id="purpose"  onChange={(e) => handleChanges(e, 'purpose')}>
                <option defaultValue="" >Choose...</option>
                <option value="Weight Gain">Weight Gain</option>
                <option value="Weight Loss">Weight Loss</option>
                <option value="Maintain">Maintain</option>
              </select>
            </div>

            <select className="form-select mb-3" aria-label="meal_type" onChange={(e) => handleChanges(e, 'meal_type')}>
              <option defaultValue="">Meal Type</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Nov-vegetarian">Nov-vegetarian</option>
            </select>

            <div className="input-group mb-3">
              <span className="input-group-text">Include Food items</span>
              <textarea className="form-control" aria-label="include" placeholder='include any specific food item' onChange={(e) => handleChanges(e, 'include')}></textarea>
            </div>

            <div className="input-group">
              <span className="input-group-text">Exclude Food items</span>
              <textarea className="form-control" aria-label="include" placeholder='exclude any specific food item' onChange={(e) => handleChanges(e, 'exclude')}></textarea>
            </div>
            <div className='btmLine'><p className='imp'>*</p>is mandatory</div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
             
              <button  type="button" className={info.first_name!=="" && info.age!=="" && info.height!=="" && info.weight!=="" && info.gender!==null && info.purpose!==null? "btn btn-outline-primary ":"btn btn-outline-primary disabled"} data-bs-dismiss="modal"   data-bs-toggle="modal" data-bs-target="#exampleModal-1" onClick={handleSubmit}>Fetch</button>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div className='footer'>Copyright @2023. All rights Reserved.</div>
    


    </div>
  )
}

export default Homepage