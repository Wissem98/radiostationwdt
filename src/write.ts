import { writeFile } from 'fs/promises';

export const write = async (stationTitle: string) => {
  await writeFile('./list.txt', stationTitle)
}