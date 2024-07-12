import OpenAI from 'openai'

//Configuracion y inicializacion a la API de OpenAI.
export const openai = new OpenAI({
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

//Se necesita crear un archivo .env.local y agregarle la key de OpenAI para el correcto funcionamiento
//Si Utilizas REACT + VITE, Recuerda agregarle VITE_ a las variables del .env.local para mayor seguridad.