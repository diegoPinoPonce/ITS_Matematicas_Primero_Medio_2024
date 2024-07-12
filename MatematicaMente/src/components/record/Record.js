import axios from "axios";

export default function Record(subject, subjectmatter, topic, difficulty, question, addscore, typerecord) {

    // Sondeo de la informacion que llega del ejercicio.
    //console.log("subject : ", subject, "\nsubjectmatter : ", subjectmatter, "\ntopic :", topic, "\ndifficulty :", difficulty, "\nquestionJSON : ", question, "\nNewscore : ", newscore, "\ntyperecord :", typerecord )

    // Transformamos el JSON de objeto a string.
    const JSONMysql = JSON.stringify(question);

    // Buscamos la informacion actual del usuario. 
    if (subject !== null && subjectmatter !== null && topic !== null && difficulty !== null && question !== null && addscore != null && typerecord != null ) {
        axios.get('http://localhost:3001/userInfo')
        .then(res => {
            // Si no llega la informacion del usuario correctamente continuamos.
            if (res.data.Status === "Success") {                
                
                let newscore = 0;
                let classification = "Bronce";
                if ((res.data.result[0].points + addscore ) < 0 ) {
                    // Esto es un reseteo de los puntos del usuario para que no sean negativos y el minimo siempre sea 0.
                    newscore = 0;
                } else {
                    // Sumamos los puntos que tiene el usuario en este momento con los puntos que gano.
                    newscore = res.data.result[0].points + addscore;
                }

                // Actualizacion de Division
                if (newscore >= 0 && newscore <= 50) {
                    classification = "Bronze";
                } else if (newscore > 50 && newscore <= 150) {
                    classification = "Silver";
                } else if (newscore > 150 && newscore <= 300) {
                    classification = "Gold";
                } else if (newscore > 300 && newscore <= 500) {
                    classification = "Emerald";
                } else if (newscore > 500 && newscore <= 700) {
                    classification = "Diamond";
                } else if (newscore > 700 && newscore <= 999) {
                    classification = "Master";
                } else if (newscore >= 1000) {
                    classification = "Legend";
                }
                
                // Ya con todo seteado mandamos la informacion al SERVER para que le modifique los puntos al usuario y registrar el ejercicio con sus campos correspondientes.
                axios.post('http://localhost:3001/recordexercises', { uid: res.data.result[0].idusers, subject: subject, subjectmatter: subjectmatter, topics: topic, difficulty: difficulty, question: JSONMysql, score: res.data.result[0].points, newscore: newscore, classification: classification, typerecord: typerecord })
                .then(res => {
                    if(res.data.Status === "Success") {
                        // AQUI PODEMOS MANDAR UN RETURN PARA AVISAR AL USUARIO QUE SU INFORMACION A SIDO MODIFICADA
                        console.log("Se ah guardado toda la informacion correctamente");
                    } 
                    else {
                        console.log(res.data.Error);
                    }
                })
            } else {
                console.log(res.data.Error);
            }
        })
    };

    return 
}