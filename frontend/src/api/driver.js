import { PATHS } from "../utils/config";

export class Driver {
    baseApi = PATHS.BASE_PATH;
    createDriversPath = PATHS.API_ROUTES.CREATE_DRIVER;
    listDriversPath = PATHS.API_ROUTES.LIST_DRIVERS;
    getDriversPath = PATHS.API_ROUTES.GET_DRIVER;
    deleteDriverPath = PATHS.API_ROUTES.DELETE_DRIVER;
    editDriverPath = PATHS.API_ROUTES.EDIT_DRIVER;

    createDriver = async (formData) => {
        try {
            console.log(formData.active_driver);
            console.log("api", formData);
            const URL = `${this.baseApi}${this.createDriversPath}`
            console.log(URL);

            // const formData = new FormData();
            const params = {
                method: "POST",
                body: formData
            }
            console.log(params);
            const response = await fetch(URL, params);
            console.log(response);
            const result = response.json();
            console.log(result);
        } catch (error) {

        }
    }

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

    getDriverById = async (driverId) => {
        try {
            const URL = `${this.baseApi}${this.getDriversPath}${driverId}`;
            console.log(URL);
            const response = await fetch(URL);
            const driver = response.json();
            return driver;
        } catch (error) {
            console.error(error);
        }
    };

    editDriverById = async (driverId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editDriverPath}${driverId}`;
            console.log(URL);
            const params = {
                method: "PATCH",
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                // body: JSON.stringify(updatedData), // Convert updated data to JSON string
                body: updatedData, // Convert updated data to JSON string
            }
            const response = await fetch(URL, params);
            const result = await response.json();
            console.log(result);
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    deleteDriverById = async (driverId) => {
        try {
            const URL = `${this.baseApi}${this.deleteDriverPath}${driverId}`;
            console.log(URL);
            const params = {
                method: "DELETE",
            }
            const response = await fetch(URL, params);
            const message = await response.text(); // Convert response to text
            console.log(message);
            return message;
        } catch (error) {
            console.error(error);
        }
    }

}