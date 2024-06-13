import { PATHS } from "../utils/config";
import axios from "axios"

export class Truck {
    baseApi = PATHS.BASE_PATH;
    createTruckPath = PATHS.API_ROUTES.CREATE_TRUCK;
    listTrucksPath = PATHS.API_ROUTES.LIST_TRUCKS;
    getTruckPath = PATHS.API_ROUTES.GET_TRUCK;
    deleteTruckPath = PATHS.API_ROUTES.DELETE_TRUCK;
    editTruckPath = PATHS.API_ROUTES.EDIT_TRUCK;

    createTruck = async (formData) => {
        try {
            console.log(formData);
            const URL = `${this.baseApi}${this.createTruckPath}`
            console.log(URL);

            const params = {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            }
            console.log(params);
            const response = await fetch(URL, params);
            console.log(response);
            const result = response.json();
            console.log(result);
        } catch (error) {
            console.log('Error al crear el camión', error);
        }
    }
    
    getTrucks =     async () => {
        try {
            const URL = `${this.baseApi}${this.listTrucksPath}`;
            console.log(URL);
            const response = await fetch(URL);
            const trucks = response.json();
            return trucks;
        } catch (error) {
            console.log(error);
        }
    }

    getTruckById = async (truckId) => {
        try {
            const URL = `${this.baseApi}${this.getTruckPath}${truckId}`;
            console.log(URL);
            const response = await fetch(URL);
            const truck = response.json();
            return truck;
        } catch (error) {
            console.error(error);
        }
    }

    editTruckById = async (truckId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editTruckPath}${truckId}`;
            console.log(URL);
            // const params = {
            //     method: "PATCH",
            //     body: updatedData
            // }
            const response = await axios.patch(URL,updatedData)
            console.log('Truck.js', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    deleteTruckById = async (truckId) => {
        try {
            const URL = `${this.baseApi}${this.deleteTruckPath}${truckId}`;
            console.log(URL);
            const params = {
                method: "DELETE"
            }
            const response = await fetch(URL, params);
            const message = response.text();
            return message;
        } catch (error) {
            console.error(error);
        }
    }
}