import React, { useEffect, useState } from 'react';
import NavBarHome from '../../components/navbarhome/NavBarHome';
import styles from './Home.module.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  //className={styles.centered}
  const navigate = useNavigate();

  return (
    <>
      <NavBarHome/>
      <div className={styles.container} style={{paddingRight: 250, paddingLeft: 250}}>
        <div className={styles.wrapper}>
          <div className={styles.div1}>
            <h3>Guía Personalizada de Estudio</h3>
            <p> </p>
            <p>¿No sabes por dónde empezar? Nuestra IA te guiará paso a paso, recomendándote qué unidades estudiar para que puedas dominar cualquier materia. ¡Prepárate para mejorar tus habilidades con la guía de OpenAI!</p>
          </div>
          <div className={styles.div2}>
            <Button className={styles.btn} onClick={() => navigate('/guide')}>¡Descúbrelo!</Button>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.div1}>
            <h3>Tu Profe Virtual de Matemáticas</h3>
            <p> </p>
            <p>¿Tienes dudas en matemáticas? Habla con nuestra IA, que actúa como tu profesor personal. Podrás resolver todas tus preguntas de primero medio y entender la materia con facilidad. ¡La ayuda de OpenAI está a un clic de distancia!</p>
          </div>
          <div className={styles.div2}>
            <Button className={styles.btn} onClick={() => navigate('/chat')}>¡Pregunta ahora!</Button>
          </div>
        </div>
        <div className={styles.wrapper}>
          <div className={styles.div1}>
            <h3>Test y Ejercicios Interactivos</h3>
            <p> </p>
            <p>Practica y mejora con tests y ejercicios personalizados. Nuestra IA de OpenAI crea cuestionarios únicos que te ayudarán a entender mejor las unidades, temas y tópicos de matemáticas que necesitas. ¡Obtén puntajes, sube de nivel y diviértete aprendiendo!</p>
          </div>
          <div className={styles.div2}>
            <Button className={styles.btn} onClick={() => navigate('/practice')}>¡Empieza a practicar!</Button>
          </div>
        </div>
      </div>
    </>
  )
}