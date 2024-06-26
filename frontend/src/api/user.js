import { PATHS } from "../utils/config";
import axios from "axios";

export class User {
    baseApi = PATHS.BASE_PATH;
    createUsersPath = PATHS.API_ROUTES.CREATE_USER;
    listUsersPath = PATHS.API_ROUTES.LIST_USERS;
    getUsersPath = PATHS.API_ROUTES.GET_USER;
    deleteUserPath = PATHS.API_ROUTES.DELETE_USER;
    editUserPath = PATHS.API_ROUTES.EDIT_USER;

    createUser = async (formData) => {
        try {
            console.log(formData.active_user);
            console.log("api", formData);
            const URL = `${this.baseApi}${this.createUsersPath}`
            console.log(URL);
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
            console.log(error);
        }
    }

    getUsers = async () => {
        try {
            const URL = `${this.baseApi}${this.listUsersPath}`;
            console.log(URL);
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    getUserById = async (userId) => {
        try {
            const URL = `${this.baseApi}${this.getUsersPath}${userId}`;
            console.log(URL);
            const response = await fetch(URL);
            const user = response.json();
            return user;
        } catch (error) {
            console.error(error);
        }
    };

    editUserById = async (userId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editUserPath}${userId}`;
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

    deleteUserById = async (userId) => {
        try {
            const URL = `${this.baseApi}${this.deleteUserPath}${userId}`;
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