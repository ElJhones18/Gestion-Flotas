import { PATHS } from "../utils/config";
import axios from "axios";

export class Travel {
    baseApi = PATHS.BASE_PATH;
    createTravelPath = PATHS.API_ROUTES.CREATE_TRAVEL;
    listTravelsPath = PATHS.API_ROUTES.LIST_TRAVELS;
    getTravelPath = PATHS.API_ROUTES.GET_TRAVEL;
    deleteTravelPath = PATHS.API_ROUTES.DELETE_TRAVEL;
    editTravelPath = PATHS.API_ROUTES.EDIT_TRAVEL;

    createTravel = async (formData) => {
        try {
            console.log(formData);
            const URL = `${this.baseApi}${this.createTravelPath}`;
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
            console.log('Error al crear el viaje', error);
        }
    }

    getTravels = async () => {
        try {
            const URL = `${this.baseApi}${this.listTravelsPath}`;
            console.log(URL);  
            const response = await fetch(URL);
            const travels = response.json();
            return travels;
        } catch (error) {
            console.log(error);
        }
    }

    getTravelById = async (travelId) => {
        try {
            const URL = `${this.baseApi}${this.getTravelPath}${travelId}`;
            console.log(URL);
            const response = await fetch(URL);
            const travel = response.json();
            return travel;
        } catch (error) {
            console.error(error);
        }
    }

    editTravelById = async (travelId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editTravelPath}${travelId}`;
            console.log(URL);
            const response = await axios.patch(URL, updatedData);
            console.log(response.data);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    deleteTravelById = async (travelId) => {
        try {
            const URL = `${this.baseApi}${this.deleteTravelPath}${travelId}`;
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