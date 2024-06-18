import React, { useEffect, useState } from "react";
import { Driver } from "../../../api/driver";
import "./ListTaskComponent.css";
import { useParams } from "react-router-dom";
import { CreateTaskComponent } from "./CreateTaskComponent";
import { Task } from "../../../api/task";
import { useDispatch, useSelector } from "react-redux";
import { getTasks, editTaskById, deleteTaskById } from "../../../slices/taskSlice";
import { Space, Tooltip, Modal } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { CreateTravelTaskComponent } from "./CreateTravelTaskComponent copy";
const { confirm } = Modal;

export const DragAndDrop = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const tasks = useSelector((state) => state.task);
  const dispatch = useDispatch();
  const { driverId } = useParams();
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

  const onDrop = (evt, state) => {
    const itemID = evt.dataTransfer.getData("itemID");
    const item = tasks.find((item) => item.id == itemID);
    if (!item) return;
    const newItem = { ...item, state }

    taskApi.editTaskById(item.id, newItem).then((response) => {
      dispatch(editTaskById(response.data))
    })

  };

  const handleEditTask = (id) => {
    const task = tasks.find((task) => task.id === id);
    setCurrentTask(task);
    setIsModalOpen(true);
  }

  const handleDeleteTask = (id) => {
    confirm({
      title: "¿Quiere eliminar este usuario?",
      content: "Esta elección no se puede revertir",
      onOk() {
        taskApi
          .deleteTaskById(id)
          .then(() => {
            dispatch(deleteTaskById(id));
          })
          .catch((error) => {
            console.error("Failed to delete user", error);
          });
      },
      onCancel() {
        console.log("Cancel delete");
      },
    });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const Card = (item, index) => {
    return (
      <div
        className="dd-element"
        key={index}
        draggable
        onDragStart={(evt) => startDrag(evt, item)}
      >
        <strong className="title">{item.type}</strong>
        <p className="body">{item.description}</p>

        {item.origen &&
          <>
            <p className="body"> <b>Origen: </b> {item.origen}</p>
            <p className="body"> <b>Destino: </b>{item.destino}</p>

            <p className="body"> <b>Paradas: </b>{
              (
                item.paradas.map((parada, index) => (
                  <>
                    <br />
                    <span key={index}>{parada}</span>
                  </>
                ))
              )
            }</p>
          </>
        }

        <Space size="middle">
          <Tooltip title="Edit">
            <EditOutlined
              style={{ color: "blue", cursor: "pointer" }}
              onClick={() => handleEditTask(item.id)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteOutlined
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => handleDeleteTask(item.id)}
            />
          </Tooltip>
        </Space>
      </div>
    )
  }

  return (
    <>
      <h1>Tablero de tareas&nbsp;</h1>
      <br />

      <div style={{ display: 'flex', marginBottom: '20px' }}>

        {/* BOTÓN AGREGAR TAREAS */}
        <div className="container">
          <button className="pulse-effect btn btn-agregar" type="primary" onClick={showModal}>Agregar tarea</button>
          {isModalOpen && <CreateTaskComponent driverId={driverId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentTask={currentTask} setCurrentTask={setCurrentTask} />}
        </div>

        {/* BOTÓN AGREGAR TAREAS */}
        <div className="container" style={{ marginLeft: '20px' }}>
          <button className="pulse-effect btn btn-agregar" type="primary" onClick={showModal}>Agregar tarea de viaje</button>
          {isModalOpen && <CreateTravelTaskComponent driverId={driverId} isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} currentTask={currentTask} setCurrentTask={setCurrentTask} />}
        </div>
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
              Card(item, index)
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
            onDrop={(evt) => onDrop(evt, "En progreso")}
          >
            {getList("En progreso").map((item, index) => (
              Card(item, index)
            ))}
          </div>
        </div>

        <div className="column column--3">
          <h3>Tareas realizadas</h3>
          <div
            className="dd-zone"
            droppable="true"
            onDragOver={(evt) => draggingOver(evt)}
            onDrop={(evt) => onDrop(evt, "Realizada")}
          >
            {getList("Realizada").map((item, index) => (
              Card(item, index)
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// const rootElement = document.getElementById("root");
// ReactDOM.render(<DragAndDrop />, rootElement);
