import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import NavBarApp from '../../components/navbarapp/NavBarApp';
import styles from './Login.module.css'
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

export default function Login() {

  const navigate = useNavigate();
  const { login } = useAuth();
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  axios.defaults.withCredentials = true;

  const handleSubmit = async (event) => {
    if (event) {
      event.preventDefault();
    }
    const result = await login(values);
    if (result.success) {
      if (result.role === 'student') {
        navigate('/home');
      } else if (result.role === 'admin') {
        navigate('/homeadmin');
      }
    } else {
      alert(result.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <>
      <NavBarApp/>
      <div className={styles.centered}>
        <div className={styles.wrapper}>
          <h1>Iniciar Sesion</h1>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <div className={styles.inputBox}>
                  <Form.Control onChange={e => setValues({...values, email: e.target.value})} onKeyDown={handleKeyDown} type="email" placeholder="Correo Electronico"/>
                  <i className='bx bxs-envelope' ></i>
                </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <div className={styles.inputBox}>
                  <Form.Control onChange={e => setValues({...values, password: e.target.value})} onKeyDown={handleKeyDown} type="password" placeholder="Contraseña" />
                  <i className='bx bxs-lock-alt' ></i>
                </div>
            </Form.Group>
          </Form>
          <Button className={styles.btn} onClick={(e)=>{handleSubmit(e)}}>Comenzar</Button>
        </div>
      </div>
    </>
  )
}
