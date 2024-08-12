import React, {useState} from 'react'
import FileBase from 'react-file-base64'

import PersonIcon from '@mui/icons-material/Person';
import KeyIcon from '@mui/icons-material/Key';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import './auth.css'
import useAuth from '../../hooks/useAuth';

const Auth = () => {
  
  const {Login, Register, authError, setAuthError} = useAuth()
  const [signup, setSignup] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPassConfirm, setShowPassConfirm] = useState(false);
  
  const [authData, setAuthData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    city: "",
    phone: "",
    block: "",
    role: "consumer",
    avatar: ''
  });
  const handleAuthToggle = () => {
    setAuthData({
      username: "",
      password: "",
      confirmPassword: "",
      city: "",
      phone: "",
      block: "",
      role: "consumer",
      avatar: ''
    });
    setAuthError({...authError, username: null, password: null})
    setSignup((val) => !val);
    setShowPass(false);
  };
  const handleLogin = () => {
    Login(authData)
  }
 
  const handleRegister = () => {
    if (authData.password === authData.confirmPassword){
    
      Register(authData)
      // console.log(formData)
    }
    
    if (authData.password !== authData.confirmPassword){
      setAuthError({...authError, password: "Passwords do not match"})
    }
    
  }
  return (
    <div className='auth-page'>
      <div className="auth-card">
        {/* Login */}
        {
          !signup && 
            <div className="auth-form">
              <p className="auth-header">Login</p>
              <span className="error-message">{authError.username}</span>
              <div className={`${authError.username? 'input-wrapper form-error': 'input-wrapper'}`}>
                <PersonIcon style={{color:`${authError.username ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
                <input 
                value={authData.username}
                onChange={(e) => {
                  setAuthData({ ...authData, username: e.target.value })
                    setAuthError({...authError, username: null})
                }} 
                type="text" 
                placeholder="Username"
                className='auth-form-input'
                />
              </div>
                <span className="error-message">{authError.password}</span>
                <div className={`${authError.password? 'input-wrapper form-error': 'input-wrapper'}`}>
                  <div className="show-pass">
                    <VisibilityIcon className={`${showPass ? 'off' : 'on'}`} style={{color: 'var(--font-charge)'}} onClick={()=>setShowPass(true)}/>
                    <VisibilityOffIcon className={`${showPass ? 'on' : 'off'}`} style={{color: 'var(--font-charge)'}} onClick={()=>setShowPass(false)}/>
                  </div>
                  <KeyIcon style={{color:`${authError.password ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
                  <input 
                value={authData.password}
                onChange={(e) => {
                  setAuthData({ ...authData, password: e.target.value })
                    setAuthError({...authError, password: null})
                }}
                type={showPass? 'text' : 'password'}
                placeholder="Password"
                className='auth-form-input'
                />
                </div>
              
              <button onClick={handleLogin} className='auth-button'>Login</button>
              <div className="auth-toggle-section">
                <p className="toggle-query">Don't have account yet? <span onClick={handleAuthToggle} className="toggler">Register</span></p>
              </div>
            </div>
          
        }
        {/* Register */}

         {
           signup && 
           
             <div className="auth-form">
              <p className="auth-header">Register</p>
              <FileBase type='file' multiple={false} onDone={({base64}) => setAuthData({...authData, avatar: base64})}/>
              <span className="error-message">{authError.username}</span>
              <div className={`${authError.username? 'input-wrapper form-error': 'input-wrapper'}`}>
                <PersonIcon style={{color:`${authError.username ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
                <input 
                  value={authData.username}
                  onChange={(e) => {
                  setAuthData({ ...authData, username: e.target.value })
                    setAuthError({...authError, username: null})
                }} 
                  type="text" 
                  placeholder='Username' 
                  className='auth-form-input'
                  />
              </div>
              <div className="input-wrapper">
                <PhoneAndroidIcon style={{color:'var(--font-charge)'}}/>
                <input 
                  value={authData.phone}
                  onChange={(e) => setAuthData({ ...authData, phone: e.target.value })} 
                  type="text" 
                  placeholder='Phone' 
                  className='auth-form-input'
                  />
              </div>

              <span className="error-message">{authError.city}</span>
              <div className={`${authError.city? 'input-wrapper form-error': 'input-wrapper'}`}>
                <LocationCityIcon style={{color:`${authError.city ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
                 <input 
                value={authData.city}
                onChange={(e) => {
                  setAuthData({ ...authData, city: e.target.value })
                    setAuthError({...authError, city: null})
                }} 
                type="text" 
                placeholder='City' 
                className='auth-form-input'
                />
              </div>

              <span className="error-message">{authError.block}</span>
              <div className={`${authError.block? 'input-wrapper form-error': 'input-wrapper'}`}>
              <AddLocationIcon style={{color:`${authError.block ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
              <input 
                value={authData.block}
                onChange={(e) => {
                  setAuthData({ ...authData, block: e.target.value })
                    setAuthError({...authError, block: null})
                }} 
                type="text" 
                placeholder='Address' 
                className='auth-form-input'
                />
              </div>
              <span className="error-message">{authError.password}</span>
              <div className={`${authError.password? 'input-wrapper form-error': 'input-wrapper'}`}>
                <div className="show-pass">
                  <VisibilityIcon className={`${showPass ? 'off' : 'on'}`} style={{color: 'var(--font-charge)'}} onClick={()=>setShowPass(true)}/>
                  <VisibilityOffIcon className={`${showPass ? 'on' : 'off'}`} style={{color: 'var(--font-charge)'}} onClick={()=>setShowPass(false)}/>
                </div>
                  <LockIcon style={{color:`${authError.password ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
                <input 
                  value={authData.password}
                  onChange={(e) => {
                  setAuthData({ ...authData, password: e.target.value })
                    setAuthError({...authError, password: null})
                }} 
                  type={showPass? 'text' : 'password'}
                  placeholder='Password' 
                  className='auth-form-input'
                  />
              </div>
                <div className={`${authError.password? 'input-wrapper form-error': 'input-wrapper'}`}>
                  <div className="show-pass">
                    <VisibilityIcon className={`${showPassConfirm ? 'off' : 'on'}`} style={{color: 'var(--font-charge)'}} onClick={()=>setShowPassConfirm(true)}/>
                    <VisibilityOffIcon className={`${showPassConfirm ? 'on' : 'off'}`} style={{color: 'var(--font-charge)'}} onClick={()=>setShowPassConfirm(false)}/>
                  </div>
                  <LockIcon style={{color:`${authError.password ? 'var(--font-accent)' : 'var(--font-charge)'}`}}/>
              <input 
                value={authData.confirmPassword}
                onChange={(e) => {
                  setAuthData({ ...authData, confirmPassword: e.target.value })
                    setAuthError({...authError, confirmPassword: null})
                }} 
                type={showPassConfirm? 'text' : 'password'}
                placeholder='Confirm password' 
                className='auth-form-input'
                />
                </div>
              <button onClick={handleRegister} className='auth-button'>Register</button>
              <div className="auth-toggle-section">
                <p className="toggle-query">Already have an account? <span onClick={handleAuthToggle} className="toggler">Login</span></p>
              </div>
            </div> 
        }
      </div>
    </div>
  )
}

export default Auth