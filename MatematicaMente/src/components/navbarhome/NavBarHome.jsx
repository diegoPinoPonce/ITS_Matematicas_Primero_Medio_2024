import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from "axios";
import styles from'./NavBarHome.module.css';

export default function NavBarHome() {

    const navigate = useNavigate();
    const { logout } = useAuth();

    const handleLogout = async () => {
        const result = await logout();
        if (result.success) {
            navigate('/');
        } else {
          alert(result.message);
        }
    };

    axios.defaults.withCredentials = true;

    return (
        <Navbar className='navBarContainer' style={{ backgroundColor: '#262626' }} expand="lg" fixed="top">
        <Container fluid style={{paddingRight: 250, paddingLeft: 250}}>
            <Navbar.Brand  className="text-white" onClick={() => navigate('/home')} style={{marginRight: 20, cursor: "pointer"}}>
                <i className='bx bxs-brain'></i>
                {" "}MatematicaMente
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
                <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
                >
                    <Nav.Link className="text-white" onClick={() => navigate('/home')}>Inicio</Nav.Link>
                    <Nav.Link className="text-white" onClick={() => navigate('/beststudents')}>Tabla de Posiciones</Nav.Link>
                    <Nav.Link className="text-white" onClick={() => navigate('/historyexercises')}>Historial de examenes</Nav.Link>
                </Nav>
                <Button className={styles.btn} onClick={() => navigate('/profile')} variant="outline-light">
                    <i className='bx bxs-user'></i>
                    {" "}Mi Perfil
                </Button>
                <Button onClick={()=>handleLogout()} variant="outline-light">
                    <i className='bx bx-log-out bx-flip-horizontal' ></i>
                    {" "}Cerrar Sesión
                </Button>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}
