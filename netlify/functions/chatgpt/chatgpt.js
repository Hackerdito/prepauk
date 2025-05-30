const fetch = require("node-fetch");

exports.handler = async function(event) {
  try {
    const { message } = JSON.parse(event.body);
    console.log("Mensaje recibido:", message); // ✅ Para ver qué envió el usuario

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    console.log("Respuesta de OpenAI:", data); // ✅ Para ver qué respondió la API

    if (data.choices && data.choices[0]) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: "La IA no devolvió una respuesta." })
      };
    }

  } catch (error) {
    console.error("Error en la función:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error en el servidor: " + error.message })
    };
  }
};
