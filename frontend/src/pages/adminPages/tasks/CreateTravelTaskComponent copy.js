import React, { useState } from 'react'
import {
    Button,
    Form,
    Input,
    InputNumber,
    Modal,
    Select,
} from "antd";
import { Task } from '../../../api/task';
import { useDispatch } from 'react-redux';
import { addTask, editTaskById } from '../../../slices/taskSlice';
import axios from 'axios';
import AsyncSelect from 'react-select/async';

const { Option } = Select;
const { TextArea } = Input;

export const CreateTravelTaskComponent = ({ driverId, isModalOpen, setIsModalOpen, currentTask, setCurrentTask }) => {
    /* const [task, setTask] = useState(currentTask || { type: "", description: "", state: "", driverId: "" }); */


    const [cantidadParadas, setCantidadParadas] = useState(1);
    const [origen, setOrigen] = useState("");
    const [destino, setDestino] = useState("");
    const [paradas, setParadas] = useState([]);
    const [indicaciones, setIndicaciones] = useState([]);

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
        values.origen = origen;
        values.destino = destino;
        values.paradas = paradas;
        values.indicaciones = indicaciones;
        // console.log(indicaciones);
        console.log(values);

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
                    origen: "",
                    paradas: [],
                    indicaciones: [],
                    destino: "",
                    driverId: ""
                });
                setCurrentTask(null);
                setIsModalOpen(false);
            }

        } catch (error) {
            console.error("Failed to create task", error);
        };
    }

    const fetchSuggestions = async (inputValue) => {
        if (!inputValue) {
            return [];
        }
        try {
            const response = await axios.get(`https://graphhopper.com/api/1/geocode?q=${inputValue}&locale=es&key=bc2c1444-a0c2-4cad-8814-6f196228c9fe`);
            return response.data.hits.map(hit => ({
                label: `${hit.name}, ${hit.country}`,
                value: [hit.point.lat, hit.point.lng],
                name: hit.name,
            }));
        } catch (error) {
            console.error("Error fetching suggestions:", error);
            return [];
        }
    };

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
                origen: "",
                destino: "",
                paradas: [],
                description: "",
                state: "",
                driverId: driverId
            }}>
                <Form.Item label="Tipo" name="type" rules={[{ required: true }]}>
                    <Select
                        name="type"
                        value={task.type}
                    >
                        <Option value="Viaje"></Option>
                    </Select>
                </Form.Item>


                <Form.Item label="Origen" rules={[{ required: true }]}>
                    <AsyncSelect
                        value={task.origen}
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        placeholder="Desde"
                        cacheOptions
                        loadOptions={fetchSuggestions}
                        onChange={selectedOption => setOrigen(selectedOption.name)}
                        defaultOptions
                    />
                </Form.Item>

                <Form.Item label="Destino" rules={[{ required: true }]}>
                    <AsyncSelect
                        value={task.destino}
                        components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                        placeholder="Hasta"
                        cacheOptions
                        loadOptions={fetchSuggestions}
                        onChange={(selectedOption) => setDestino(selectedOption.name)}
                        defaultOptions
                    />
                </Form.Item>

                <Form.Item label="Cantidad Paradas" rules={[{ required: true }]}>
                    <InputNumber min={1} max={3} value={cantidadParadas} onChange={setCantidadParadas} />
                </Form.Item>

                {[...Array(cantidadParadas)].map((_, index) => (
                    <Form.Item key={index} label={`Parada ${index + 1}`} rules={[{ required: true }]}>
                        <AsyncSelect
                            components={{ DropdownIndicator: () => null, IndicatorSeparator: () => null }}
                            placeholder="Parada"
                            cacheOptions
                            loadOptions={fetchSuggestions}
                            onChange={(selectedOption) => setParadas([...paradas, selectedOption.name])}
                            defaultOptions
                        />
                    </Form.Item>
                ))}

                {[...Array(cantidadParadas)].map((_, index) => (
                    <Form.Item key={index} label={`Indicaciones ${index + 1}`} rules={[{ required: true }]}>

                        <TextArea
                            name="indicacion"
                            value={indicaciones[index]}
                            onChange={(e) => {
                                const updatedIndicaciones = [...indicaciones];
                                updatedIndicaciones[index] = e.target.value;
                                setIndicaciones(updatedIndicaciones);
                            }}
                            rows={2}
                        />

                    </Form.Item>
                ))}

                <Form.Item label="Descripción" name="description" rules={[{ required: true }]}>
                    <TextArea
                        name="description"
                        value={task.description}
                        rows={3}
                    />
                </Form.Item>
                <Form.Item label="Estado" name="state" rules={[{ required: true }]}>
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
