const fetch = require("node-fetch");

exports.handler = async function (event) {
  try {
    const { message } = JSON.parse(event.body);

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

    // Validar si OpenAI respondió correctamente
    if (data.choices && data.choices.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: data.choices[0].message.content })
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ reply: "La IA no devolvió una respuesta." })
      };
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "Error en el servidor: " + error.message })
    };
  }
};
