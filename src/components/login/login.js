import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import './normalize.css';
import axios from 'axios';

function Login(props){   

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	// const [showerror, setError] = useState(false);
	// const [showMsg, setMsg] = useState(false);

	const login = (e) => {
		e.preventDefault();
		axios.post('/user/login', {name:username, password:password})
		.then(function(response) {
			localStorage.setItem('token',response.data.token);
			localStorage.setItem('id',response.data.id);
			props.history.push('/dashboard');
        }).catch(function (error) {
            console.log('error ',error);
        });     
    }

     return (
		<React.Fragment>
		<div id="login">
	    <div className="container">
			<div className="row">
				<div className="col-md-12 text-center">
					<img src="/images/logo-big.png" alt="" className="logo-big" />
				</div>
			</div>
	        <div id="login-row" className="row justify-content-center align-items-center">
	            <div id="login-column" className="col-md-7">
	                <div className="login-box col-md-12 loginbox">
	                    <form id="login-form" className="form" onSubmit={(e) => login(e)}>
	                        <h1 className="text-center">Court Case Monitoring System</h1>
	                        <div className="form-group login-field">
	                            <label>User Name:</label><br/>
	                            <input type="email" className="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
	                        </div>
	                        <div className="form-group login-field">
	                            <label>Password:</label><br/>
	                            <input type="password" name="password" id="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
	                        </div>
							<br/>	
							<div className="row login-field">
								<div className="col-md-12 txtAlign">
								<input type="submit" name="submit" className="btn btn-info btn-md btnwd" value="Login"/><br/><br/>								
								</div>
							</div>				             
	                    </form>
	                </div>
	            </div>
	        </div>
	    </div>
	</div>
	<footer>
		<p>Copyright © 2019. All rights reserved. Designed & Developed by <a href="https://delaplex.com/"  target="_blank">delaPlex</a>.</p>
	</footer>
	</React.Fragment>
     );
   }
    
export default Login;