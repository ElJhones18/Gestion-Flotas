import { PATHS } from "../utils/config";

export class User {
    baseApi = PATHS.BASE_PATH;
    createUsersPath = PATHS.API_ROUTES.CREATE_USER;

    createUser = async (formData) => {
        try {
            console.log("api", formData);
            const URL = `${baseApi}${createUsersPath}`
            console.log(URL);

            const formData = new FormData();
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
    getUser = async () => {
        try {

        } catch (error) {

        }
    }
    getUserById = async () => {
        try {

        } catch (error) {

        }
    }
    getUserByIdAndUpdate = async () => {
        try {

        } catch (error) {

        }
    }
    getUserByIdAndDelete = async () => {
        try {

        } catch (error) {

        }
    }
}