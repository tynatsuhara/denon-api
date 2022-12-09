import express, { Response } from "express"
import { sendCommand } from "./denon"

const PORT = process.env.PORT ?? 8000

const app = express()

const commandHandler = async (cmd: string, res: Response) => {
    res.set("Access-Control-Allow-Origin", "*")
    try {
        const response = await sendCommand(cmd.toUpperCase())
        res.status(response.status).send(response)
    } catch (error) {
        res.status(500).send({ error: "exception" })
    }
}

app.get("/denon/get/:field", async (req, res) => commandHandler(req.params.field + "?", res))
app.get("/denon/set/:command", async (req, res) => commandHandler(req.params.command, res))

app.listen(PORT)
console.log(`listening on port ${PORT}`)
