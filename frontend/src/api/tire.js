import { PATHS } from '../utils/config';
import axios from 'axios';

export class Tire {
    baseApi = PATHS.BASE_PATH;
    createTirePath = PATHS.API_ROUTES.CREATE_TIRE;
    listTiresPath = PATHS.API_ROUTES.LIST_TIRES;
    getTirePath = PATHS.API_ROUTES.GET_TIRE;
    deleteTirePath = PATHS.API_ROUTES.DELETE_TIRE;
    editTirePath = PATHS.API_ROUTES.EDIT_TIRE;

    createTire = async (formData) => {
        try {
            console.log(formData);
            const URL = `${this.baseApi}${this.createTirePath}`;
            console.log(URL);

            const params = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            };
            console.log(params);
            const response = await fetch(URL, params);
            console.log(response);
            const result = response.json();
            console.log(result);
        } catch (error) {
            console.log('Error al crear el neumático', error);
        }
    };

    getTires = async () => {
        try {
            const URL = `${this.baseApi}${this.listTiresPath}`;
            console.log(URL);
            const response = await fetch(URL);
            const tires = response.json();
            return tires;
        } catch (error) {
            console.log(error);
        }
    };

    getTireById = async (tireId) => {
        try {
            const URL = `${this.baseApi}${this.getTirePath}${tireId}`;
            console.log(URL);
            const response = await fetch(URL);
            const tire = response.json();
            return tire;
        } catch (error) {
            console.error(error);
        }
    };

    editTireById = async (tireId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editTirePath}${tireId}`;
            console.log(URL);
            const response = await axios.patch(URL, updatedData);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    deleteTireById = async (tireId) => {
        try {
            const URL = `${this.baseApi}${this.deleteTirePath}${tireId}`;
            console.log(URL);
            const params = {
                method: 'DELETE',
            };
            const response = await axios.delete(URL);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }
}