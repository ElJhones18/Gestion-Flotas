// conexión con el back
export const SERVER_IP = "localhost:3001"
export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        /* USUARIOS */
        CREATE_USER: `/users/create`,
        LIST_USERS: `/users`,
        GET_USER: `/users/`,
        EDIT_USER: `/users/edit/`,
        DELETE_USER: `/users/delete/`,
        SIGNUP: `/signup`,
        LOGIN: `/login`,

        /* CONDUCTORES */
        CREATE_DRIVER: `/drivers/create`,
        LIST_DRIVERS: `/drivers`,
        GET_DRIVER: `/drivers/`,
        EDIT_DRIVER: `/drivers/edit/`,
        DELETE_DRIVER: `/drivers/delete/`,

        /* TAREAS */
        CREATE_TASK: `/tasks/create`,
        LIST_TASKS: `/tasks`,
        GET_TASK: `/tasks/`,
        GET_TASK_BY_USER: `/tasks/user/`,
        EDIT_TASK: `/tasks/edit/`,
        DELETE_TASK: `/tasks/delete/`,

        /* CAMIONES */
        CREATE_TRUCK: `/truck/create`,
        LIST_TRUCKS: `/trucks`,
        GET_TRUCK: `/truck/`,
        EDIT_TRUCK: `/truck/edit/`,
        DELETE_TRUCK: `/truck/delete/`,

        /* MANTENIMIENTOS */
        CREATE_MAINTENANCE: `/maintenance/create`,
        LIST_MAINTENANCES: `/maintenances`,
        GET_MAINTENANCE: `/maintenance/`,
        EDIT_MAINTENANCE: `/maintenance/edit/`,
        DELETE_MAINTENANCE: `/maintenance/delete/`,
    }
}