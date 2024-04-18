import { getGastosQuery, addGastoQuery } from "../queries/spentConsultas.js";


const getGastos = async (req, res) => {
    try {
        const gastosJson = await getGastosQuery()
        res.json(gastosJson)
    } catch (error) {
        console.log(error)
    }
}

const addGasto = async (req, res) => {
    try {
        const gasto = req.body
        await addGastoQuery(gasto)
        res.send("Gasto agregado")
    } catch (error) {
        console.log(error)
    }
}

export {
    getGastos,
    addGasto
}