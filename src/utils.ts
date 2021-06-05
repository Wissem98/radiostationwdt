import { IncomingMessage } from "http";
import { Station } from './fileOperations';

export const getDataFromRequest = (req: IncomingMessage):Promise<Station> => new Promise((resolve, reject) => {

  try {
    let body = '';

    req.on('data', (dataPart) => {
      body += dataPart.toString()
    })

    req.on('end', () => {
      resolve(JSON.parse(body) as Station)
    })


  } catch (err) {
    reject(err)
  }
})
export const getDefaultHeaders = () => (
  
  { 'Content-Type': 'application/json' ,'Access-Control-Allow-Origin' :  '*'}

)