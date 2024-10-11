import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
    try {
        
        console.log("OPENAI_API_KEY =",process.env.OPENAI_API_KEY);
        console.log("Value of text ");
        const response = await openai.createEmbedding({
            model: "text-embedding-ada-002",
            input: text.replace(/\n/g, " "),
        });
        const result = await response.json();
        console.log(result)
        return result.data[0].embedding as number[];
    } catch (error: any) {
        if (error.response) {
            // If the error has a response (from the OpenAI API)
            console.log("Error Response: ", error.response.status, error.response.data);
        } else {
            console.log("Error Details: ", error.message);
        }
        throw error;
    }
}
