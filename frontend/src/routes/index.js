export const ROUTES = {
    HOME: "/home",

    /* AUTH */
    LOGIN: "/login",
    REGISTER: "/register",
    UNAUTHORIZED: "/unauthorized",
    LOGOUT: "/logout",

    /* USUARIOS */
    ADMIN_LIST_USERS: "/admin/users",
    DRIVER_PORTAL: "/driver-portal",
    MY_TASKS: "/my-tasks",

    /* CAMIONES */
    ADMIN_LIST_TRUCKS: "/admin/trucks",
    ADMIN_CREATE_TRUCK: "/admin/truck/create",

    /* TAREAS */
    ADMIN_EDIT_TASK: "/admin/tasks/:driverId",

    /* CHECKLIST */
    CHECKLIST: "/checklist",

    /* COMBUSTIBLE */
    ADMIN_CREATE_FUEL: "/admin/fuel/create",
    ADMIN_LIST_FUELS: "/admin/fuels",

    /* NEUMATICOS */
    ADMIN_CREATE_TIRE: "/admin/tire/create",
    ADMIN_LIST_TIRES: "/admin/tires",
    
    /* MANTENIMIENTO */
    ADMIN_CREATE_MAINTENANCE: "/admin/maintenance/create",
    ADMIN_LIST_MAINTENANCES: "/admin/maintenances",

    /* VIAJES */
    ADMIN_CREATE_TRAVEL: "/admin/travel/create",
    ADMIN_LIST_TRAVELS: "/admin/travels",

    /* PARADAS */
    ADMIN_CREATE_STOP: "/admin/stop/create",
    ADMIN_LIST_STOPS: "/admin/stops",
}