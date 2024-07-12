import React, { useEffect, useState } from 'react';
import NavBarHome from '../../components/navbarhome/NavBarHome';
import styles from './HistoryExercises.module.css';
import { Accordion, Form } from 'react-bootstrap';
import axios from "axios";


export default function HistoryExercises() {

    const [exercises, setexercises] = useState(null)

    useEffect(() => {
        axios.get('http://localhost:3001/getexercises')
        .then(res => {
            if(res.data.Status === "Success") {
                const parsedExercises = res.data.result.map(exercise => {
                    // Parsear la propiedad 'question' a objeto
                    const parsedQuestion = JSON.parse(exercise.question);
                    // Retornar el objeto actualizado
                    return {
                        ...exercise,
                        question: parsedQuestion.ejercicios
                    };
                });
                setexercises(parsedExercises)
            } 
            else {
                console.log("Sin Nombre");
            }
        })
    }, [])

    const showAnswer = (answer, options) => {

        const correctOption = options.find(option => option.radioValue === answer);

        return correctOption.choice

    };

    const colorp = (answer, options) => {

        const correctOption = options.find(option => option.radioValue === answer);

        return correctOption.selected

    };

    return (
        <>
            <NavBarHome/>
            <div className={styles.window} style={{paddingRight: 250, paddingLeft: 250}}>
                {
                    exercises != null && (
                        <Accordion id="exercises" size='lg' title="Exercises" >
                            {
                                exercises.map((exercise, idx) => (
                                    <Accordion.Item key={`question-${idx}`} eventKey={`${idx}`} style={{borderColor: "#4E4BBF"}}>
                                        <Accordion.Header>Ejercicio N° {`${idx + 1}`}</Accordion.Header>
                                        <Accordion.Body className={styles['accordion-body-custom']}>
                                            <div className={styles.container}>
                                                <div className={styles.div1}>
                                                    <Form>
                                                        {
                                                            exercise.question.map((question, idx) => (
                                                                <div key={`group-${idx}`}>
                                                                    <h2>
                                                                        {idx + 1} {")"} {question.questionText}
                                                                    </h2>
                                                                    {
                                                                        question.options.map((option, idx) => {
                                                                            return (
                                                                                <div key={`option-${idx}`}>
                                                                                    <Form.Check
                                                                                    type="radio"
                                                                                    name={question.name}
                                                                                    label={option.choice}
                                                                                    value={option.radioValue}
                                                                                    defaultChecked={option.selected}
                                                                                    disabled={true}
                                                                                    />
                                                                                </div>
                                                                            );
                                                                        })
                                                                    }
                                                                    <p style={ colorp(question.correctAnswer,question.options) ? { color: 'lightgreen'} : { color: 'red'}} >Respuesta correcta: {showAnswer(question.correctAnswer,question.options)}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </Form>
                                                </div>
                                                <div className={styles.div2}>
                                                    <h3>Informacion del Ejercicio</h3>
                                                    <p>Unidad: {`${exercise.subject}`}</p>
                                                    <p>Tema: {`${exercise.subjectmatter}`}</p>
                                                    <p>topico: {`${exercise.topics}`}</p>
                                                    <p>Dificultad: {`${exercise.difficulty}`}</p>
                                                    <p>Puntos: {`${exercise.score}`}</p>
                                                    <p>Puntos Conseguidos: {`${exercise.newscore-exercise.score}`}</p>
                                                    <p>Puntos Actualizado: {`${exercise.newscore}`}</p>
                                                    <p>Clasificación: {`${exercise.classification}`}</p>
                                                </div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                ))
                            }
                        </Accordion>
                    )
                }
            </div>
        </>
    )
}
