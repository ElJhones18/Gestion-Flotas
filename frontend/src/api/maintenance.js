import { PATHS } from "../utils/config";
import axios from "axios";

export class Maintenance {
    baseApi = PATHS.BASE_PATH;
    createMaintenancePath = PATHS.API_ROUTES.CREATE_MAINTENANCE;

}