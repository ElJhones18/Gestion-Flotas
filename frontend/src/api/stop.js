

export class Stop {
    baseApi = PATHS.BASE_PATH;
    createStopPath = PATHS.API_ROUTES.CREATE_STOP;
    listStopsPath = PATHS.API_ROUTES.LIST_STOPS;

    createStop = async (formData) => {
        try {
            const URL = `${this.baseApi}${this.createStopPath}`
            const params = {
                method: "POST",
                body: formData
            }
            const response = await fetch(URL, params);
            const result = response.json();
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    getStops = async () => {
        try {
            const URL = `${this.baseApi}${this.listStopsPath}`;
            const response = await axios.get(URL);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    }

    getStopById = async (stopId) => {
        try {
            const URL = `${this.baseApi}${this.getStopPath}${stopId}`;
            const response = await fetch(URL);
            const stop = response.json();
            return stop;
        } catch (error) {
            console.error(error);
        }
    };

    editStopById = async (stopId, updatedData) => {
        try {
            const URL = `${this.baseApi}${this.editStopPath}${stopId}`;
            const params = {
                method: "PATCH",
                body: updatedData
            }
            const response = await fetch(URL, params);
            const result = response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    };

    deleteStopById = async (stopId) => {
        try {
            const URL = `${this.baseApi}${this.deleteStopPath}${stopId}`;
            const params = {
                method: "DELETE"
            }
            const response = await fetch(URL, params);
            const result = response.json();
            return result;
        } catch (error) {
            console.error(error);
        }
    };
}