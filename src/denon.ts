import { Socket } from "net"

const DENON_IP = process.env.ADDRESS!

type DenonResult = { error?: string; response?: string }

export const sendCommand = async (command: string) => {
    const socket = new Socket({ allowHalfOpen: true })
    socket.setTimeout(250)
    socket.setEncoding("utf8")

    await new Promise<void>((resolve) => {
        socket.connect(23, DENON_IP, () => resolve())
    })

    const result = new Promise<DenonResult>((resolve, reject) => {
        socket.write(command + "\r")
        if (!command.endsWith("?")) {
            resolve({ response: `executed ${command}` })
        }
        socket.on("data", (buffer) => {
            const response = buffer.toString().trim()
            console.log(`${command} -> ${response}`)
            socket.destroy()
            //this data is a Buffer object
            resolve({ response })
        })
        socket.on("error", () => {
            socket.destroy()
            reject({ error: true })
        })
    })

    const timeout = new Promise<DenonResult>((resolve) =>
        setTimeout(() => resolve({ error: "timeout" }), 500)
    )

    return Promise.race([result, timeout])
}
