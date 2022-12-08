import express from "express"
import { sendCommand } from "./denon"

const PORT = process.env.PORT ?? 8000

const app = express()

// Command reference: https://www.heimkinoraum.de/upload/files/product/IP_Protocol_AVR-Xx100.pdf

/**
 * Use for commands ending in "?" (getters) — do not pass the question mark
 *   example: /get/PW -> { response: "PWON" }
 */
app.get("/denon/get/:field", async (req, res) => {
    res.set("Access-Control-Allow-Origin", "*")
    try {
        const responseData = await sendCommand(req.params.field.toUpperCase() + "?")
        res.status(200).send(responseData)
    } catch (error) {
        res.status(500).send({ error: "exception" })
    }
})

/**
 * Use for commands not ending in (setters)
 *   example: /set/PWON -> { response: "executed PWON" }
 */
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
