import React, { useEffect, useState } from 'react';
import NavBarHome from '../../components/navbarhome/NavBarHome';
import { Image, ProgressBar, Table } from 'react-bootstrap';
import axios from "axios";
import styles from './BestStudents.module.css';

// Imagenes Predeterminadas Hombres
import defaultBoy from '../../images/Avatars/boy.jpg';
import defaultBoy1 from '../../images/Avatars/boy1.jpg';
import defaultBoy2 from '../../images/Avatars/boy2.jpg';
import defaultBoy3 from '../../images/Avatars/boy3.jpg';
import defaultBoy4 from '../../images/Avatars/boy4.jpg';
import defaultBoy5 from '../../images/Avatars/boy5.jpg';
import defaultBoy6 from '../../images/Avatars/boy6.jpg';
import defaultBoy7 from '../../images/Avatars/boy7.jpg';
import defaultBoy8 from '../../images/Avatars/boy8.jpg';
import defaultBoy9 from '../../images/Avatars/boy9.jpg';

// Imagenes Predeterminadas mujeres
import defaultGirl from '../../images/Avatars/girl.jpg';
import defaultGirl1 from '../../images/Avatars/girl1.jpg';
import defaultGirl2 from '../../images/Avatars/girl2.jpg';
import defaultGirl3 from '../../images/Avatars/girl3.jpg';
import defaultGirl4 from '../../images/Avatars/girl4.jpg';
import defaultGirl5 from '../../images/Avatars/girl5.jpg';
import defaultGirl6 from '../../images/Avatars/girl6.jpg';
import defaultGirl7 from '../../images/Avatars/girl7.jpg';
import defaultGirl8 from '../../images/Avatars/girl8.jpg';
import defaultGirl9 from '../../images/Avatars/girl9.jpg';

// Imagenes de Tiers
import tierBronze from '../../images/Bronze.png';
import tierSilver from '../../images/Silver.png';
import tierGold from '../../images/Gold.png';
import tierEmerald from '../../images/Emerald.png';
import tierDiamond from '../../images/Diamond.png';
import tierMaster from '../../images/Master.png';
import tierLegend from '../../images/Legend.png';

export default function BestStudents() {

    // los mejores 50 estudiantes basados en sus puntos
    const [bestusers, setBestusers] = useState(null)

    // El mejor estudiante
    const [userName, setuserName] = useState()
    const [lastName, setlastName] = useState("")
    const [name, setName] = useState("");
    const [classification, setclassification] = useState();
    const [profileImage, setProfileImage] = useState(null);
    const [points, setpoints] = useState();
    const [textClassification, settextClassification] = useState()
    const [nextTierPoints, setnextTierPoints] = useState()
    const [prevTierPoints, setprevTierPoints] = useState()

    const TierImg = ( tier ) => {
        switch (tier) {
            case "Bronze":
                setclassification(tierBronze)
                settextClassification("Bronce")
                setprevTierPoints(0)
                setnextTierPoints(50)
                break;
            case "Silver":
                setclassification(tierSilver)
                settextClassification("Plata")
                setprevTierPoints(50)
                setnextTierPoints(150)
                break;
            case "Gold":
                setclassification(tierGold)
                settextClassification("Oro")
                setprevTierPoints(150)
                setnextTierPoints(300)
                break;
            case "Emerald":
                setclassification(tierEmerald)
                settextClassification("Esmeralda")
                setprevTierPoints(300)
                setnextTierPoints(500)
                break;
            case "Diamond":
                setclassification(tierDiamond)
                settextClassification("Diamante")
                setprevTierPoints(500)
                setnextTierPoints(700)
                break;
            case "Master":
                setclassification(tierMaster)
                settextClassification("Maestro")
                setprevTierPoints(700)
                setnextTierPoints(1000)
                break;
            case "Legend":
                setclassification(tierLegend)
                settextClassification("Leyenda")
                setprevTierPoints(1000)
                setnextTierPoints(2000)
                break;
            default:
                console.log("Tier no Encontrado");
                break;
        }
    }

    const tierUserText = ( Tier ) => {

        switch (Tier) {
            case "Bronze":
                return "Bronce"
            case "Silver":
                return "Plata"
            case "Gold":
                return "Oro"
            case "Emerald":
                return "Esmeralda"
            case "Diamond":
                return "Diamante"
            case "Master":
                return "Maestro"
            case "Legend":
                return "Leyenda"
            default:
                console.log("Tier no Encontrado");
                break;
        }

    }

    axios.defaults.withCredentials = true;

    useEffect(() => {
        if (bestusers == null) {
            axios.get('http://localhost:3001/getbeststudents')
            .then(res => {
                if(res.data.Status === "Success") {
                    setBestusers(res.data.result);
                    setProfileImage(res.data.result[0].profileImage)
                    setuserName(res.data.result[0].username)
                    setName(res.data.result[0].name)
                    setlastName(res.data.result[0].lastname)
                    TierImg(res.data.result[0].classification)
                    setpoints(res.data.result[0].points)
                } 
                else {
                    console.log("ocurrio un error al recibir la información");
                }
            })
        }
    }, [])
    
    return (
        <>
            <NavBarHome/>
            {
                bestusers != null && (
                    <div style={{paddingRight: 250, paddingLeft: 250, minHeight: 91, paddingTop: 20}}>
                        <div className={styles.wrapper}>
                            <div className={styles.div1}>
                                <i className='bx bx-crown' style={{ marginBottom: 10, fontSize: 30, color: "#f2f2f2"}} ></i>
                                {profileImage && 
                                    <Image src={profileImage} alt="Profile" className={styles.profileImg} rounded/>
                                }
                                <strong style={{marginTop: 10, fontSize: 30, color: '#f2f2f2'}} >{userName}</strong>
                            </div>
                            <div className={styles.div2}>
                                {classification &&
                                    <div className={styles.imagetext}>
                                        <Image className={styles.tier} src={classification} alt="Tier" roundedCircle />
                                        <strong style={{fontSize: 25}}>{textClassification}</strong> 
                                    </div>
                                }
                                <div className={styles.progresscontainer}>
                                    <div className={styles.progresstext}>{prevTierPoints}</div>
                                    <div className={styles.progressbarwrapper}>
                                        <ProgressBar className={styles.customProgress} min={prevTierPoints} now={points} max={nextTierPoints} label={`${points}`} animated />
                                    </div>
                                    <div className={styles.progresstext}>{nextTierPoints}</div>
                                </div>
                            </div>
                        </div>
                        <p style={{fontSize: 30, textAlign: 'center', marginTop: 20}}>Tabla de Posiciones</p>
                        <Table className={styles.customTable} bordered>
                            <thead>
                                <tr>
                                    <th>Posición</th>
                                    <th>Nombre de Usuario</th>
                                    <th>Clasificación</th>
                                    <th>Puntos</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bestusers.slice(1).map((user, index) => (
                                    <tr key={user.idusers}>
                                        <td>{index + 2}</td>
                                        <td>{user.username}</td>
                                        <td>
                                            {
                                                tierUserText(user.classification)
                                            }
                                        </td>
                                        <td>{user.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                )
            }
        </>
    )
}