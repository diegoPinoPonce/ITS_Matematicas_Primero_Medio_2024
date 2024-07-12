import React, { useEffect, useState } from 'react';
import { Button, Dropdown, DropdownButton, ButtonToolbar, ButtonGroup, Form } from "react-bootstrap";
import axios from "axios";

export default function Topics(props) {

    //Response de MYSQL
    const [data, setdata] = useState([])

    //Manejo de Informacion del Response de MYSQL
    const [chargeSubjects, setchargeSubjects] = useState(null)
    const [chargesubjectmatters, setchargesubjectmatters] = useState(null)
    const [chargetopics, setchargetopics] = useState(null)
    const chargedifficultys = ["Facil", "Media", "Dificil", "Muy Dificil"]
    const chargeExercises = ["2","4","6","8","10"]

    //Valores que seleciona el usuario
    const [subject, setSubject] = useState(null)
    const [subjectmatter, setSubjectMatter] = useState(null)
    const [topic, setTopic] = useState(null)
    const [difficulty, setDifficulty] = useState(null)
    const [numberOfExercises, setNumberOfExercises] = useState(null)

    axios.defaults.withCredentials = true;

    //Solicitar el material de estudio a MYSQL
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
                      console.log("Sin Nombre");
                  }
            })
        }

    }, [])

    //Cuando el usuario selecione la unidad invoca a cargar los temas de la unidad
    useEffect(() => {
        //En caso de que el usuario quiera cambiar la unidad se realiza un reset de los valores posteriores
        if( subject != null && subjectmatter != null ){
            setchargesubjectmatters(null)
            setSubjectMatter(null)
            setchargetopics(null)
            setTopic(null)
            setDifficulty(null)
            setNumberOfExercises(null)
            enviarDatosAlPadre(null)
        }
        if( subject != null) handleSubjectMatter(subject);
    }, [subject]);

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

    //Cuando el usuario selecione los temas de la unidad invoca a cargar los topicos del tema
    useEffect(() => {
        //En caso de que el usuario quiera cambiar el tema de la unidad se realiza un reset de los valores posteriores
        if( subjectmatter != null && topic != null){
            setchargetopics(null)
            setTopic(null)
            setDifficulty(null)
            setNumberOfExercises(null)
            enviarDatosAlPadre(null)
        }
        if( subjectmatter != null) handleTopic(subject,subjectmatter);
    }, [subjectmatter]);

    const handleTopic = (subject,subjectmatter) => {
        //Carga los topicos del tema selecionado
        let arraytopics = []
        for (let element of data) {
            if(subject === element.subject){
                if(subjectmatter === element.subjectmatter){
                    if( !arraytopics.includes(element.topics) ){
                        arraytopics.push(element.topics)
                    }
                }
            }
        }
        setchargetopics(arraytopics)
    };

    //En caso de que el usuario quiera cambiar el topico se reenvia la informacion
    useEffect(() => {
         if(topic != null && difficulty != null && numberOfExercises != null) enviarDatosAlPadre(true)
    }, [topic])

    //En caso de que el usuario quiera cambiar la dificultad se reenvia la informacion
    useEffect(() => {
        if(difficulty != null && numberOfExercises != null) enviarDatosAlPadre(true)
    }, [difficulty])

    //En caso de que el usuario quiera cambiar los ejercicios a realizar se reenvia la informacion
    useEffect(() => {
        if(numberOfExercises != null) enviarDatosAlPadre(true)
    }, [numberOfExercises])
    

    //Enviamos los datos al padre listos para ser enviados a la api de Openai
    const enviarDatosAlPadre = (reset) => {
        const datos = [subject, subjectmatter, topic, difficulty, numberOfExercises]
        if(subject !== null && subjectmatter !== null && topic !== null && difficulty !== null && numberOfExercises !== null && reset != null) {
            props.enviarDatos(datos);
        }
        else{
            //reset tiene el valor de null para que en el padre reciba la informacion de que no esta listo la desicion del usuario
            props.enviarDatos(reset);
        }
    };

    return (
        <div>
            <ButtonToolbar className='mb-3' aria-label="Toolbar with Button groups">
                <ButtonGroup className="me-2" aria-label="First group">
                    {
                        chargeSubjects != null && (
                            <DropdownButton variant={ subject != null ? "success" : "danger" } id='dropdown-subjects' title={"Unidades"}>
                                {
                                    chargeSubjects.map((chargeSubject, idx)=>{
                                        return <Dropdown.Item key={`group-${idx}`} onClick={()=>{setSubject(chargeSubject)}}>{chargeSubject}</Dropdown.Item>
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
                    {
                        chargetopics != null && (
                            <DropdownButton variant={ topic != null ? "success" : "danger" } id='dropdown-topics' title={"Topico"}>
                                {
                                    chargetopics.map((chargetopic, idx)=>{
                                        return <Dropdown.Item key={`group-${idx}`} onClick={()=>{setTopic(chargetopic)}}>{chargetopic}</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        )
                    }
                    {
                        topic != null && (
                            <DropdownButton variant={ difficulty != null ? "success" : "danger" } id='dropdown-Difficultys' title={"Dificultades"}>
                                {
                                    chargedifficultys.map((chargedifficulty, idx)=>{
                                        return <Dropdown.Item key={`group-${idx}`} onClick={()=>{setDifficulty(chargedifficulty)}}>{chargedifficulty}</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        )
                    }
                    {
                        difficulty != null && (
                            <DropdownButton variant={ numberOfExercises != null ? "success" : "danger" } id='dropdown-nexercises' title={"Ejercicios"}>
                                {
                                    chargeExercises.map((chargeExercise, idx)=>{
                                        return <Dropdown.Item key={`group-${idx}`} onClick={()=>{setNumberOfExercises(chargeExercise)}}>{chargeExercise}</Dropdown.Item>
                                    })
                                }
                            </DropdownButton>
                        )
                    }
                </ButtonGroup>
            </ButtonToolbar>
        </div>
    )
}