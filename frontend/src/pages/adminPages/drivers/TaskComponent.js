import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Driver } from "../../../api/driver";
import "./TaskComponent.css";
import { useParams } from "react-router-dom";

export const DragAndDrop = () => {
  const driverApi = new Driver();

  // montanchez imported this
  const { driverId } = useParams();

  const [tasks, setTasks] = useState([
    { id: "", type: "", description: "", state: "" },
  ]);

  useEffect(() => {

    if (driverId) {
      // Lógica para cargar las tareas del usuario con el driverId
      fetchTasks(driverId);
    }
  }, [driverId]);

  const fetchTasks = async (userId) => {
    // there was a try catch
    fetch(`${driverApi.baseApi}/tasks/user/${userId}`)
      .then((response) => {
        response.json().then((responseJson) => {
          setTasks(responseJson.length > 0 ? responseJson : [{
            id: "", type: "", description: "", state: ""
          }]);
        })
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getList = (state) => {
    return tasks.filter((item) => item.state === state);
  };

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData("itemID", item.id);
    console.log(item);
  };

  const draggingOver = (evt) => {
    evt.preventDefault();
  };

  const onDrop = (evt, state) => {
    const itemID = evt.dataTransfer.getData("itemID");
    const item = tasks.find((item) => item.id == itemID);
    if (!item) return;
    const newItem = { ...item, state }

    const newState = tasks.map((task) => {
      if (task.id === itemID) return newItem;
      return task;
    });

    setTasks(newState);
  };

  return (
    <>
      <h1>Arrastrar y Soltar &nbsp;</h1>
      <br />

      <div className="drag-and-drop">
        <div className="column column--1">
          <h3>Tareas por hacer</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "Por hacer")}
          >
            {getList("Por hacer").map((item, index) => (
              <div
                className="dd-element"
                key={index}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <strong className="title">{item.type}</strong>
                <p className="body">{item.description}</p>
              </div>
            )
            )}
          </div>
        </div>

        <div className="column column--2">
          <h3>Tareas en progreso</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "Por realizar")}
          >
            {getList("Por realizar").map((item, index) => (
              <div
                className="dd-element"
                key={index}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <p className="title">{item.type}</p>
                <p className="body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="column column--3">
          <h3>Tareas realizadas</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "Realizadas")}
          >
            {getList("Realizadas").map((item, index) => (
              <div
                className="dd-element"
                key={index}
                draggable
                onDragStart={(evt) => startDrag(evt, item)}
              >
                <strong className="title">{item.type}</strong>
                <p className="body">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<DragAndDrop />, rootElement);
