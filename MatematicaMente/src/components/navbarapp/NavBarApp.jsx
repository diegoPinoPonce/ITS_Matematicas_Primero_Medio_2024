import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styles from'./NavBarApp.module.css';

export default function NavBarApp() {

  return (
    <Navbar data-bs-theme="dark" className={styles.navBar} fixed="top">
      <Container fluid style={{paddingRight: 250, paddingLeft: 250, }}>
          <Navbar.Brand href='/' style={{marginRight: 20}}>
            <i className='bx bxs-brain'></i>
            {" "}MatematicaMente
          </Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/#banner">Inicio</Nav.Link>
          <Nav.Link href="/#funtions">Nuestro Objetivo</Nav.Link>
          <Nav.Link href="/#classification">Información del juego</Nav.Link>
        </Nav>
          <Button className={styles.btnLogin} href='/login' variant="outline-light">Iniciar Sesion</Button>
          <Button className={`${styles.btnRegister} ${styles.ex2}`} href='/signup'>¡Registate!</Button>
      </Container>
    </Navbar>
  )
};