import { Socket } from "net"

const DENON_IP = process.env.ADDRESS!
const COMMAND_TIMEOUT = 500

type DenonResult = { error?: string; response?: string; status: number }

export const sendCommand = async (command: string) => {
    const socket = new Socket({ allowHalfOpen: true })
    socket.setTimeout(250)
    socket.setEncoding("utf8")

    await new Promise<void>((resolve) => {
        socket.connect(23, DENON_IP, () => resolve())
    })

    const result = new Promise<DenonResult>((resolve) => {
        socket.write(command + "\r")
        if (!command.endsWith("?")) {
            resolve({ response: `executed ${command}`, status: 200 })
        }
        socket.on("data", (buffer) => {
            const response = buffer.toString().trim()
            console.log(`${command} -> ${response}`)
            socket.destroy()
            //this data is a Buffer object
            resolve({ response, status: 200 })
        })
        socket.on("error", () => {
            socket.destroy()
            resolve({ error: "error response from receiver", status: 400 })
        })
    })

    const timeout = new Promise<DenonResult>((resolve) =>
        setTimeout(() => resolve({ error: "timeout", status: 408 }), COMMAND_TIMEOUT)
    )

    return Promise.race([result, timeout])
}
