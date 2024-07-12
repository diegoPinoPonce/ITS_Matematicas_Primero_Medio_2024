import React, { useEffect, useState } from 'react';
import NavBarHome from '../../components/navbarhome/NavBarHome';
import axios from "axios";
import ImagePicker from '../../components/imagepicker/ImagePicker';
import { Image, ProgressBar } from 'react-bootstrap';
import styles from './Profile.module.css';

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


export default function Profile() {

    // Informacion del Usuario para el frontend
    const [userName, setuserName] = useState()
    const [lastName, setlastName] = useState("")
    const [name, setName] = useState("");
    const [email, setemail] = useState("");
    const [classification, setclassification] = useState();
    const [textClassification, settextClassification] = useState()
    const [nextTierPoints, setnextTierPoints] = useState()
    const [prevTierPoints, setprevTierPoints] = useState()
    const [points, setpoints] = useState();
    const [profileImage, setProfileImage] = useState(null);
    const [showImagePicker, setShowImagePicker] = useState(false);

    // Imágenes predeterminadas
    const defaultImages = [ 
        defaultBoy, defaultBoy1, defaultBoy2, defaultBoy3, defaultBoy4, defaultBoy5, defaultBoy6, defaultBoy7, defaultBoy8, defaultBoy9,
        defaultGirl, defaultGirl1, defaultGirl2, defaultGirl3, defaultGirl4, defaultGirl5, defaultGirl6, defaultGirl7, defaultGirl8, defaultGirl9];

    axios.defaults.withCredentials = true;

    // Carga la Informacion del Usuario desde la Base de Datos
    useEffect(() => {
        if (name == "") {
            axios.get('http://localhost:3001/userInfo')
            .then(res => {
                if(res.data.Status === "Success") {
                    setProfileImage(res.data.result[0].profileImage)
                    setuserName(res.data.result[0].username)
                    setName(res.data.result[0].name)
                    setlastName(res.data.result[0].lastname)
                    setemail(res.data.result[0].email)
                    TierImg(res.data.result[0].classification)
                    setpoints(res.data.result[0].points)
                } 
                else {
                    setName("Sin Nombre");
                }
            })
        }
    }, [])
  
    // Cambia la Imagen predeterminada del usuario del y realiza la actualizacion a la base de datos
    const handleImageSelect = (image) => {
        setProfileImage(image);
        setShowImagePicker(false);
        axios.post('http://localhost:3001/uploadProfileImage', { img: image })
        .then(res => {
            if(res.data.Status === "Success") {
                // AQUI PODEMOS MANDAR UN RETURN PARA AVISAR AL USUARIO QUE SU INFORMACION A SIDO MODIFICADA
                console.log("Se ah guardado toda la informacion correctamente");
            } 
            else {
                console.log(res.data.Error);
            }
        })
    };
    
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
    

    return (
        <>
            <NavBarHome/>
            <div className={styles.container} style={{paddingRight: 250, paddingLeft: 250}}>
                {  
                    name && (
                        <div className={styles.wrapper}>
                            <div className={styles.div1}>
                                {profileImage && 
                                    <div className={styles.imageContainer} onClick={()=>setShowImagePicker(true)}>
                                        <Image src={profileImage} alt="Profile" className={styles.profileImg} rounded/>
                                        <div className={styles.imageOverlay}>
                                            <i className='bx bx-image-add icon' style={{fontSize: 100}}></i>
                                        </div>
                                    </div>
                                }
                                <ImagePicker show={showImagePicker} images={defaultImages} onHide={() => setShowImagePicker(false)} onImageSelect={handleImageSelect}/>
                                <strong style={{marginTop: 20, fontSize: 30}} >{userName}</strong>
                            </div>
                            <div className={styles.div2}>
                                <strong style={{fontSize: 20}}>{name} {lastName}</strong>
                                <p>{email}</p>
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
                    )
                }
            </div>
        </>
    )
}

// <img src={profileImage} alt="Perfil" style={{ width: '350px', height: '350px' }} />