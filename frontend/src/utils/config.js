// conexión con el back
export const SERVER_IP = "localhost:3001"
export const PATHS = {
    BASE_PATH: `http://${SERVER_IP}`,
    API_ROUTES: {
        /* USUARIOS */
        CREATE_USER: `/users/create`,
        LIST_USERS: `/users`,
        GET_USER: `/users/`,
        GET_USER_BY_EMAIL: `/users/email/`,
        EDIT_USER: `/users/edit/`,
        DELETE_USER: `/users/delete/`,
        SIGNUP: `/signup`,
        LOGIN: `/login`,

        /* NOTIFICACIONES */
        GET_NOTIFICATIONS_BY_EMAIL: `/notification/user/`,
        UPDATE_NOTIFICATION: `/notification/edit/`,
        DELETE_NOTIFICATION: `/notification/delete/`,

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

        /* VIAJES */
        CREATE_TRAVEL: `/travel/create`,
        LIST_TRAVELS: `/travels`,
        GET_TRAVEL: `/travel/`,
        EDIT_TRAVEL: `/travel/edit/`,
        DELETE_TRAVEL: `/travel/delete/`,

        /* PARADAS */
        CREATE_STOP: `/stop/create`,
        LIST_STOPS: `/stops`,

        /* COMBUSTIBLES */
        LIST_FUELS: `/fuels`,
        GET_FUEL: `/fuel/`,
        CREATE_FUEL: `/fuel/create`,
        EDIT_FUEL: `/fuel/edit/`,
        DELETE_FUEL: `/fuel/delete/`,

        /* CHECKLIST */
        CREATE_CHECKLIST: `/checklist/create`,

        /* NEUMATICOS */
        CREATE_TIRE: `/tire/create`,
        LIST_TIRES: `/tires`,
        GET_TIRE: `/tire/`,
        EDIT_TIRE: `/tire/edit/`,
        DELETE_TIRE: `/tire/delete/`,

        /* VIAJES */
        LIST_TRAVELS: `/travels/`,
    }
}