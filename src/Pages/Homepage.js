import React,{useState} from 'react'
import axios from "axios";


const Homepage = () => {

const [response, setResponse] = useState("");


  
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
    console.log(plan);
    e.preventDefault();
  
      axios
      .post("http://localhost:8080/chat", {plan})
      .then((res)=>{
        setResponse(res.data);
        console.log(response);
    })
      .catch((err)=>{
      console.error(err)
    });
    };

  let handleChanges = (e, state) => {
    setInfo({...info, [[state]] : e.target.value})
  }
  return (
    <>
    <div className='navbar'></div>
    <div className='main'>
      <p>Make your Customised DIET Plan Using AI</p>
       
      <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Get Started
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Enter your details</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

            <div className="input-group mb-3">
            <span className="input-group-text">First and last name</span>
            <input type="text" aria-label="First name" className="form-control" onChange={(e) => handleChanges(e, 'first_name')}/>
            <input type="text" aria-label="Last name" className="form-control" onChange={(e) => handleChanges(e, 'last_name')}/ >
            </div>

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">Age</span>
              <input type="number" className="form-control " placeholder="e.g. 24" aria-label="age" aria-describedby="basic-addon1" onChange={(e) => handleChanges(e, 'age')}/>
            </div>

            <div className="input-group mb-3 ">
              <span className="input-group-text" id="basic-addon1">Height</span>
              <input type="number" className="form-control " placeholder="in cms" aria-label="height" aria-describedby="basic-addon1" onChange={(e) => handleChanges(e, 'height')}/>
              <span className="input-group-text" id="basic-addon1">Weight</span>
              <input type="number" className="form-control " placeholder="in Kgs" aria-label="weight" aria-describedby="basic-addon1" onChange={(e) => handleChanges(e, 'weight')}/>
            </div>

            <div className="input-group mb-3 w-75">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Gender</label>
              <select className="form-select" id="gender" onChange={(e) => handleChanges(e, 'gender')}>
                <option defaultValue="" >Choose...</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group mb-3 w-75">
              <label className="input-group-text" htmlFor="inputGroupSelect01">Purpose</label>
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

            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-outline-primary" onClick={handleSubmit}>Fetch</button>
            </div>
          </div>
        </div>
      </div>


    </div>
    <div className='footbar'></div>
    </>
  )
}

export default Homepage