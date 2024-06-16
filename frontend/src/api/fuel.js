import { PATHS } from "../utils/config";
import axios from "axios"

export class Fuel {
    baseApi = PATHS.BASE_PATH;
    createFuelPath = PATHS.API_ROUTES.CREATE_FUEL;
    listFuelsPath = PATHS.API_ROUTES.LIST_FUELS;
    getFuelPath = PATHS.API_ROUTES.GET_FUEL;
    deleteFuelPath = PATHS.API_ROUTES.DELETE_FUEL;
    editFuelPath = PATHS.API_ROUTES.EDIT_FUEL;

    createFuel = async (formData) => {
        try {
            console.log(formData);
            const URL = `${this.baseApi}${this.createFuelPath}`
            console.log(URL);

            const params = {
                method: "POST",
                body: JSON.stringify(formData)
            }
            console.log(params);
            const response = await fetch(URL, params);
            console.log(response);
            const result = response.json();
            console.log(result);
        } catch (error) {
            console.log('Error al crear el combustible', error);
        }
    }
    
    getFuels = async () => {
        try {
            const URL = `${this.baseApi}${this.listFuelsPath}`;
            console.log(URL);
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    getFuelById = async (fuelId) => {
        try {
            const URL = `${this.baseApi}${this.getFuelPath}${fuelId}`;
            console.log(URL);
            const response = await fetch(URL);
            const fuel = response.json();
            return fuel;
        } catch (error) {
            console.error(error);
        }
    }

    editFuelById = async (fuelId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editFuelPath}${fuelId}`;
            console.log(URL);
            const response = await axios.patch(URL, updatedData);
            console.log('fuel.js', response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    deleteFuelById = async (fuelId) => {
        try {
            const URL = `${this.baseApi}${this.deleteFuelPath}${fuelId}`;
            console.log(URL);
            const params = {
                method: "DELETE"
            }
            const response = await fetch(URL, params);
            const result = await response.text();
            console.log(result);
            return result;
        }
        catch (error) {
            console.error(error);
        }
    }
}