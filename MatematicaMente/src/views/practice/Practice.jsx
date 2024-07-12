import { useState } from "react";
import { Button, Form, Placeholder } from "react-bootstrap";
import GenerateProblems from "../../openai/GenerateProblems";
import NavBarHome from '../../components/navbarhome/NavBarHome';
import Topics from "../../components/topics/Topics";
import Record from "../../components/record/Record";
import styles from './Practice.module.css';
import { useNavigate } from "react-router-dom";

export default function Practice() {

  const navigate = useNavigate();
  // Response OpenAI
  const [questions, setQuestions] = useState(null);
  const [jsonquestion, setjsonquestion] = useState(null);

  // Manejo del Frontend
  const [total, setTotal] = useState(0);
  const [points, setpoints] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [lenghtAnswers, setlenghtAnswers] = useState([]);
  const [isLoadingGenerate, setisLoadingGenerate] = useState(false)
  const [isLoadingSend, setisLoadingSend] = useState(false)
  const [switchShow, setswitchShow] = useState(false)
  const answers = [];

  // Filtros Antes de Enviar la consulta a OpenAI
  const [data, setdata] = useState(null)
  const recibirDatos = (datos) => {
    setdata(datos);
  };
  
  // Damos la funcionalidad a las alternativas de las preguntas generadas por OpenAI
  const handleChange = ({ target }) => {
    if (!submitted) {
      const nextState = questions.map((question) => {
        if (question.name !== target.name) {
          return question;
        }
        return {
          ...question,
          options: question.options.map((opt) => {
            const checked = opt.radioValue === target.value;
            return {
              ...opt,
              selected: checked,
            };
          }),
          currentAnswer: target.value,
        };
      });
      setQuestions(nextState);
    }
  };

  // Se realiza la evaluacion, muestra el puntaje obtenido y por ultimo manda la informacion al server.
  const onSubmit = () => {
    setisLoadingSend(true)
    let correctAnswers = 0;
    let flag = false;
    let pointstotal = 0;

    // Obtenemos las respuestas correctas de los Objetos del JSON
    if(answers.length === 0 ){
      questions.map((question)=>{
        answers.push(question.correctAnswer)
      });
      setlenghtAnswers(answers)
    }

    for (const [index, question] of questions.entries()) {
      if (!question.currentAnswer) {
        // Revisamos si Faltan preguntas por contestar.
        flag = true;
        alert("Por favor responde la pregunta Numero " + (index + 1));
        break;
      } else {
        if (question.currentAnswer === answers[index]) {
          // Cuenta las respuestas correctas.
          ++correctAnswers;
        }
      }
    }

    // Actualizamos el JSON Original con los objetos que se trabajo en el Frontend.
    for (let i = 0; i < jsonquestion.ejercicios.length; i++) {
      const ejercicioOriginal = jsonquestion.ejercicios[i];
      const ejercicioModificado = questions[i];
  
      // Recorremos cada opción en el ejercicio
      for (let j = 0; j < ejercicioOriginal.options.length; j++) {
          const opcionOriginal = ejercicioOriginal.options[j];
          const opcionModificada = ejercicioModificado.options[j];
  
          // Actualizamos la propiedad selected de la opción original
          opcionOriginal.selected = opcionModificada.selected;
      }
    }

    // Calculamos las respuestas incorrectas
    let incorrectAnswers = answers.length - correctAnswers;

    // Sistema de Puntuacion
    switch (data[3]) {
      case "Facil":
        pointstotal = (correctAnswers * 2) - (incorrectAnswers * 0); // No se resta nada por respuestas incorrectas en la dificultad Facil
        break;
      case "Media":
        pointstotal = (correctAnswers * 4) - (incorrectAnswers * 2);
        break;
      case "Dificil":
        pointstotal = (correctAnswers * 6) - (incorrectAnswers * 6);
        break;
      case "Muy Dificil":
        pointstotal = (correctAnswers * 10) - (incorrectAnswers * 12);
        break;
      default:
        break;
    }

    // Mostramos las respuestas correctas al Frontend
    if (!flag) {
      setTotal(correctAnswers);
      setSubmitted(true);
      setpoints(pointstotal);
    }

    // Enviamos la informacion a una funcion para que maneje los Errores y estructure la informacion a enviar al server
    Record( data[0], data[1], data[2], data[3], jsonquestion, pointstotal, "Practice")
    
  };

  // Envia las variables a la api de OpenAI con los filtros selecionados por el usuario.
  const sendQuestion = async () => {
    try {
      setisLoadingGenerate(true)
      setswitchShow(true)
      const stringJSON = await GenerateProblems(data[0], data[1], data[2], data[3], data[4]);
      // Transformamos el JSON de string a Objeto para poder trabajar con el.
      const openaiJson = JSON.parse(stringJSON);
      // Almacenamos el JSON Original como objeto para poder Actualizarlo.
      setjsonquestion(openaiJson)
      // Almacenamos los Objetos del JSON original generado para poder depurar y manejar la informacion.
      setQuestions(openaiJson.ejercicios);
      setisLoadingGenerate(false)
      setSubmitted(false)
    } catch (err) {
      console.log(err);
    }
  };

  // Mostramos Las respuestas correctas de Una forma sencilla de entenderlas al momento y ser evaluado los ejercicios
  const showAnswer = (answer, idx) => {
    if (answer == `q${idx + 1}-a`) {
      return "a"
    }
    if (answer == `q${idx + 1}-b`) {
      return "b"
    }
    if (answer == `q${idx + 1}-c`) {
      return "c"
    }
    if (answer == `q${idx + 1}-d`) {
      return "d"
    }
  };

  return (
    <>
      <NavBarHome/>
      <div style={{paddingRight: 250, paddingLeft: 250, paddingTop:20}}>
        {
          !switchShow && (
            <div>
              <h2>¡MenteMatematica desafia tus conocimientos!</h2>
              <Topics enviarDatos={recibirDatos}/>
              <Button className={styles.btn} onClick={()=>{sendQuestion()}} disabled={ data != null && !isLoadingGenerate ? false : true } >{ isLoadingGenerate ? 'Cargando...' : 'Generar' }</Button>
            </div>
          )
        }
        {
          switchShow && (
            <div className={styles.wrapper}>
                {
                  questions != null ? (
                    <Form style={{width: "100%"}} onSubmit={onSubmit}>
                      {
                        submitted && (
                          <div className={styles.result}>
                            <h3>
                              Evaluación: {total} de {lenghtAnswers.length} Respuestas Fueron Correctas
                            </h3>
                            <h3>
                              Puntos Obtenidos: { points } Puntos!
                            </h3>
                          </div>
                        )
                      }
                      <h2 style={{ textAlign: "center" }}>¡Desafío Matemático!</h2>
                      <p style={{ textAlign: "center" }}>Selecciona las respuestas correctas y presiona 'Enviar' para ver tu puntuación.</p>
                      {questions.map((question, idx) => (
                        <div className={styles.question} key={`group-${idx}`}>
                          <h3>
                            {idx + 1} {")"} {question.questionText} {}
                          </h3>
                          <p> </p>
                          {question.options.map((option, idx) => {
                            return (
                              <div key={`option-${idx}`}>
                                <Form.Check
                                  type="radio"
                                  name={question.name}
                                  label={option.choice}
                                  value={option.radioValue}
                                  checked={option.selected}
                                  onChange={handleChange}
                                />
                              </div>
                            );
                          })}
                          {
                            submitted && (
                              <p>Respuesta correcta: {showAnswer(question.correctAnswer, idx)}</p>
                            )
                          }
                        </div>
                      ))}
                      <div className={styles.containerbtn}>
                        <Button className={styles.btn} onClick={()=>{onSubmit()}} disabled={ isLoadingSend }>{ isLoadingSend ? 'Enviado' : 'Enviar'}</Button>
                        {
                          isLoadingSend && <Button className={styles.btn} onClick={() => navigate('/home')}>Volver</Button>
                        }
                      </div>
                    </Form>
                  ) : (
                    <>
                      <h3 aria-hidden="true">
                        <Placeholder xs={7} />
                      </h3>
                      <p aria-hidden="true">
                        <Placeholder xs={6} />
                      </p>
                      <p aria-hidden="true">
                        <Placeholder xs={6} />
                      </p>
                      <p aria-hidden="true">
                        <Placeholder xs={6} />
                      </p>
                      <Placeholder as="h3" xs={4} bg="danger"/>
                      <Placeholder as="p"  xs={1} bg="danger"/>
                      <Placeholder as="p"  xs={1} bg="danger"/>
                      <Placeholder as="p"  xs={1} bg="danger"/>
                      <Placeholder as="p"  xs={1} bg="danger"/>
                    </>
                  )
                }
            </div>
          )
        }
      </div>
    </>
  )
}