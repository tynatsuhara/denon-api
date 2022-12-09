import express from "express"
import { sendCommand } from "./denon"

const PORT = process.env.PORT ?? 8000

const app = express()

app.get("/denon/get/:field", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    try {
        const responseData = await sendCommand(req.params.field.toUpperCase() + "?")
        res.status(200).send(responseData)
    } catch (error) {
        res.status(500).send({ error: "exception" })
    }
})

app.get("/denon/set/:command", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    try {
        const responseData = await sendCommand(req.params.command.toUpperCase())
        res.status(200).send(responseData)
    } catch (error) {
        res.status(500).send({ error: "exception" })
    }
})

app.listen(PORT)
console.log(`listening on port ${PORT}`)
