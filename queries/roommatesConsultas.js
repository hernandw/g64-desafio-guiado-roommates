import axios from "axios";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const apiurl = "https://randomuser.me/api/";

const addRoommateQuery = async (req, res) => {
  try {
    const data = await axios.get(apiurl);
    const randomuser = data.data.results[0];

    const id = uuidv4().slice(0, 8);
    const usuario = {
      id,
      nombre: `${randomuser.name.first} ${randomuser.name.last}`,
      email: randomuser.email,
      debe: 0,
      recibe: 0,
    };
    const roommatesJson = JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );
    roommatesJson.roommates.push(usuario);
    fs.writeFileSync("./data/roommates.json", JSON.stringify(roommatesJson));
  } catch (error) {
    console.log(error);
  }
};

const getRoommatesQuery = async (req, res) => {
  try {
    const roommatesJson = await JSON.parse(
      fs.readFileSync("./data/roommates.json", "utf-8")
    );

    return roommatesJson;
  } catch (error) {
    console.log(error);
  }
};

//se encarga de recalcular los gastos de compañeros de cuarto
const recalcularGastos = () => {
  //Nos traemos los datos de los roommates
  const roommatesJson = JSON.parse(
    fs.readFileSync("./data/roommates.json", "utf-8")
  );
  //Nos traemos los datos de los gastos
  const gastosJson = JSON.parse(fs.readFileSync("./data/gastos.json", "utf-8"));

  //inicializamos los saldos de cada rommate
  roommatesJson.roommates.map((roommate) => {
    roommate.debe = 0;
    roommate.recibe = 0;
    roommate.total = 0;
    return roommate;
  });

  //calculamos los gastos y lo que corresponde a cada persona de cuarto en el momento actual y lo actualizamos  en el archivo roommates.json

  /* gastosJson.gastos.map((gasto) => {
    const roommate = roommatesJson.roommates.find(
      (roommate) => roommate.id === gasto.roommate
    );
    roommate.debe += gasto.monto;
    roommate.recibe += gasto.monto;
    roommate.total += gasto.monto;
    return roommate;
  });

  fs.writeFileSync("./data/roommates.json", JSON.stringify(roommatesJson)); */

  roommatesJson.roommates.forEach((roommate) => {
    let debe = 0;
    let recibe = 0;
    let total = 0;
    gastosJson.gastos.forEach((gasto) => {
      if (gasto.roommate === roommate.id) {
        debe += gasto.monto;
      } else if (gasto.roommate !== roommate.id) {
        recibe += gasto.monto;
      }
    });
    roommate.debe = debe;
    roommate.recibe = recibe;
    fs.writeFileSync("./data/roommates.json", JSON.stringify(roommatesJson));
  });
};

export { addRoommateQuery, getRoommatesQuery, recalcularGastos };
