import express from 'express';
import mysql from 'mysql';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
const salt = 10;

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true
}));

app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "MySQL.its1",
    database: 'pt2db'
})

//Esta funcion nos permite registrar a los usuarios en la base de datos utilizando hash para encryptar la contraseña
app.post('/register', (req, res) => {
    const sql = "INSERT INTO users (`username`,`name`,`lastname`,`email`,`password`,`classification`,`points`) VALUES (?)";
    bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
        if(err) return res.json({Error: "Error for hashing password"});
        const values = [
            req.body.userName,
            req.body.name,
            req.body.lastName,
            req.body.email,
            hash,
            "Bronze",
            0
        ]
        db.query(sql, [values], (err, result) => {
            if(err) return console.log(err), res.json({Error: "Inserting data Error in server"})
            return res.json({Status: "Success"});
        })
    })
})

//Esta funcion nos permite revisar si el token guardado en la cookie es de un usuario autorizado
const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                req.role = decoded.role;
                next();
            }
        })
    }
}

//Aca invocamos la funcion para verificar usuarios en la ruta home
app.get('/verifyuser', verifyUser,(req, res) => {
    return res.json({Status: "Success", Role: req.role});
})

//Esta funcion nos permite iniciar sesion revisando si la bbdd tiene un mail compatible y comparando la contraseña ingresada, con la contraseña encryptada en la base de datos.
app.post('/login', (req, res) => {
    const sql = "SELECT * FROM users WHERE email = ?";
    db.query(sql, [req.body.email], (err, data) => {
        //Este if nos permite revisar si hay un error en la conexion
        if(err) return res.json({Error: "Login Error in server"});
        if(data.length > 0){ 
            //Aqui comparamos la contraseña ingresada con la que se encuentra encryptada en la base de datos
            bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
                if(err) return res.json({Error: "Password compare error"});
                if(response) {
                    const id = data[0].idusers;
                    const role = data[0].role;
                    const token = jwt.sign({"uid": id, "role": role }, "jwt-secret-key", {expiresIn: '1d'});
                    res.cookie("token", token);
                    return res.json({Status: "Success", Role: role});
                } else {
                    return res.json({Error: "Password not matched"});
                }
            })
        } else {
            return res.json({Error: "No email existed"});
        }
    })
})

// Limpiamos la cookie para deslogear.
app.get('/logout', (req, res) => {
    res.clearCookie("token");
    return res.json({Status: "Success"});
})

// Esto nos permite revisar si el servidor se encuentra funcionando
app.listen(3001, () => {
    console.log("Server running...")
})


// Obtener la Informacion del usuario
app.get('/userInfo', (req, res) => {
    const sql = "SELECT * FROM users WHERE idusers = ?";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                const uid = decoded.uid
                db.query(sql, uid, (err, result) => {
                    if(err){
                        return console.log(err), res.json({Error: "Inserting data Error in server"})
                    }
                    return res.json({Status: "Success", result});
                })
            }
        })
    }
});

// Cargar la materia del estudiante.
app.get('/topics', (req, res) => {
    const sql = "SELECT * FROM topics";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                db.query(sql, (err, result) => {
                    if(err){
                        return console.log(err), res.json({Error: "Inserting data Error in server"})
                    }
                    return res.json({Status: "Success", result});
                })
            }
        })
    }
});

// Guardar los ejercicios realizados por el estudiante
app.post('/recordexercises', (req, res) => {
    // Consultas a MYSQL. 
    const sqlScoreUserUpdate = "UPDATE users SET points = ?, classification = ? WHERE idusers = ?";
    const sqlRecordExercises = "INSERT INTO record_exercises (`uid`,`subject`,`subjectmatter`,`topics`,`difficulty`,`question`,`score`,`newscore`,`classification`,`typerecord`) VALUES (?)";
    // Modificar Puntos del usuario
    db.query(sqlScoreUserUpdate, [req.body.newscore, req.body.classification, req.body.uid], (error, result) => {
        if(error) {
            return console.log(error), res.json({Error: "Inserting data Error in server users"})
        } else {
            // Orden exacto de como tiene que recibir la informacion en la tabla record_exercises, como unica excepcion el id del ejercicio que ese se generara automaticamente al llegar la info a la tabla.
            const values = [
                req.body.uid,
                req.body.subject,
                req.body.subjectmatter,
                req.body.topics,
                req.body.difficulty,
                req.body.question,
                req.body.score,
                req.body.newscore,
                req.body.classification,
                req.body.typerecord
            ]
            // Guardar Ejercicios y Informacion de actualizacion del ususario.
            db.query(sqlRecordExercises, [values], (error, result) => {
                if(error){
                    return console.log(error), res.json({Error: "Inserting data Error in server record_exercises"})
                } else {
                    return res.json({Status: "Success"});
                }
            })
        }
    })
})

app.get('/getexercises', (req, res) => {
    const sql = "SELECT * FROM record_exercises WHERE uid = ? ORDER BY idrecord DESC";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                const uid = decoded.uid
                db.query(sql, uid, (err, result) => {
                    if(err){
                        return console.log(err), res.json({Error: "Inserting data Error in server"})
                    }
                    return res.json({Status: "Success", result});
                })
            }
        })
    }
});

app.get('/getbeststudents', (req, res) => {
    const sql = "SELECT * FROM users WHERE role = 'student' ORDER BY points DESC LIMIT 10;";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                db.query(sql, (err, result) => {
                    if(err){
                        return console.log(err), res.json({Error: "Inserting data Error in server"})
                    }
                    return res.json({Status: "Success", result});
                })
            }
        })
    }
});

app.post('/uploadProfileImage', (req, res) => {
    const sql = 'UPDATE users SET profileImage = ? WHERE idusers = ?';
    const token = req.cookies.token;
    const image = req.body.img;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                const uid = decoded.uid
                db.query(sql, [image, uid], (error, result) => {
                    if(error){
                        return console.log(error), res.json({Error: "Inserting data Error in updateImage"})
                    } else {
                        return res.json({Status: "Success"});
                    }
                })
            }
        })
    }
});

// ADMIN

app.get('/userslist', (req, res) => {
    const sql = "SELECT * FROM users WHERE role = ?";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                db.query(sql, 'student', (err, result) => {
                    if(err){
                        return console.log(err), res.json({Error: "Inserting data Error in server"})
                    }
                    return res.json({Status: "Success", result});
                })
            }
        })
    }
});

app.delete('/admindeleteuser', (req, res) => {
    const userId = req.body.id;
    const sql = `DELETE FROM users WHERE idusers = ?`;
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                if (decoded.role != 'admin') {  
                    return res.json({Error: "You are not admin"})       
                } else {              
                    db.query(sql, [userId], (err, result) => {
                        if(err){
                            return console.log(err), res.json({Error: "Delete Data User Error"})
                        }
                        return res.json({Status: "Success"});
                    })
                }
            }
        })
    }
});

app.get('/getexercisesAdmin', (req, res) => {
    const userId = req.query.userId;
    const sql = "SELECT * FROM record_exercises WHERE uid = ?";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                if (decoded.role != 'admin') {  
                    return res.json({Error: "You are not admin"})       
                } else {              
                    db.query(sql, [userId], (err, result) => {
                        if(err){
                            return console.log(err), res.json({Error: "Delete Data User Error"})
                        }
                        return res.json({Status: "Success", result});
                    })
                }
            }
        })
    }
});

app.put('/updateUserInfo', (req,res) => {
    // const { firstName, lastName, userName, role, points, classification, email,  iduser } = req.body;
    const firstName = req.body.name;
    const lastName = req.body.lastName;
    const userName = req.body.username;
    const role = req.body.role;
    const points = req.body.points;
    const classification = req.body.clasiffication;
    const email = req.body.email;
    const iduser = req.body.iduser;
    const updateSQL = "UPDATE users SET name = ?, lastname = ?, username = ?, role = ?, points = ?, classification = ?, email = ? WHERE idusers = ?";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"});
            } else {
                if (decoded.role != 'admin') {  
                    return res.json({Error: "You are not admin"});
                } else {
                    db.query(updateSQL, [ firstName, lastName, userName, role, points, classification, email, iduser ], (err, result) => {
                        if(err){
                            return console.log(err), res.json({Error: "Delete Data User Error"});
                        }
                        return res.json({Status: "Success" });
                    })
                }
            }
        })
    }
})

app.get('/userInfoAdmin', (req, res) => {
    const userId = req.query.userId;
    const sql = "SELECT * FROM users WHERE idusers = ?";
    const token = req.cookies.token;
    if(!token){
        return res.json({Error: "No estas autorizado"});
    } else {
        jwt.verify(token, "jwt-secret-key", (err, decoded) => {
            if(err) {
                return res.json({Error: "Token is not okay"})
            } else {
                if (decoded.role != 'admin') {  
                    return res.json({Error: "You are not admin"})       
                } else {              
                    db.query(sql, [userId], (err, result) => {
                        if(err){
                            return console.log(err), res.json({Error: "Delete Data User Error"})
                        }
                        return res.json({Status: "Success", result});
                    })
                }
            }
        })
    }
});

//DELETE FROM nombre_de_la_tabla WHERE id = x;

// probar Exito res.status(200).send("Puntos actualizados y ejercicio registrado exitosamente.");
// Probar Error res.status(500).send("Error al registrar el ejercicio.");