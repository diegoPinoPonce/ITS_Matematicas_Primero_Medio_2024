import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../../context/UserProvider';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import NavBarApp from '../../components/navbarapp/NavBarApp';
import styles from './Signup.module.css'
import { useAuth } from '../../context/AuthContext';

export default function Signup() {
  
  const navigate = useNavigate();
  const { register } = useAuth();
  const [values, setValues] = useState({
    userName: '',
    name: '',
    lastName: '',
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: '',
    password: ''
  });

  // Referencias para cada campo de entrada
  const userNameRef = useRef(null);
  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    if (validateEmail(values.email) && validatePassword(values.password)) {
      const result = await register(values);
      if (result.success) {
          alert(result.message)
          navigate('/login');
      } else {
        alert(result.message);
      }
    } else {
      alert('Por favor, corrige los errores en el formulario antes de enviar.');
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: 'Correo electrónico no válido.'
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: ''
      }));
      return true;
    }
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;
    if (!passwordRegex.test(password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: 'La contraseña debe tener entre 8 y 12 caracteres, incluir al menos una letra mayúscula, una letra minúscula y un número.'
      }));
      return false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: ''
      }));
      return true;
    }
  };

  const handleKeyDown = (e, ref) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (ref && ref.current) {
        ref.current.focus();
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <>
      <NavBarApp/>
      <div className={styles.centered}>
        <div className={styles.wrapper}>
          <h1>Registrarse</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupUserName">
              <div className={styles.inputBox}>
                <Form.Control 
                  ref={userNameRef} 
                  onChange={e => setValues({...values, userName: e.target.value})} 
                  onKeyDown={(e) => handleKeyDown(e, nameRef)} 
                  type="text" 
                  placeholder="Nombre De Usuario"/>
                <i className='bx bxs-invader'></i>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupName">
              <div className={styles.inputBox}>
                <Form.Control 
                  ref={nameRef} 
                  onChange={e => setValues({...values, name: e.target.value})} 
                  onKeyDown={(e) => handleKeyDown(e, lastNameRef)} 
                  type="name" 
                  placeholder="Nombre"/>
                <i className='bx bxs-user'></i>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupLastName">
              <div className={styles.inputBox}>
                <Form.Control 
                  ref={lastNameRef} 
                  onChange={e => setValues({...values, lastName: e.target.value})} 
                  onKeyDown={(e) => handleKeyDown(e, emailRef)} 
                  type="lastName" 
                  placeholder="Apellidos"/>
                <i className='bx bxs-user'></i>
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <div className={styles.inputBox}>
                <Form.Control 
                  ref={emailRef} 
                  onChange={e => { 
                    setValues({ ...values, email: e.target.value });
                    validateEmail(e.target.value);
                  }} 
                  onKeyDown={(e) => handleKeyDown(e, passwordRef)} 
                  type="email" 
                  placeholder="Correo Electronico" />
                <i className='bx bxs-envelope' ></i>
              </div>
            </Form.Group>
            {errors.email && (
              <>
                <i className='bx bx-info-circle text-danger'></i>
                <strong className="text-danger"> {errors.email}</strong>
              </>
            )}
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <div className={styles.inputBox}>
                <Form.Control 
                  ref={passwordRef} 
                  onChange={e => {
                    setValues({ ...values, password: e.target.value });
                    validatePassword(e.target.value);
                  }}
                  onKeyDown={(e) => handleKeyDown(e, null)} 
                  type="password" 
                  placeholder="Contraseña"/>
                <i className='bx bxs-lock-alt' ></i>
              </div>
            </Form.Group>
            {errors.password && (
              <>
                <i className='bx bx-info-circle text-danger'></i>
                <strong className="text-danger"> {errors.password}</strong>
              </>
            )}
          </Form>
          <Button className={styles.btn} style={{marginTop:15}} onClick={(e)=>{handleSubmit(e)}}>Comenzar</Button>
        </div>
      </div>
    </>
  )
}
