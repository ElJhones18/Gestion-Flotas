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
import { addTask } from '../../../slices/taskSlice';


const { Option } = Select;
const { TextArea } = Input;

export const CreateTaskComponent = ({ driverId, isModalOpen, setIsModalOpen }) => {
    /* const [task, setTask] = useState(currentTask || { type: "", description: "", state: "", driverId: "" }); */

    const [task, setTask] = useState({
        type: "",
        description: "",
        state: "",
        driverId: driverId
    });

    const taskApi = new Task();
    const dispatch = useDispatch();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const onFinish = (values) => {
        try {
            // console.log("Informacion",values);
            
            taskApi.createTask({...values, driverId}).then((response)=> {
                console.log("values:", driverId);
                console.log("response:", response.data);
            }).catch((e)=>{
                console.log("error1", e)
            })
            console.log("object");
            dispatch(addTask({...values, driverId}));
            setTask({
                type: "",
                state: "",
                description: "",
                driverId: ""
            });
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to create task", error);
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
                    <Button htmlType="submit">
                        Aceptar
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}
