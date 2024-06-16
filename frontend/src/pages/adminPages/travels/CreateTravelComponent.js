import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTravel } from "../../../slices/travelSlice";
import { Travel } from "../../../api/travel";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";

export const CreateTravelComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const travelApi = new Travel();
  const [formData, setFormData] = useState({
    distance: "",
    origin: "",
    destination:"",
    stops:[],
    driverId:"",
    truckId:""
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    })
  }

  const handleCreateTravel = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("distance", formData.distance);
      formDataToSend.append("origin", formData.origin);
      formDataToSend.append("destination", formData.destination);
      formDataToSend.append("stops", formData.stops);
      formDataToSend.append("driverId", formData.driverId);
      formDataToSend.append("truckId", formData.truckId);
    
      console.log("formDataToSend", formDataToSend);

      await travelApi.createTravel(formData);
      dispatch(addTravel(formData));
      setFormData({
        distance: "",
        origin: "",
        destination:"",
        stops:[],
        driverId:"",
        truckId:""
      });
    } catch (error) {
      console.log("Error al crear el viaje", error);
    }
  }

  return (
    <>
    <Button onClick={() => navigate(-1)}>Volver</Button>
      <h2>Crear Viaje</h2>
      <form onSubmit={handleCreateTravel}>
        <div>
          <label htmlFor="distance">Distancia</label>
          <input 
              type="text" 
              id="distance" 
              value={formData.distance} 
              onChange={handleChange} 
              required>
          </input>
        </div>

        <div>
          <label htmlFor="origin">Origen</label>
          <input 
              type="text" 
              id="origin" 
              value={formData.origin} 
              onChange={handleChange} 
              required>
          </input>
        </div>

        <div>
          <label htmlFor="destination">Destino</label>
          <input 
              type="text" 
              id="destination" 
              value={formData.destination} 
              onChange={handleChange} 
              required>
          </input>
        </div>

        <div>
          <label htmlFor="driverId">Conductor</label>
          <input 
              type="text" 
              id="driverId" 
              value={formData.driverId} 
              onChange={handleChange} 
              required>
          </input>
        </div>

        <div>
          <label htmlFor="truckId">Camión</label>
          <input 
              type="text" 
              id="truckId" 
              value={formData.truckId} 
              onChange={handleChange} 
              required>
          </input>
        </div>

        <button type="submit">Crear Viaje</button>
      </form>
    </>
  )


}