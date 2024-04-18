import { addRoommateQuery, getRoommatesQuery, recalcularGastos } from "../queries/roommatesConsultas.js";
import path from 'path'

const __dirname = import.meta.dirname




const home = (req, res) => {

    res.sendFile(path.join(__dirname, '../views/index.html'))
}

const addRoommates = async(req, res) => {
    try {
        await addRoommateQuery()
        await recalcularGastos()
        res.send("Roommate agregado")
    } catch (error) {
        
    }
}

const getRoommates = async (req, res) => {
    try {
        const roommatesJson = await getRoommatesQuery()
        res.json(roommatesJson)
    } catch (error) {
        console.log(error)
    }
};




export {
    home,
    addRoommates,
    getRoommates
    
}