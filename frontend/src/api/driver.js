import { PATHS } from "../utils/config";

export class Driver {
    baseApi = PATHS.BASE_PATH;
    listDriversPath = PATHS.API_ROUTES.LIST_DRIVERS;

    getDrivers = async () => {
        try {
            const URL = `${this.baseApi}${this.listDriversPath}`;
            console.log(URL);
            const response = await fetch(URL);
            const drivers = response.json();
            return drivers;
        } catch (error) {
            console.log(error);
        }
    }

}