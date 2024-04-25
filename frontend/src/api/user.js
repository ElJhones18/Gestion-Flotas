import { PATHS } from "../utils/config";

export class User{
    baseApi = PATHS.BASE_PATH;
    createUsersPath = PATHS.API_ROUTES.CREATE_USER;

    createUser = async () => { 
        try {
            console.log(`${baseApi}${createUser}`);
            const response = await fetch(`${baseApi}${createUser}`, 
                {    
                    method: 'POST',
                    body: formData
                }
            );
            console.log(response);
        } catch (error) {
            
        }
     }
    getUser = async() => { 
        try {
            
        } catch (error) {
            
        }
     }
    getUserById = async() => { 
        try {
            
        } catch (error) {
            
        }
     }
    getUserByIdAndUpdate = async() => { 
        try {
            
        } catch (error) {
            
        }
     }
    getUserByIdAndDelete = async() => { 
        try {
            
        } catch (error) {
            
        }
     }
}