import React, { useEffect, useState } from 'react';
import NavBarAdmin from './NavBarAdmin';
import { useParams } from 'react-router-dom';
import axios from "axios";
import styles from './UpdateUserInfo.module.css';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


export default function UpdateUserInfo() {

    const { id } = useParams();
    const [name, setname] = useState(null);
    const [lastName, setLastName] = useState();
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [role, setrole] = useState();
    const [points, setPoints] = useState();
    const [clasiffication, setClasiffication] = useState();
    const [values, setValues] = useState({
        name: '',
        lastName: '',
        username: '',
        email: '',
        role: '',
        points: 0,
        clasiffication: '',
        iduser: 0,
    })
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (name == null) {
            axios.get('http://localhost:3001/userInfoAdmin', {params: {userId: id}})
            .then(res => {
                if(res.data.Status === "Success") {
                    setname(res.data.result[0].name)
                    setLastName(res.data.result[0].lastname)
                    setUserName(res.data.result[0].username)
                    setEmail(res.data.result[0].email)
                    setrole(res.data.result[0].role)
                    setPoints(res.data.result[0].points)
                    setClasiffication(res.data.result[0].classification)
                    setValues({...values, name: res.data.result[0].name, lastName: res.data.result[0].lastname, username: res.data.result[0].username, email: res.data.result[0].email, role: res.data.result[0].role, points: res.data.result[0].points, clasiffication: res.data.result[0].classification, iduser: res.data.result[0].idusers })
                } 
                else {
                    console.log("request error");
                }
            })
        }
    }, [])

    useEffect(() => {
        let clasiffication = '';
        if (values.points >= 0 && values.points <= 50) {
            clasiffication = 'Bronze';
        } else if (values.points > 50 && values.points <= 150) {
            clasiffication = 'Silver';
        } else if (values.points > 150 && values.points <= 300) {
            clasiffication = 'Gold';
        } else if (values.points > 300 && values.points <= 500) {
            clasiffication = 'Emerald';
        } else if (values.points > 500 && values.points <= 700) {
            clasiffication = "Diamond";
        } else if (values.points > 700 && values.points <= 999) {
            clasiffication = "Master";
        } else if (values.points >= 1000) {
            clasiffication = "Legend";
        }
     
        // Actualizar clasiffication solo si ha cambiado
        if (clasiffication !== values.clasiffication) {
          setValues(prevValues => ({
            ...prevValues,
            clasiffication: clasiffication,
          }));
        }
      }, [values.points]);

    const handleSubmit = () => {
        axios.put('http://localhost:3001/updateUserInfo',values, id)
        .then(res => {
            if(res.data.Status === "Success") {
                console.log("usuario actualizado con exito")
                axios.get('http://localhost:3001/userInfoAdmin', {params: {userId: id}})
                .then(res => {
                    if(res.data.Status === "Success") {
                        setname(res.data.result[0].name)
                        setLastName(res.data.result[0].lastname)
                        setUserName(res.data.result[0].username)
                        setEmail(res.data.result[0].email)
                        setrole(res.data.result[0].role)
                        setPoints(res.data.result[0].points)
                        setClasiffication(res.data.result[0].classification)
                        setValues({...values, name: res.data.result[0].name, lastName: res.data.result[0].lastname, username: res.data.result[0].username, email: res.data.result[0].email, role: res.data.result[0].role, points: res.data.result[0].points, clasiffication: res.data.result[0].classification, iduser: res.data.result[0].idusers })
                    } 
                    else {
                        console.log("request error");
                    }
                })
            } 
            else {
                console.log("request error");
            }
        })
    }

    return (
        <>
            <NavBarAdmin/>
            <div className={styles.container} style={{paddingRight: 250, paddingLeft: 250}}>
                {
                    name != null && (
                        <div className={styles.wrapper}>
                            <p>ID: {id} </p> 
                            <div style={{display: 'flex'}}> 
                                <div className={styles.div1}>
                                    <p>Nombre: {name} </p>
                                    <p>Apellidos: {lastName} </p>
                                    <p>Nombre de usuario: {userName} </p>
                                    <p>Email: {email} </p>
                                    <p>Role: {role} </p>
                                    <p>Puntos: {points} </p>
                                    <p>Clasificación: {clasiffication} </p>
                                </div>
                                <div className={styles.div2}>
                                    <Form>
                                        <Form.Group className="mb-3" controlId="user">
                                            <Form.Control onChange={e => setValues({...values, name: e.target.value})} placeholder={ values.name == "" ? setValues({...values, name: name }) : `${values.name}`}/>
                                            <Form.Control onChange={e => setValues({...values, lastName: e.target.value})} placeholder={values.lastName == "" ? setValues({...values, lastName: lastName }) : `${values.lastName}`}/>
                                            <Form.Control onChange={e => setValues({...values, username: e.target.value})} placeholder={values.username == "" ? setValues({...values, username: userName }) : `${values.username}`}/>
                                            <Form.Control onChange={e => setValues({...values, email: e.target.value})} placeholder={values.email == "" ? setValues({...values, email: email }) : `${values.email}`}/>
                                            <Form.Control onChange={e => setValues({...values, role: e.target.value})} placeholder={values.role == "" ? setValues({...values, role: role }) : `${values.role}`}/>
                                            <Form.Control type="number" placeholder={`${values.points}`}
                                                onChange={e => {
                                                    const newValue = parseInt(e.target.value, 10);
                                                    if (newValue >= 0 || e.target.value === '') { 
                                                      setValues({
                                                        ...values,
                                                        points: newValue || 0
                                                      });
                                                    }
                                                }}
                                            />
                                            <Form.Control disabled placeholder={ values.clasiffication == "" ? setValues({...values, clasiffication: clasiffication }) : `${values.clasiffication}`}/>
                                        </Form.Group>
                                    </Form>
                                </div>
                            </div>
                            <div>
                                <Button onClick={(e)=>{handleSubmit()}}>ACTUALIZAR</Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}
