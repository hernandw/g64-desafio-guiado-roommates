import fs from "fs"
import { v4 as uuidv4 } from "uuid";



const getGastosQuery = async () => {
    const gastosJson = JSON.parse(
        fs.readFileSync("./data/gastos.json", "utf-8")
    );
    return gastosJson;
}

const addGastoQuery = async (gasto) => {
    try {
        
        gasto.fecha = new Date();
        gasto.id = uuidv4().slice(0, 8);
        const gastosJson = JSON.parse(
            fs.readFileSync("./data/gastos.json", "utf-8")
        )
        gastosJson.gastos.push(gasto)
        fs.writeFileSync("./data/gastos.json", JSON.stringify(gastosJson))

    } catch (error) {
        console.log(error)
    }
}

export {
    getGastosQuery,
    addGastoQuery
}