import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Truck } from "../../../api/truck";
import { addTruck } from "../../../slices/truckSlice";
import { DatePicker } from "antd";

export const CreateTruckComponent = () => {

    const dispatch = useDispatch();
    const truckApi = new Truck();
    const [formData, setFormData] = useState({
        plate: "Karlitos",
        brand: "Ferrari",
        color: "Blanco",
        rotation_programming: "",
        fuel_consumption: "Medio",
        model: "2010",
        load_capacity: "Medio",
        photo:"",
        maintenance: [],
        tires: [],
        fuelId: "6657a227f83a4136f3f31b0b",
        driverId: "665a7d026d82001062096343",
/*         availability: "",
        checklist: "", */
    });

    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.id]: event.target.value
        });
    }

    const handleDateChange = (date, dateString) => {
        setFormData({
            ...formData,
            rotation_programming: dateString
        });
    }

    const handleAvatarChange = (event) => {
        setFormData({
            ...formData,
            photo: event.target.files[0]
        });
    }

    const handleCreateTruck = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            formDataToSend.append("plate", formData.plate);
            formDataToSend.append("brand", formData.brand);
            formDataToSend.append("color", formData.color);
            formDataToSend.append("rotation_programming", formData.rotation_programming);
            formDataToSend.append("fuel_consumption", formData.fuel_consumption);
            formDataToSend.append("model", formData.model);
            formDataToSend.append("load_capacity", formData.load_capacity);
            formDataToSend.append("photo", formData.photo);
            formDataToSend.append("maintenance", formData.maintenance);
            formDataToSend.append("tires", formData.tires);
            formDataToSend.append("fuelId", formData.fuelId);
            formDataToSend.append("driverId", formData.driverId);
/*             formDataToSend.append("availability", formData.availability);
            formDataToSend.append("checklist", formData.checklist); */

            console.log(formDataToSend);

            await truckApi.createTruck(formData);
            dispatch(addTruck(formData));
            setFormData({
                plate: "",
                brand: "",
                color: "",
                rotation_programming: "",
                fuel_consumption: "",
                model: "",
                load_capacity: "",
                photo: "",
                maintenance: [],
                tires: [],
                fuelId: "",
                driverId: "",
/*                 availability: "",
                checklist: "", */
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <h2>Crear Camión</h2>
            <form onSubmit={handleCreateTruck} encType="multipart/form-data">
                <div>
                    <label htmlFor="plate">Placa:</label>
                    <input 
                        type="text" 
                        id="plate" 
                        value={formData.plate} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="brand">Marca:</label>
                    <input 
                        type="text" 
                        id="brand" 
                        value={formData.brand} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="color">Color:</label>
                    <input 
                        type="text" 
                        id="color" 
                        value={formData.color} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="rotation_programming">Programación de rotación:</label>
                    <DatePicker  
                        id="rotation_programming" 
                        format="DD-MM-YYYY"
                       /*  value={formData.rotation_programming}  */
                        onChange={handleDateChange}
                        style={{ width: '100%' }}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="fuel_consumption">Consumo de combustible:</label>
                    <input 
                        type="text" 
                        id="fuel_consumption" 
                        value={formData.fuel_consumption} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="model">Modelo:</label>
                    <input 
                        type="text" 
                        id="model" 
                        value={formData.model} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="load_capacity">Capacidad de carga:</label>
                    <input 
                        type="text" 
                        id="load_capacity" 
                        value={formData.load_capacity} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="fuelId">ID de combustible:</label>
                    <input 
                        type="text" 
                        id="fuelId" 
                        value={formData.fuelId} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>

                <div>
                    <label htmlFor="driverId">ID de conductor:</label>
                    <input 
                        type="text" 
                        id="driverId" 
                        value={formData.driverId} 
                        onChange={handleChange}
                        required>
                    </input>
                </div>
                <div>
                    <label htmlFor='photo'>Camión:</label>
                    <input
                        type='file'
                        id="photo"
                        value={formData.photo}
                        onChange={handleAvatarChange}
                    ></input>
                </div>

                <button type="submit">Crear Camión</button>
            </form>
        </>
    )
}