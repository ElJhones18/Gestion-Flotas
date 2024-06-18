import { ROUTES } from "../../../routes"
import {
    Avatar,
    Button,
    Form,
    Input,
    List,
    Modal,
    Space,
    Switch,
    Table,
    Tooltip,
    Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { EditOutlined, DeleteOutlined, PlusCircleOutlined, PlusOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { Travel } from "../../../api/travel";
import { useEffect, useState } from "react";
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { deleteTravelById, editTravelById, getTravels } from "../../../slices/travelSlice";
import { useDispatch, useSelector } from "react-redux";

const { confirm } = Modal;

export const ListTravelComponent = () => {
    const dispatch = useDispatch();
    const travels = useSelector((state) => state.travel);
    const travelApi = new Travel();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const [trucks, setTrucks] = useState([]);
    const [selectedTruck, setSelectedTruck] = useState('');

    const [drivers, setDrivers] = useState([]);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [isStopsModalVisible, setIsStopsModalVisible] = useState(false);
    const [stops, setStops] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchTravels = async () => {
            try {
                const travelData = await travelApi.getTravels();
                dispatch(getTravels(travelData));
            } catch (error) {
                console.log("Error al obtener los viajes", error);
            }
        }
        fetchTravels();
        fetchDrivers();
        fetchTrucks();
        fetchStops();
    }, [dispatch])

    const fetchDrivers = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_USERS;
            const response = await axios.get(URL);
            const drivers = response.data.filter((driver) => driver.rol === 'Conductor');
            setDrivers(drivers);
        } catch (error) {
            console.error('Error fetching drivers:', error);
        }
    };

    const fetchTrucks = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
            const response = await axios.get(URL);
            setTrucks(response.data);
        } catch (error) {
            console.error("Error fetching trucks", error);
        }
    };

    const fetchStops = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_STOPS;
            const response = await axios.get(URL);
            setStops(response.data);
        } catch (error) {
            console.error("Error fetching stops", error);
        }
    };

    const handleEdit = (id) => {
        const travel = travels.find((travel) => travel.id === id);
        setSelectedTravel(travel);
        setIsModalVisible(true);
    }

    const handleDelete = (id) => {
        confirm({
            title: "¿Quiere eliminar este viaje?",
            content: "Esta acción no se puede deshacer",
            onOk() {
                travelApi.deleteTravelById(id)
                    .then(() => {
                        dispatch(deleteTravelById(id));
                    })
                    .catch((error) => {
                        console.log("Error al eliminar el viaje", error);
                    });
            },
            onCancel() {
                console.log("Cancel delete");
            }
        })

    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTravel(null);
    }

    const handleOk = () => {
        const formDataToSend = new FormData();
        formDataToSend.append("distance", selectedTravel.distance);
        formDataToSend.append("origin", selectedTravel.origin);
        formDataToSend.append("destination", selectedTravel.destination);
        formDataToSend.append("stops", selectedTravel.stops);
        formDataToSend.append("driverId", selectedTravel.driverId);
        formDataToSend.append("truckId", selectedTravel.truckId);

        travelApi
            .editTravelById(selectedTravel.id, selectedTravel)
            .then((result) => {
                dispatch(
                    editTravelById(result)
                );

                setIsModalVisible(false);
                setSelectedTravel(null);
            })
            .catch((error) => {
                console.log("Error al editar el viaje", error);
            });
    }

    const handleChange = (event) => {
        setSelectedTravel({
            ...selectedTravel,
            [event.target.id]: event.target.value
        });
    }

    const getDriverNameById = (id) => {
        const driver = drivers.find((driver) => driver.id === id);
        if (driver) {
            return driver.username + " " + driver.lastname;
        }
        return "Desconocido";
    }


    const getTruckDetailsById = (id) => {
        const truck = trucks.find((truck) => truck.id === id);
        return truck ? `${truck.plate} - ${truck.model}` : "Desconocido";
    }

    const showStopsModal = async (record) => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_STOPS;
            const response = await axios.get(URL);
            const stops = response.data.filter((stop) => stop.travelId === record.id);
            console.log('stops:', stops);
            setStops(stops);
            
            setIsStopsModalVisible(true);
        } catch (error) {
            console.error('Error fetching stops:', error);
        }
    };

    const handleStopsModalOk = () => {
        setIsStopsModalVisible(false);
    };

    const columns = [
        {
            title: "Distancia",
            dataIndex: "distance",
            key: "distance"
        },
        {
            title: "Origen",
            dataIndex: "origin",
            key: "origin"
        },
        {
            title: "Destino",
            dataIndex: "destination",
            key: "destination"
        },
        {
            title: "Paradas",
            dataIndex: "stops",
            key: "stops",
            render: (stops, record) => (
                <Button type="link" onClick={() => showStopsModal(record)}>
                    Detalles
                </Button>
            )
        },
        {
            title: "Conductor",
            dataIndex: "driverId",
            key: "driverId",
            render: (id) => getDriverNameById(id)
        },
        {
            title: "Camión",
            dataIndex: "truckId",
            key: "truckId",
            render: (id) => getTruckDetailsById(id)
        },
        {
            title: "Acciones",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
{/*                     <Tooltip title="Editar">
                        <EditOutlined
                            style={{ color: "blue", cursor: "pointer" }}
                            onClick={() => handleEdit(record.id)} />
                    </Tooltip> */}
                    <Tooltip title="Eliminar">
                        <DeleteOutlined
                            style={{ color: "red", cursor: "pointer" }}
                            onClick={() => handleDelete(record.id)} />
                    </Tooltip>
                </Space>
            )
        }
    ]


    return (
        <div className="container">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2>Mis Viajes</h2>
                <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_TRAVEL)} style={{ display: 'flex', marginBottom: '10px' }}>

                    <PlusOutlined style={{ fontSize: '20px', alignItems: 'middle' }} />
                    <span style={{ alignItems: 'middle', fontSize: '15px' }}>Crear Viaje</span>
                </Button>
            </div>
            <Table dataSource={travels} columns={columns} rowKey="id" />
            {selectedTravel && (
                <Modal
                    title="Eliminar Viaje"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Distancia">
                            <Input
                                id="distance"
                                value={selectedTravel.distance}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Origen">
                            <Input
                                id="origin"
                                value={selectedTravel.origin}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Destino">
                            <Input
                                id="destination"
                                value={selectedTravel.destination}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        {/*                         <Form.Item label="Paradas">
                            <Input
                                id="stops"
                                value={selectedTravel.stops}
                                onChange={handleChange}
                            />
                        </Form.Item> */}
                        <Form.Item label="Conductor">
                            <Input
                                id="driverId"
                                value={selectedTravel.driverId}
                                onChange={handleChange}
                            />
                        </Form.Item>
                        <Form.Item label="Camión">
                            <Input
                                id="truckId"
                                value={selectedTravel.truckId}
                                onChange={handleChange}
                            />
                        </Form.Item>
                    </Form>

                </Modal>


            )}

            <Modal
                title="Detalles de Paradas"
                open={isStopsModalVisible}
                onOk={handleStopsModalOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleStopsModalOk}>
                        OK
                    </Button>,
                ]}
            >
                {stops.length > 0 ? (
                    <List
                        itemLayout="horizontal"
                        dataSource={stops}
                        renderItem={(stop) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<EnvironmentOutlined style={{ color: '#1890ff', fontSize: '24px' }} />}
                                    title={stop.direction}
                                    description={`Latitud: ${stop.latitude}, Longitud: ${stop.longitude}`}
                                />
                            </List.Item>
                        )}
                    />
                ) : (
                    <p>No hay paradas disponibles</p>
                )}
            </Modal>

        </div>
    )
}