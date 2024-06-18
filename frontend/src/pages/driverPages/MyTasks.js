import { useEffect, useState } from "react";
import { PATHS } from "../../utils/config";
import axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { message } from "antd";

const MyTasks = () => {

    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.GET_USER_BY_EMAIL + localStorage.getItem("user");
            const response = await axios.get(URL);
            // console.log(response.data.tasks);
            setTasks(response.data.tasks);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const getList = (state) => {
        return tasks.filter((item) => item.state === state);
    };

    const draggingOver = (evt) => {
        evt.preventDefault();
    };

    const onDrop = async (evt, state) => {
        const itemID = evt.dataTransfer.getData("itemID");
        const item = tasks.find((item) => item.id == itemID);
        if (!item) return;
        const newItem = { ...item, state }
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.EDIT_TASK + item.id;
            const response = await axios.patch(URL, newItem);
            console.log(response);
            if (response.status === 200) {
                fetchTasks();
                message.success("Tarea actualizada correctamente");
            }
            console.log(URL);
        } catch (error) {
            console.log(error);
            message.error("Error al actualizar la tarea");
        }
    };

    const startDrag = (evt, item) => {
        evt.dataTransfer.setData("itemID", item.id);
        console.log(item);
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
            </div>
        )
    }

    return (
        <>
            {loading && <LoadingOutlined />}
            <h1>Tablero de tareas&nbsp;</h1>
            <br />
            <p>Revisa y registra el progreso de tus tareas. Arrastra las tareas a su estado correspondiente.</p>

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
}

export default MyTasks;