const { Configuration, OpenAIApi } = require("openai");
// imports json data from prompt.json file
const { curriculumCheckerPrompt } = require("./prompt.json");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateInfo = async (req, res) => {
    const { curriculums } = req.body;

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "user", content: `${curriculumCheckerPrompt}${curriculums}` }],
            max_tokens: 1024,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            temperature: 1,
            n: 1,
        });
        const response = completion.data.choices[0].message.content;

        return res.status(200).json({
            success: true,
            data: response,
        });
    } catch (error) {
        console.log(error);
        if (error.response && error.response.status === 401) {
            return res.status(401).json({
                error: "Por favor ingrese un API Key válido. (https://beta.openai.com/account/api-keys)",
            });
        }
        return res.status(500).json({
            error: "Ocurrió un error al generar la información, por favor intente de nuevo.",
        });
    }
};

module.exports = { generateInfo };
