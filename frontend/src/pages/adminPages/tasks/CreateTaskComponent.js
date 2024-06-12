import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
} from "antd";
import { Task } from '../../../api/task';
import { useDispatch } from 'react-redux';
import { addTask, editTaskById } from '../../../slices/taskSlice';

const { Option } = Select;
const { TextArea } = Input;

export const CreateTaskComponent = ({ driverId, isModalOpen, setIsModalOpen, currentTask, setCurrentTask }) => {
    /* const [task, setTask] = useState(currentTask || { type: "", description: "", state: "", driverId: "" }); */

    const [task, setTask] = useState(currentTask || {
        type: "",
        description: "",
        state: "",
        driverId: driverId
    });

    const taskApi = new Task();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setCurrentTask(null)
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        try {
            if (currentTask) {
                taskApi.editTaskById(currentTask.id, { ...values, driverId }).then((response) => {
                    dispatch(editTaskById(response.data));
                }).catch((e) => {
                    console.log("error1", e)
                })
                setTask({
                    type: "",
                    state: "",
                    description: "",
                    driverId: ""
                });
                setCurrentTask(null)
                setIsModalOpen(false);
            } else {
                taskApi.createTask({ ...values, driverId }).then((response) => {
                    console.log("values:", driverId);
                    console.log("response:", response.data);
                    dispatch(addTask(response.data));
                }).catch((e) => {
                    console.log("error1", e)
                })
                setTask({
                    type: "",
                    state: "",
                    description: "",
                    driverId: ""
                });
                setCurrentTask(null);
                setIsModalOpen(false);
            }

        } catch (error) {
            console.error("Failed to create task", error);
        };
    }

    return (
        <Modal
            title={currentTask ? "Editar Tarea" : "Agregar Tarea"}
            open={isModalOpen}
            //   onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            <Form onFinish={onFinish} initialValues={currentTask || {
                type: "",
                description: "",
                state: "",
                driverId: driverId
            }}>
                <Form.Item label="Tipo" name="type">
                    <Select
                        name="type"
                        value={task.type}
                    >
                        <Option value="Entrega"></Option>
                        <Option value="Recogida"></Option>
                        <Option value="Mantenimiento"></Option>
                        <Option value="Visita a Clientes"></Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Descripción" name="description">
                    <TextArea
                        name="description"
                        value={task.description}
                        rows={4}
                    />
                </Form.Item>

                {/* <Form.Item label="Conductor" name="driverId">
                    <Select
                        name="driverId"
                    >
                        <Option value={task.driverId}>{task.driverId}</Option>
                    </Select>

                </Form.Item> */}

                <Form.Item label="Estado" name="state">
                    <Select
                        name="state"
                    >
                        <Option value="Por hacer">Por Hacer</Option>
                        <Option value="En progreso">En Progreso</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button htmlType="submit">
                            Aceptar
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </Modal>
    )
}
