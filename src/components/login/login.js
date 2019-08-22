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
	    <div class="container">
			<div class="row">
				<div class="col-md-12 text-center">
					<img src="/images/logo-big.png" alt="" class="logo-big" />
				</div>
			</div>
	        <div id="login-row" class="row justify-content-center align-items-center">
	            <div id="login-column" class="col-md-7">
	                <div class="login-box col-md-12 loginbox">
	                    <form id="login-form" class="form" onSubmit={(e) => login(e)}>
	                        <h1 class="text-center">Court Case Monitoring System</h1>
	                        <div class="form-group login-field">
	                            <label for="username" class="">User Name:</label><br/>
	                            <input type="email" class="form-control" name="username" value={username} onChange={(e) => setUsername(e.target.value)} required/>
	                        </div>
	                        <div class="form-group login-field">
	                            <label for="password" class="">Password:</label><br/>
	                            <input type="password" name="password" id="password" class="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required/>
	                        </div>
							<br/>	
							<div class="row login-field">
								<div class="col-md-6">
								<input type="submit" name="submit" class="btn btn-info btn-md" value="Login"/><br/><br/>								
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