import express, { Request, Response } from "express";
import Sender from "./sender";

const sender = new Sender();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/status', (req: Request, res: Response) => {
    // ...
})

app.post('/send', async (req: Request, res: Response) => {
    const { number, message } = req.body

    // "5511941465351@c.us"
    try {
        // validar e transformar o nmro whatsapp
        await sender.sendText(number, message)
        
        return res.status(200).json()
    } catch (error) {
        console.error(error)
        res.status(500).json({ status: "error", message: error })
    }  
})


// http://localhost:5000/send usando o POST
app.listen(5000, () => {
    console.log("server started")
})