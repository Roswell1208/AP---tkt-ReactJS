import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import  { AuthContext }  from '../Context/AuthProvider';
import '../assets/css/login.css';

import axios from '../api/axios';
const LOGIN_URL = "/login";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [roles, setRoles] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        

        try{
            const response = await axios.post(LOGIN_URL, 
                JSON.stringify({username : user, password : pwd}),
                {
                    headers: { 'Content-Type': 'application/json' }, 
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            const role = response?.data?.roles_idRole;
            setAuth({ user, pwd, roles: role});
            setUser('');
            setPwd('');
            setSuccess(true);

            if(role === 1){
                setIsAdmin(true);
                setRoles('Admin');
            } else {
                setIsAdmin(false);
                setRoles('User');
            }

            localStorage.setItem('user', JSON.stringify({ user, role}));

            window.location.href = '/';

        } catch(err) {
            if(!err?.response){
                setErrMsg('No server Response');
            } else if(err?.response?.status === 404){
                setErrMsg('Invalid Username or Password');
            } else if(err?.response?.status === 500){
                setErrMsg('Unauthorized');
            } else{
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in {roles}!</h1>
                    <br />
                    <p>
                        <a href="/encyclopédie">Go to Home</a>
                    </p>
                </section>
            ) : (
                <body className='bodylogin'>
                    <link rel="stylesheet" href="../assets/css/login.css"></link>
                    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,600&display=swap" rel="stylesheet"></link>
                    <title>Login</title>
                    <div className='login__card'>
                        <div className='login__intro'>
                            <img src="assets/img/login.svg" alt="" className='login__image'></img>
                            <h2>Bienvenue !</h2>
                            <h4>Enter vos informations pour continuer</h4>
                        </div>
                        <div className='login__form'>
                            <section>
                                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                                <h1>Sign In</h1>
                                <form onSubmit={handleSubmit}>
                                    <label htmlFor="username">Username:</label>
                                    <input type="text"
                                        id="username"
                                        className='input username'
                                        placeholder="Enter your username"
                                        ref={userRef}
                                        autoComplete='off'
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
                                    />
                                    
                                    <label htmlFor="password">password:</label>
                                    <input type="password"
                                        id="password"
                                        className='input password'
                                        placeholder="Enter your password"
                                        ref={userRef}
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                    />
                                    <button type="submit" className='input submit' value="Sign Me In">Sign In</button>
                                </form>
                            </section>
                            <div className='login__helper'>
                                <span className='forget__password'>
                                    Forget Your Password? <a href="#">Reset Now</a>
                                </span>
                            </div>
                        </div>
                    </div>
                </body>
            )}
            </>
    );
};

export default Login;