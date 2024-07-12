import React, { useEffect, useState } from 'react'
import NavBarAdmin from './NavBarAdmin'
import { Alert, Button, Table } from 'react-bootstrap'
import axios from "axios";
import styles from './HomeAdmin.module.css'
import { useNavigate } from 'react-router-dom';

export default function HomeAdmin() {

    const [users, setusers] = useState(null)
    const navigate = useNavigate();
    
    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (users == null) {
            axios.get('http://localhost:3001/userslist')
            .then(res => {
                if(res.data.Status === "Success") {
                    setusers(res.data.result)
                } 
                else {
                    console.log("error frontend")
                }
            })
        }
    }, [users])

    const deleteUser = (uid) => {
        axios.delete('http://localhost:3001/admindeleteuser', { data: { id: uid } })
        .then(res => {
            if(res.data.Status === "Success") {
                console.log("Usuario Eliminado Con Exito")
                setusers(null)
            } 
            else {
                console.log("Ocurrio Un Error al Eliminar Al Usuario")
            }
        })
    }

    const goToUserHistory = (id) => {
        navigate(`/historystudents/${id}`);
    };

    const goToUpdateUserInfo = (id) => {
        navigate(`/updateUserInfo/${id}`);
    };

    return (
        <>
            <NavBarAdmin/>
            <div  className={styles.container} style={{paddingRight: 250, paddingLeft: 250}}>
                {
                    users && (
                        <div className={`table-responsive ${styles.userTable}`}>
                            <Table className={styles.customTable} striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nombre</th>
                                        <th>Apellidos</th>
                                        <th>Nombre de Usuario</th>
                                        <th>Correo Electrónico</th>
                                        <th>Clasificación</th>
                                        <th>Puntos</th>
                                        <th>Rol</th>
                                        <th>Eliminar</th>
                                        <th>Examenes</th>
                                        <th>Modificar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.map((user) => (
                                        <tr key={user.idusers}>
                                            <td>{user.idusers}</td>
                                            <td>{user.name}</td>
                                            <td>{user.lastname}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.classification}</td>
                                            <td>{user.points}</td>
                                            <td>{user.role}</td>
                                            <td>
                                                {<i className='bx bx-trash bx-tada-hover' style={{color: "red", fontSize: 25}} onClick={()=>{deleteUser(user.idusers)}} ></i>}
                                            </td>
                                            <td>
                                                {<i className='bx bxs-book bx-tada-hover' style={{color: "green", fontSize: 25}} onClick={()=>{goToUserHistory(user.idusers)}} ></i>}
                                            </td>
                                            <td>
                                                {<i className='bx bx-edit bx-tada-hover' style={{color: "#0049E5", fontSize: 25}} onClick={()=>{goToUpdateUserInfo(user.idusers)}}></i>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    )
                }
            </div>
        </>
    )
}

// 