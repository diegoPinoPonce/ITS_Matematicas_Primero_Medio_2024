import React, { useState, useEffect } from 'react';
import NavBarApp from './components/navbarapp/NavBarApp';
import './App.css';
import styles from "./App.module.css"
import { Button, Image } from 'react-bootstrap';

// Imagenes Banner
import Excersises from "./images/App/Excersises.jpg";
import Planning from "./images/App/Planning.jpg";
import Teacher from "./images/App/Teacher1.png";

// Tier
import Bronze1 from "./images/App/Bronze_Block.png"
import Bronze from "./images/Emblems/Bronze.png"
import Silver from "./images/Emblems/Silver.png"
import Gold from "./images/Emblems/Gold.png"
import Emerald from "./images/Emblems/Esmerald.png"
import Diamond from "./images/Emblems/Diamond.png"
import Master from "./images/Emblems/Master.png"
import Legend from "./images/Emblems/Legend.png"

const tiers = [
  { src: Bronze, alt: "Bronze", title: "BRONCE" },
  { src: Silver, alt: "Silver", title: "PLATA" },
  { src: Gold, alt: "Gold", title: "ORO" },
  { src: Emerald, alt: "Emerald", title: "ESMERALDA" },
  { src: Diamond, alt: "Diamond", title: "DIAMANTE" },
  { src: Master, alt: "Master", title: "MAESTRO" },
  { src: Legend, alt: "Legend", title: "LEYENDA" }
];

function App() {

  const [currentTier, setCurrentTier] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTier((prevTier) => (prevTier + 1) % tiers.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <NavBarApp/>
      <div id='banner' className={styles.container}>
        <div className={styles.overlay}>
          <p>Matemáticamente</p>
          <Button onClick={()=>{console.log("hola")}} variant="outline-light">Juega Ahora</Button>
        </div>
      </div>
      <section id="funtions" className={styles.sectionFuntions}>
        <div style={{display: 'flex'}}>
          <div className={styles.containerText}>
            <p>Ejercicios Hechos a</p>
            <h2>TU MEDIDA</h2>
            <p>Descubre ejercicios matemáticos diseñados específicamente para tu nivel y unidad de estudio. Mejora tus habilidades con problemas que se adaptan a tu progreso y te preparan para sobresalir.</p>
          </div>
          <div className={styles.containerImg}>
            <Image src={Excersises} alt="Exercises" className={styles.imglarge}/>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div className={styles.containerImg} style={{justifyContent: "end"}}>
            <Image src={Teacher} alt="Teacher" className={styles.imglarge}/>
          </div>
          <div className={styles.containerText}>
            <p>Consulta con</p>
            <h2>TU EXPERTO</h2>
            <p>¿Tienes una duda? ¡No te preocupes! Nuestro profesor virtual está aquí para ayudarte en cualquier momento. Recibe respuestas inmediatas y claras a todas tus preguntas matemáticas.</p>
          </div>
        </div>
        <div style={{display: 'flex'}}>
          <div className={styles.containerText}>
            <p>Aprende a</p>
            <h2>TU RITMO</h2>
            <p>Obtén recomendaciones de estudio personalizadas que te guiarán desde lo básico hasta lo más avanzado. Aprende de manera eficiente con materiales diseñados para ayudarte a entender y dominar cada concepto.</p>
          </div>
          <div className={styles.containerImg}>
            <Image src={Planning} alt="Planning" className={styles.imglarge}/>
          </div>
        </div>
      </section>
      <section id="classification" style={{backgroundColor: "#262626", padding: 50}}>
        <h2 style={{textAlign: "center"}}>Sistema de Clasificaciones</h2>
        <p style={{textAlign: "center"}}>Gana puntos, sube de nivel, crece en el ranking y observa tu progreso con cada ejercicio que completes.</p>
        <section style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
          <Image src={tiers[currentTier].src} alt={tiers[currentTier].alt} style={{ width: 450, height: 450, display: "block" }} />
          <h2>{tiers[currentTier].title}</h2>
        </section>
        <div style={{display: "flex"}}>
          <div className={styles.containerTier}>
            <Image src={Bronze} alt="Bronze" style={{width: 100,height: 100,display: "block"}}/>
          </div>
          <div className={styles.containerTier}>
            <Image src={Silver} alt="Silver" style={{width: 125,height: 125,display: "block"}}/>
          </div>
          <div className={styles.containerTier}>
            <Image src={Gold} alt="Gold" style={{width: 150,height: 150,display: "block"}}/>
          </div>
          <div className={styles.containerTier}>
            <Image src={Emerald} alt="Emerald" style={{width: 175,height: 175,display: "block"}}/>
          </div>
          <div className={styles.containerTier}>
            <Image src={Diamond} alt="Diamond" style={{width: 200,height: 200,display: "block"}}/>
          </div>
          <div className={styles.containerTier}>
            <Image src={Master} alt="Master" style={{width: 225,height: 225,display: "block"}}/>
          </div>
          <div className={styles.containerTier}>
            <Image src={Legend} alt="Legend" style={{width: 275,height: 275,display: "block"}}/>
          </div>         
        </div>
      </section>
    </>
  )
}

export default App;

/* JSX
      <div className={styles.bannerContainer}>
        <img className={styles.img} src={albert} alt='Albert Einstein'></img>
        <h1 className={styles.hbanner}>¡Bienvenido a MatematicaMente! Tu Portal de Matemáticas Interactivo</h1>
        <p className={styles.pbanner}>Únete a nosotros y descubre el poder de aprender con inteligencia artificial.</p>
      </div>
      <section className={styles.sectionBlock}>
        <div className={styles.sectionText}>
          <h2>Objetivo del Proyecto</h2>
          <p>MatematicaMente está diseñado para ayudar a los estudiantes de primero medio en Chile a mejorar sus habilidades matemáticas mediante ejercicios interactivos, un profesor virtual, y una guía de estudio personalizada, Con el apoyo de tecnologias actuales con inteligencia artificial para apoyar el aprendizaje y mejorar las habilidades del estudiante.</p>
        </div>
      </section>
      <h2 style={{textAlign: 'center'}}>Funcionalidades</h2>
      <section className={styles.sectionFunction}>
        <div className={styles.sectionText}>
          <h2>Objetivo del Proyecto</h2>
          <p>MatematicaMente está diseñado para ayudar a los estudiantes de primero medio en Chile a mejorar sus habilidades matemáticas mediante ejercicios interactivos, un profesor virtual disponible 24/7, y una guía de estudio personalizada.</p>
        </div>
      </section>
      <div className={styles.mainContent}>
        <div className={styles.block}>
          <h2>Funcionalidades</h2>
          <ul>
            <li>Ejercicios Matemáticos Personalizados: Obtén ejercicios aleatorios adaptados a tu nivel y unidad de estudio.</li>
            <li>Profesor Virtual 24/7: Pregunta tus dudas y recibe respuestas inmediatas en temas de matemáticas.</li>
            <li>Guías de Estudio Personalizadas: Recibe recomendaciones de estudio desde lo básico hasta lo más avanzado.</li>
          </ul>
        </div>
        <div className={styles.block}>
          <h2>Gamificación</h2>
          <ul>
            <li>Sistema de Clasificaciones: Gana puntos y sube de nivel con cada ejercicio que completes.</li>
            <li>Rankings y Perfiles: Consulta tu ranking y compara tu progreso con otros estudiantes.</li>
            <li>Historial de Ejercicios: Lleva un registro de tus ejercicios realizados y observa tu progreso.</li>
          </ul>
        </div>
      </div>
*/

/* CSS

.bannerContainer {
  position: relative;
  text-align: center;
}

.img { 
  width: 100%;
  height: auto;
  opacity: 0.9;
}

.hbanner {
  position: absolute;
  top: 25%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  color: white;
}

.pbanner {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  color: white;
}

.mainContent {
  padding: 50px 250px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.block {
  background-color: #444;
  padding: 20px;
  border-radius: 10px;
}

.block h2 {
  margin-top: 0;
}

.block p, .block ul {
  margin: 0;
}

.block ul {
  padding-left: 20px;
}

.cta {
  text-align: center;
  margin-top: 50px;
}

.registerButton {
  background-color: #5A9;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.25rem;
}

.registerButton:hover {
  background-color: #7AB;
}

.sectionBlock {
  display: flex;
  justify-content: center; 
  align-items: center; 
  padding: 50px 250px;
}

.sectionText {
  text-align: center;
  width: 100%;
  background-color: rgba(38, 38, 38, 1);
  border: 2px solid rgba(255, 255, 255, .2);
  backdrop-filter: blur(20px);
  box-shadow: 0 0 10px rgba(0, 0, 0, .9);
  color: white;
  border-radius: 10px;
  padding: 20px 30px;
  margin: 0 auto;
  margin-top: 40px;
  flex-direction: column;
  display: flex;
}

.sectionText:hover{
  box-shadow: 0 0 10px #5852F2;
}

.sectionBlock h2 {
  margin-bottom: 2rem;
  color: #fff; 
}

.sectionBlock p {
  color: #fff; 
}

.sectionFunction{
  display: flex;
  justify-content: center; 
  align-items: center;
  padding: 50px 250px;
  background-color: #4E4BBF;
}

*/