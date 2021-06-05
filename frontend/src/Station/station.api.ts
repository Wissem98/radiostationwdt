import Api from "../common/api"
import { Station } from "../common/types";
const getStationsList = async () => {
  const response = await Api.get<Station[]>('/games');
  return response.data;

}
export { getStationsList as getStationsList };