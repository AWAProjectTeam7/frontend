import React,{useState} from 'react'

export default function Login(props) {
   
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
   
    const handleSubmit =  e => {
         e.preventDefault();
          const value ={
            username:username,
            password:password,
          }
        props.handleLogin(value)
       
      }
    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>  
            <div class="container">   
            <label>Your email : </label>   
            <input type="email" placeholder="Enter Username" name="username" required onChange={e => setUserName(e.target.value)}/>  
            <label>Password : </label>   
            <input type="password" placeholder="Enter Password" name="password" required onChange={e => setPassword(e.target.value)}/>  
            <button type="submit">Login</button>   
            <button type="button" class="cancelbtn"> Cancel</button>   
            </div>
            </form>     
        </>
    );
}

