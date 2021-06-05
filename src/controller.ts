import { IncomingMessage, ServerResponse } from 'http';
import { add, getAll, getById, removeById, update } from './fileOperations';
import { getDataFromRequest,getDefaultHeaders} from './utils';

export const getStationList = async (res: ServerResponse) => {
  const stations = await getAll();
  res.writeHead(200, getDefaultHeaders());
  res.end(JSON.stringify(stations));
};

export const getStation = async (res: ServerResponse, id: string) => {
  try {
    const station = await getById(id);
    if (!station) {
      res.writeHead(404, getDefaultHeaders());
      res.end(JSON.stringify({ error: `Station with id: ${id} was not found` }));
    } else {
      res.writeHead(200, getDefaultHeaders());
      res.end(JSON.stringify(station))
    }
  } catch (e) {
    console.log("TEST")
    console.error(e)
  }
};

export const createStation = async (req: IncomingMessage, res: ServerResponse) => {
  const newStationData = await getDataFromRequest(req)
  await add(newStationData);
  res.writeHead(201, getDefaultHeaders())
  res.end(JSON.stringify(newStationData))
}

export const updateStation = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const station = await getById(id);
  if (!station) {
    res.writeHead(404, getDefaultHeaders());
    res.end(JSON.stringify({ error: `Station with id: ${id} was not found` }));
  } else {
    const {name, frequency: freq} = await getDataFromRequest(req)
    const gameDataToSave = {
      name: name || station.name,
      frequency: freq || station.frequency,
      id
    }

    await update(gameDataToSave);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(gameDataToSave));

  }
}

export const deleteStation = async (res: ServerResponse, id: string) => {
  const station = await getById(id);
  if (!station) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: `Station with id: ${id} was not found` }));
  } else {
    const stationsAfterDelete = await removeById(id);
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(stationsAfterDelete));
   }
}
