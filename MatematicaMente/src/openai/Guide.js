import {openai} from './Config';

export default async function GuideRecomendations( subject, subjectmatter ) {
  
    const response = await openai.chat.completions.create({
  
      model: "gpt-3.5-turbo-0125",
      
      //En messages definimos el comportamiento de la IA frente a lo que solicita el usuario.
      messages: [
        { role: "system", content: "Eres un profesor virtual de Matematicas. Tu funcion consiste en recomendar guias de estudio. Debes responder a detalle de como llevar a cabo la sesion de estudio y enumerar los pasos. Siempre asume que el estudiante no sabe nada sobre el topico consultado. Tu respuesta al usuario debe estar en formato JSON de esta manera: { Guia de estudio: Comportamiento de las ondas y sus caracteristicas, Pasos: [] }"},
        { role: "user", content: `Necesito una guia de estudio de la unidad de ${ subject } en el tema de: ${ subjectmatter }` },
      ],
  
      max_tokens: 500,
  
    });
  
    return response.choices[0].message.content;
  
  }