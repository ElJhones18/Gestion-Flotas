// conexión con el back
export const SERVER_IP = "localhost:3001"
export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        CREATE_USER: `/users/create`,
        LIST_USERS: `/users`,
        GET_USER: `/users/`,
        EDIT_USER: `/users/edit/`,
        DELETE_USER: `/users/delete/`,

        LIST_TASKS: `/tasks/`,

        CREATE_DRIVER: `/drivers/create`,
        LIST_DRIVERS: `/drivers`,
        GET_DRIVER: `/drivers/`,
        EDIT_DRIVER: `/drivers/edit/`,
        DELETE_DRIVER: `/drivers/delete/`
    }
}