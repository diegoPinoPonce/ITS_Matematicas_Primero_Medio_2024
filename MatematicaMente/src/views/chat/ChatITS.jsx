import React, { useState, useEffect, useRef } from 'react';
import NavBarHome from '../../components/navbarhome/NavBarHome';
import Chat from '../../openai/Chat';
import { Button, Form, Image } from 'react-bootstrap';
import styles from './ChatITS.module.css'

import TeacherImg from '../../images/Avatars/teacher.jpg';


export default function ChatITS() {
    const msgEnd = useRef(null);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState([{
        text: "Hola, soy tu profesor virtual de Matematicas. Ingresa cualquier duda que tengas al respecto sobre esta materia",
        isBot: true,
    }]);

    useEffect(() => {
        if (msgEnd.current) {
            msgEnd.current.scrollIntoView();
        }
    }, [messages]);

    const handleSend = async () => {
        const text = input;
        setInput('');
        const newMessages = [...messages, { text, isBot: false }];
        setMessages(newMessages);
        const res = await Chat(newMessages);
        setMessages([...newMessages, { text: res, isBot: true }]);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault(); // Evita agregar una nueva línea en el textarea
          handleSend();
        }
    };

    return (
        <>
            <NavBarHome />
            <div className={styles.container} style={{ paddingRight: 250, paddingLeft: 250, paddingTop: 20 }}>
                <div className={styles.aichatContainer}>
                    <div className={styles.profileContainer}>
                        <Image src={TeacherImg} alt="Profile" className={styles.profileImg} roundedCircle />
                        <div>
                            <div className={styles.profileName}>Profesor Virtual</div>
                            <div className={styles.profileStatus}><strong>En Línea</strong></div>
                        </div>
                    </div>
                    <div className={styles.chatboxContainer}>
                        {messages.map((message, i) =>
                        <div key={i} className={message.isBot ? styles.botResponse : styles.chat}>
                            {message.text}
                        </div>
                        )}
                        <div ref={msgEnd}/>
                    </div>
                    <div className={styles.containerInput}>
                        <textarea
                            type="text"
                            placeholder="Por favor ingrese una pregunta..."
                            value={input}
                            className={styles.input}
                            onChange={(e) => { setInput(e.target.value) }}
                            onKeyDown={handleKeyDown}
                        />
                        <Button type="submit" onClick={handleSend} className={styles.btn}>
                            <i className='bx bx-send bx-tada-hover' style={{fontSize:50}}></i>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
