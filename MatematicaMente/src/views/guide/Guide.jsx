import React, { useState, useEffect } from "react";
import NavBarHome from '../../components/navbarhome/NavBarHome'
import GuideRecomendations from '../../openai/Guide';
import { Dropdown, DropdownButton, ButtonToolbar, ButtonGroup, Button, DropdownItem } from "react-bootstrap";
import GuideList from "../../components/guidelist/GuideList";
import axios from "axios";
import styles from "./Guide.module.css";


export default function Guide() {

  // Unidades, Temas y Topicos entregados por la Base de Datos 
  const [data, setdata] = useState([])

  // Depuracion de la variable data
  const [chargeSubjects, setchargeSubjects] = useState(null)
  const [chargesubjectmatters, setchargesubjectmatters] = useState(null)

  // Items seleccionados por el estudiante
  const [subject, setSubject] = useState(null)
  const [subjectmatter, setSubjectMatter] = useState(null)

  // Formato para guardar la informacion recibida de OpneAI
  const [showPath, setShowPath] = useState(false)
  const [list, setList] = useState({
    "Guia de estudio": "",
    Pasos: []
  })

  // Envio de los items seleccionados por el estudiante a la API de OpneAI
  const handleSend = async () => {
    const responseOpenAI = await GuideRecomendations(subject, subjectmatter);
    setList(JSON.parse(responseOpenAI));
    setShowPath(true)
  }

  // Carga los temas de la unidad seleccionada 
  const handleSubjectMatter = (subject) => {
    //Carga los temas de la unidad selecionada
    let arraysubjectmatter = []
    for (let element of data) {
        if(subject === element.subject){
            if( !arraysubjectmatter.includes(element.subjectmatter) ){
                arraysubjectmatter.push(element.subjectmatter)
            }
        }
    }
    //Los Imprime por pantalla
    setchargesubjectmatters(arraysubjectmatter)
  };

  axios.defaults.withCredentials = true;

  // Consulta por las unidades, temas y topicos almacenadas en la base de datos
  useEffect(() => {
    if (data.length == 0 ) {
      axios.get('http://localhost:3001/topics')
      .then(res => {
        if(res.data.Status === "Success") {
          //Guardamos la informacion entregada por MYSQL para poder trabajarla
          setdata(res.data.result)
          //Buscamos las materias disponibles
          let arraysubject = []
          for (let element of res.data.result) {
            if( !arraysubject.includes(element.subject) ){
              arraysubject.push(element.subject)
            }
          }
          //Imprimimos las unidades encontradas en pantalla
          setchargeSubjects(arraysubject)
        }
        else {
          console.log("Ocurrio un error al recibir la informacion de la base de datos");
        }
      })
    }
  }, [])

  return (
    <>
      <NavBarHome/>
      <div className={styles.container} style={{paddingRight: 250, paddingLeft: 250}}>
        <h1 style={{margin: 50}} >Seleciona la Unidad y Tema que quieres Estudiar!</h1>
        <div className={styles.containerButtons}>
          <DropdownButton className={styles.DropdownButton} id="Subject" title={"Unidades"} >
            <DropdownItem>Arremangala</DropdownItem>
          </DropdownButton>
          <DropdownButton className={styles.DropdownButton} id="SubjectMatter" title={"Temas"} >
            <DropdownItem>Arremangala</DropdownItem>
          </DropdownButton>
        </div>
        <ButtonToolbar className='mb-3'>
          <ButtonGroup className="me-2" aria-label="Subjects-Matters">
            {
              chargeSubjects != null && (
                <DropdownButton variant={ subject != null ? "success" : "danger" } id='dropdown-subjects' title={"Unidades"}>
                  {
                    chargeSubjects.map((chargeSubject, idx)=>{
                      return <Dropdown.Item key={`group-${idx}`} onClick={()=>{setSubject(chargeSubject), handleSubjectMatter(chargeSubject), setSubjectMatter(null)}}>{chargeSubject}</Dropdown.Item>
                    })
                  }
                </DropdownButton>
              )
            }
            {
              chargesubjectmatters != null && (
                <DropdownButton variant={ subjectmatter != null ? "success" : "danger" } id='dropdown-subjectmatters' title={"Temas"}>
                  {
                    chargesubjectmatters.map((chargesubjectmatter, idx)=>{
                      return <Dropdown.Item key={`group-${idx}`} onClick={()=>{setSubjectMatter(chargesubjectmatter)}}>{chargesubjectmatter}</Dropdown.Item>
                    })
                  }
                </DropdownButton>
              )
            }
          </ButtonGroup>
        </ButtonToolbar>
        <Button onClick={()=>{handleSend()}} disabled={ !(subject!=null && subjectmatter!=null) }>Enviar</Button>
        {
          showPath && (
            <div className={styles.wrapper}>
              <strong style={{fontSize: 20, textAlign: 'center'}}>Pasos</strong>
              {
                list.Pasos.map((step, index) => (
                  <p key={index}> {index+1}{")"} {step}</p>
                ))
              }
            </div>
          )
        }
      </div>
    </>
  )
}
