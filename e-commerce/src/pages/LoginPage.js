import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import { Link } from 'react-router-dom'

const LoginPage = () => {
  
    let {loginUser} = useContext(AuthContext)
    return (
        // <div>
        //     <form onSubmit={loginUser}>
        //         <input type="text" name="username" placeholder="Enter Username" />
        //         <input type="password" name="password" placeholder="Enter Password" />
        //         <input type="submit"/>
        //     </form>
        // </div>
        <div className='d-flex 'style={{backgroundColor:" #F0EEE6" ,height:"100vh"}}>
        <div className='col-6' >
            <div className='  d-flex justify-content-center' style={{ height:"700px",top:"30px",left:"70px",width:"600px", borderRadius:"20px",position:"relative",backgroundColor:"white"}}>

            <form className=' my-5  d-flex flex-column 'style={{width:"381px"}} onSubmit={loginUser}>
              <div  className='d-grid 'style={{marginBottom:"7px" }}> 
           <h3 style={{marginBottom:"3px" }}>Welcome back!!</h3>
            <p style={{margin:"0px" }}className='text-secondary' >Enter your name to proceed.</p>
            </div>
            <div className='d-grid my-3' style={{minHeight: "76px"}}>

            <label htmlFor="username">Name</label>
             <input type="text" name="username" id="username" placeholder="Enter Username" />
              </div> 
            <div className='d-grid my-3' style={{minHeight: "76px"}}>

            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" placeholder="Enter Password" />
                </div>
           
           <input type="submit" className='btn bg-success my-3' style={{width:"381px"}}/>
          
           <div className='d-flex my-5 justify-content-center'> <p className=' my-2 text-secondary mx-5 ' style={{fontSize:".9rem"}}>Aleady have an account?<Link to="/register" >SignUp</Link> </p>
           </div>
            </form >
        </div>
        </div>
         <div className=" col-6 " >
            <img style={{width:"570px",height:"630px",left:"30px" ,top:"70px",position:"relative",borderRadius:"10px"}} src='https://images.pexels.com/photos/15513767/pexels-photo-15513767/free-photo-of-tree-branches-on-the-background-of-the-sky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'>
            </img>
        </div>
        </div>
    )
}

export default LoginPage