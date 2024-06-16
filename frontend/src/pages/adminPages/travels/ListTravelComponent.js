import { ROUTES } from "../../../routes"
import {
    Avatar,
    Button,
    Form,
    Input,
    Modal,
    Space,
    Switch,
    Table,
    Tooltip,
    Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Travel } from "../../../api/travel";
import { useEffect, useState } from "react";
import { deleteTravelById, editTravelById, getTravels} from "../../../slices/travelSlice";
import { useDispatch, useSelector } from "react-redux";

const { confirm } = Modal;

export const ListTravelComponent = () => { 
    const dispatch = useDispatch();
    const travels = useSelector((state) => state.travel.travels);
    const travelApi = new Travel();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTravel, setSelectedTravel] = useState(null);
    const navigate = useNavigate()

    const[formData, setFormData] = useState({
        distance: "",
        origin: "",
        destination: "",
        stops: [],
        driverId: "",
        truckId: ""
    })

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
    }, [dispatch])

    const handleEdit = (id) => {
        const travel = travels.find((travel) => travel.id === id);
        setSelectedTravel(travel);
        setIsModalVisible(true);
    }

    const handleDelete = (id) => {
        confirm({
            title: "¿Quiere eliminar este viaje",
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
        formDataToSend.append("distance", formData.distance);
        formDataToSend.append("origin", formData.origin);
        formDataToSend.append("destination", formData.destination);
        formDataToSend.append("stops", formData.stops);
        formDataToSend.append("driverId", formData.driverId);
        formDataToSend.append("truckId", formData.truckId);

        travelApi
            .editTravelById(selectedTravel.id, selectedTravel)
            .then((result) => {
                dispatch(editTravelById(result));

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
            key: "stops"
        },
        {
            title: "Conductor",
            dataIndex: "driverId",
            key: "driverId"
        },
        {
            title: "Camión",
            dataIndex: "truckId",
            key: "truckId"
        },
        {
            title: "Acciones",
            key: "action",
            render: (text, record) => (
                <Space size="middle">
                    <Tooltip title="Editar">
                        <Button
                            type="primary"
                            onClick={() => handleEdit(record.id)}
                        >
                            Editar
                        </Button>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                        <Button
                            type="primary"
                            danger
                            onClick={() => handleDelete(record.id)}
                        >
                            Eliminar
                        </Button>
                    </Tooltip>
                </Space>
            )
        }
    ]
   

    return (
        <div className="container">
            <div style={{display:"flex", justifyContent: "space-between"}}>
                <h2>Listado de Viajes</h2>
                <Button onClick={() => navigate(ROUTES.ADMIN_CREATE_TRAVEL)}>Crear Viaje</Button>
            </div>
            <Table dataSource={travels} columns={columns} rowKey="id"/>
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

        </div>
    )
}