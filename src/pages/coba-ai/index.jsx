import { useState } from "react"
import { useAuth } from "../../hooks/AuthContext"
import { GoogleGenAI } from "@google/genai"

function CobaAI() {
    const { geminiApiKey } = useAuth()
    const [isLoading, setIsLoading] = useState(false)
    const [tanya, setTanya] = useState('')
    const [answer, setAnswer] = useState('')

    const ai = new GoogleGenAI({apiKey: geminiApiKey})
    // console.log(geminiApiKey)

    const tanyaAI = async() => {
        try {
            setIsLoading(true)
            const response = ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: tanya
            })
            setAnswer((await response).text)
        } catch (error) {
            setAnswer('Waduh ada error nih')   
        } finally {
            setIsLoading(false)
        }

    }

    return (
        <div>
            <h1>Halo</h1>
            <textarea 
                onChange={(e) => setTanya(e.target.value)}
            >
            </textarea>
            <button onClick={tanyaAI} className="cursor-pointer">tanya</button>
            <p>
               { isLoading ? 'bentar lagi mikir..' : answer}
            </p>
        </div>
    )
}

export default CobaAI