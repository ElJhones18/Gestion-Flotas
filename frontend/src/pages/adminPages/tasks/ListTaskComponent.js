import React, { useEffect, useState } from "react";
import { Driver } from "../../../api/driver";
import "./ListTaskComponent.css";
import { useParams } from "react-router-dom";
import { TaskModal } from "../../../components/drivers/TaskModal";
import { CreateTaskComponent } from "./CreateTaskComponent";
import { Task } from "../../../api/task";
import { useDispatch, useSelector } from "react-redux";
import { getTasks } from "../../../slices/taskSlice";

export const DragAndDrop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { driverId } = useParams();
  const driverApi = new Driver();
  const taskApi = new Task();

  useEffect(() => {
    if (driverId) {
      fetchTasks(driverId);
    }
  }, [driverId]); // en el momento en que alguna de estas dependencias cambie, se ejecuta el useEffect

  const fetchTasks = (driverId) => {
    // there was a try catch

    taskApi.getTaskByUser(driverId)
      .then((response) => {
        dispatch(getTasks(response.data))
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

  // COMENTARIO DE MONTANCHEZ PARA JULI DEL FUTURO
  // tener en cuenta que el estado de las tareas se maneja en el slide
  // entonces se deben crear funciones dentro del slice para cambiar el estado de las tareas
  // y no hacerlo directamente en el componente como se venia trabajando anteriormente
  // me refiero a la función onDrop

  const onDrop = (evt, state) => {
    const itemID = evt.dataTransfer.getData("itemID");
    const item = tasks.find((item) => item.id == itemID);
    if (!item) return;
    const newItem = { ...item, state }

    const newState = tasks.map((task) => {
      if (task.id === itemID) return newItem;
      return task;
    });
/* 
    dispatch(axios.patch(`http://localhost:3001/tasks/edit/${itemID}`, { state }));
    setTasks(newState); */
  };

  /*Lógica para agregar tareas*/
  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <h1>Tablero de tareas&nbsp;</h1>
      <br />

      {/* BOTÓN AGREGAR TAREAS */}
      <div className="container">
        <button className="pulse-effect btn btn-agregar" type="primary" onClick={showModal}>Agregar tarea</button>
        {isModalOpen && <CreateTaskComponent driverId={driverId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />}
      </div>

      {/* TABLAS PARA LAS TAREAS */}
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
