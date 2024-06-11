import { PATHS } from "../utils/config";
import axios from "axios"
export class Task {
    baseApi = PATHS.BASE_PATH;
    createTaskPath = PATHS.API_ROUTES.CREATE_TASK;
    listTasksPath = PATHS.API_ROUTES.LIST_TASKS;
    getTaskPath = PATHS.API_ROUTES.GET_TASK;
    getTaskByUserPath = PATHS.API_ROUTES.GET_TASK_BY_USER;
    deleteTaskPath = PATHS.API_ROUTES.DELETE_TASK;
    editTaskPath = PATHS.API_ROUTES.EDIT_TASK;

    createTask = async (data) => {
        try {
            const URL = `${this.baseApi}${this.createTaskPath}`
            // console.log(`ESTA ES LA URL ${URL}`);
            // const params = {
            //     method: "POST",
            //     body: data
            // }
            return axios.post(URL, data)
        } catch (error) {
            console.log(error);
        }
    }

    getTasks = async () => {
        try {
            const URL = `${this.baseApi}${this.listTasksPath}`;
            console.log(URL);
            const response = await fetch(URL);
            const tasks = response.json();
            return tasks
        } catch (error) {
            console.log(error);
        }
    }

    getTaskById = async (taskId) => {
        try {
            const URL = `${this.baseApi}${this.getTaskPath}${taskId}`;
            // console.log(URL);
            // const response = await fetch(URL);
            // const task = response.json();
            // return task;
            return axios.get(URL)
        } catch (error) {
            console.error(error);
        }
    };

    getTaskByUser = async (userId) => {
        try {
            const URL = `${this.baseApi}${this.getTaskByUserPath}${userId}`;
            // console.log(URL);
            // const response = await fetch(URL);
            // const task = response.json();
            // return task;
            return axios.get(URL)
        } catch (error) {
            console.error(error);
        }
    };

    editTaskById = (taskId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editTaskPath}${taskId}`;
            console.log(URL);
            return axios.patch(URL, updatedData)
        } catch (error) {
            console.error(error);
        }
    };

    deleteTaskById = async (taskId) => {
        try {
            const URL = `${this.baseApi}${this.deleteTaskPath}${taskId}`;
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