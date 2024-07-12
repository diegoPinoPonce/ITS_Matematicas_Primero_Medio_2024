import {openai} from './Config';

export default async function Chat(messages) {
  const formattedMessages = messages.map(message => ({
    role: message.isBot ? "assistant" : "user",
    content: message.text
  }));

  const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-0125",
      messages: [
          { role: "system", content: "Eres un profesor virtual de Matemáticas. Solo respondes dudas sobre Matemáticas. Si un estudiante te consulta algo fuera de Matemáticas, le indicas que Solo eres un profesor de Matemáticas." },
          ...formattedMessages
      ],
      max_tokens: 500,
  });

  return response.choices[0].message.content;
}