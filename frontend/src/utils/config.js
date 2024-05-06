// conexión con el back
export const SERVER_IP = "localhost:3001"
export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        CREATE_USER: `/users/create`,
        LIST_USERS: `/users`,
        GET_USER: `/users/`,
        EDIT_USER: `/users/edit/`,
        DELETE_USER: `/users/delete/`
    }
}