import { PATHS } from "../utils/config";

export class User {
    baseApi = PATHS.BASE_PATH;
    listUsersPath = PATHS.API_ROUTES.LIST_USERS;
    getUsersPath = PATHS.API_ROUTES.GET_USER;
    createUsersPath = PATHS.API_ROUTES.CREATE_USER;

    createUser = async (formData) => {
        try {
            console.log(formData.active_user);
            console.log("api", formData);
            const URL = `${this.baseApi}${this.createUsersPath}`
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
    getUsers = async () => {
        try {
            const URL = `${this.baseApi}${this.listUsersPath}`;
            console.log(URL);
            const response = await fetch(URL);
            const users = response.json();
            return users;
        } catch (error) {
            console.log(error);
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
            const URL = `${this.baseApi}${this.getUsersPath}${userId}`;
            console.log(URL);
            const params = {
                method: "PUT",
                body: JSON.stringify(updatedData), // Convert updated data to JSON string
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
            const URL = `${this.baseApi}${this.getUsersPath}${userId}`;
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