import {readFile,  writeFile, appendFile} from 'fs/promises'

export interface Station {
  name: string;
  frequency: number;
  id:  string;
}

export const getAll = async(): Promise<Station[]> => {
  const buffer = await readFile('./stationList.json', {
    encoding: 'utf-8'
  })

  return JSON.parse(buffer)
}

export const getById  =  async(id:string):Promise<Station> =>{
  const stationsList =  await getAll();
  const station = stationsList.find(game => game.id === id);
  if(station){
    return  station
  }
}  

export const add = async (station: Station) => {
  const stationsList =  await getAll();

  await writeFile('./stationList.json', JSON.stringify([...stationsList, station]))
}

export const removeById =  async (id: string) => {
  const stationsList = await getAll();
  const stations = stationsList.filter(station  => station.id !== id);
  await writeFile('./stationList.json', JSON.stringify(stations))
  return stations
}

export const update = async(station: Partial<Station>) => {
  if(!station.id) {
    throw new Error('You need to pass an id!')
  }
  const stationToUpdate = await getById(station.id);
  const updatedStation =  {...stationToUpdate, ...station}
  await  removeById(station.id);
  await add(updatedStation);
}