import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import logo from '../../logo.svg';
import axios from 'axios';

function Login(props){   

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showerror, setError] = useState(false);
	const [showMsg, setMsg] = useState(false);

	const login = () => {

		console.log('email ',email);
        console.log('password ',password);   
       
		axios.post('login', {name:email, password:password})
		.then(function(response) {
            console.log('response ',response.data);
            // props.history.push('/details');
		// 	if(response.data == null){
		// 		setError(true);
		// 	}else{
		// 	if(response.data.success == false){setMsg(true); setError(false); }
		// 	if(response.data.success == true){ 
		// 		console.log('go to dashboard' );
		// 		setError(false);
		// 		setMsg(false);
		// 		localStorage.setItem('token', response.data.token);
		// 		localStorage.setItem('id', response.data.id);
		// 		localStorage.setItem('firstname', response.data.result.firstname);
		// 		axios.defaults.headers.common['Authorization'] = response.data.token;

		// 		props.history.push('/dashboard');

		// 	}
		// }
        }).catch(function (error) {
            console.log('error ',error);
        });     

    }

     return (
			<div className="user_card">
				<div className="d-flex justify-content-center">
					<div className="brand_logo_container d-flex justify-content-center">
						<img src={logo} className="brand_logo" alt="Logo" />
					</div>
				</div>
				<div className="d-flex justify-content-center form_container">
					<form>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-user"></i></span>
							</div>
							<input type="email" className="form-control input_user" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="username"/>
						</div>
						<div className="input-group mb-2">
							<div className="input-group-append">
								<span className="input-group-text"><i className="fas fa-key"></i></span>
							</div>
							<input type="password" className="form-control input_pass" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="password"/>
						</div>
						<div className="form-group">
							<div className="custom-control custom-checkbox">
								<input type="checkbox" className="custom-control-input" id="customControlInline"/>
								<label className="custom-control-label">Remember me</label>
							</div>
						</div>
					</form>
				</div>
				<div className="d-flex justify-content-center mt-3 login_container">
					<button type="button" className="btn login_btn" onClick={() => { login() }}>Login</button>
				</div>
				
				{ showerror ? <span className="error_class">Invalid Email</span> : null }
					{ showMsg ? <span className="error_class">Invalid Password</span> : null }
				<div className="mt-4">
					<div className="d-flex justify-content-center links">
						<a href="#">Forgot your password?</a>
					</div>
				</div>
			</div>        
     );
   }
    
export default Login;