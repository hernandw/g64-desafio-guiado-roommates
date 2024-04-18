import { getGastosQuery, addGastoQuery, deleteGastoQuery, editGastoQuery } from "../queries/spentConsultas.js";
import { recalcularDeudas } from "../queries/roommatesConsultas.js";


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
        recalcularDeudas();
        res.send("Gasto agregado")
    } catch (error) {
        console.log(error)
    }
}

const deleteGasto = async (req, res) => {
    try {
        const id = req.query.id
        
        await deleteGastoQuery(id)
        recalcularDeudas()
        res.send("Gasto eliminado")
    } catch (error) {
        console.log(error)
    }
}

const editGasto = async (req, res) => {
    try {
        const id = req.query.id
        const gasto = req.body
        await recalcularDeudas();
        await editGastoQuery(id, gasto)
        
        res.send("Gasto editado")
    } catch (error) {
        console.log(error)
    }
}

export {
    getGastos,
    addGasto,
    deleteGasto,
    editGasto
}