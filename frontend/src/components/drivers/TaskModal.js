import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    Modal,
    Select,
} from "antd";
import { Task } from '../../api/task';
import { useDispatch } from 'react-redux';
import { addTask } from '../../slices/taskSlice';

const { Option } = Select;
const { TextArea } = Input;

export const TaskModal = ({ driverId, isModalOpen, setIsModalOpen, currentTask }) => {
    const [task, setTask] = useState(currentTask || { type: "", description: "", state: "", driverId: "" });

    const taskApi = new Task();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
       try{ alert(JSON.stringify(values, null, 2));

        taskApi.createTask(values);
        dispatch(addTask(values));    
        setTask({
            type: "",
            description: "",
            state: "",
            driverId: driverId
        });
        setIsModalOpen(false);
            
    }catch(error) {
        console.error("Failed to edit user", error);
    };
}

    return (
        <Modal
            title="Agregar Tarea"
            open={isModalOpen}
            //   onOk={handleOk}
            onCancel={handleCancel}>
            <Form onFinish={onFinish}>
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

                <Form.Item label="Estado" name="state">
                    <Select
                        name="state"
                    >
                        <Option value="Por Hacer">Por Hacer</Option>
                        <Option value="En Progreso">En Progreso</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button htmlType="submit">
                        Aceptar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
