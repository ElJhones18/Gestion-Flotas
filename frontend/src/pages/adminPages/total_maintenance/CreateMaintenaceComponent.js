import { Button, Card, DatePicker, Form, Input, Select, Tabs, Timeline, Tooltip, message } from "antd";
import { useEffect, useState } from "react";
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Title } = Typography;

const CreateMaintenanceComponent = () => {

    const [loading, setLoading] = useState(true);
    const [truckSelected, setTruckSelected] = useState(false);

    const [trucks, setTrucks] = useState([])
    const [selectedTruck, setSelectedTruck] = useState('')
    const [maintenances, setMaintenances] = useState([])

    const [date, setDate] = useState('');
    const [repairs, setRepairs] = useState('');
    const [next_event, setNextEvent] = useState('');

    useEffect(() => {
        fetchTrucks();
    }, []);

    const fetchTrucks = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_TRUCKS;
            const response = await axios.get(URL);
            // console.log(response.data);
            setTrucks(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleCreate = async () => {
        const maintenance = {
            date,
            repairs,
            next_event,
            truckId: selectedTruck,
        };
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.CREATE_MAINTENANCE;
            const response = await axios.post(URL, maintenance);
            console.log(response);
            if (response.status === 200) {
                message.success("Mantenimiento creado correctamente");
                setMaintenances([...maintenances, maintenance]);
            }
        } catch (error) {
            console.log(error);
            message.error("Error creando el mantenimiento");
        }
    }

    const createMaintenanceForm = (
        <Form
            labelCol={{
                span: 5,
            }}
            wrapperCol={{
                span: 19,
            }}
            labelWrap={true}
            size="large"
            style={{
                maxWidth: 600,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
        >
            <Form.Item
                label="Fecha"
                name="date"
                rules={[{ required: true, message: 'Por favor ingrese la fecha' }]}
            >
                <DatePicker
                    format="DD/MM/YYYY"
                    // value={rotationProgramming}
                    onChange={(date, dateString) => setDate(dateString)}
                />
            </Form.Item>

            <Form.Item
                label="Reparaciones realizadas"
                name="repairs"
                rules={[{ required: true, message: 'Por favor ingrese las reparaciones realizadas' }]}
            >
                <TextArea rows={4} onChange={(e) => setRepairs(e.target.value)} />
            </Form.Item>

            <Form.Item
                label="Próximo evento"
                name="next_event"
                rules={[{ required: true, message: 'Por favor ingrese el próximo evento' }]}
            >
                <DatePicker
                    format="DD/MM/YYYY"
                    // value={rotationProgramming}
                    onChange={(date, dateString) => setNextEvent(dateString)}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={handleCreate}>
                    Crear Mantenimiento
                </Button>
            </Form.Item>
        </Form>
    );

    const showMaintenanceHistory = () => {
        if (loading) {
            return <LoadingOutlined />
        }

        // if (maintenances.length === 0) {
        //     console.log("no hay mantnimientos");
        //     return <p> No hay mantenimientos registrados</p>
        // }

        const childrens = [];
        maintenances.forEach(m => {
            let children = {
                // children: m.date + ' \n ' + m.repairs + ' \n ' + m.next_event,
                children: (
                    <>
                        <p>Fecha: {m.date}</p>  <p>Reparaciones: {m.repairs}</p> <p>Proximo evento: {m.next_event}</p>
                    </>
                ),
            }
            childrens.push(children);
        });

        return childrens.reverse();
    }

    const maintenanceHistory = (
        <Timeline
            mode="alternate"
            items={showMaintenanceHistory()}
        />
    )

    const tabs = [
        {
            key: '1',
            label: 'Crear Mantenimientos',
            children: (
                truckSelected
                    ? createMaintenanceForm
                    : <p>Selecciona un camión para continuar</p>
            ),
        },
        {
            key: '2',
            label: 'Mantenimientos pasados',
            children: (
                truckSelected
                    ? maintenanceHistory
                    : <p>Selecciona un camión para continuar</p>

            ),
        },
    ];

    const getMaintenances = async (truckId) => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.GET_TRUCK + truckId;
            const response = await axios.get(URL);
            // console.log(response);
            // console.log(response.data.maintenance);
            setMaintenances(response.data.maintenance);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div style={{
            maxWidth: 800,
            marginLeft: 'auto',
            marginRight: 'auto',
        }}>
            <h1>Crear mantenimiento</h1>
            <br />
            <Title level={5}>Selecciona un camión de la lista y marca llena el siguiente formulario.</Title>
            <br />

            <Select style={{
                width: "100%",
            }} placeholder="Selecciona un camión"
                value={selectedTruck}
                onChange={(value) => {
                    setSelectedTruck(value)
                    getMaintenances(value)
                    setTruckSelected(true)
                }}>
                {trucks.map((truck) => {
                    return (
                        <Select.Option key={truck.id} value={truck.id}>
                            <Tooltip title={`Color: ${truck.color} - Marca: ${truck.brand} - Conductor: ${truck.driver.username} ${truck.driver.lastname}`}>
                                <span>{truck.plate}</span>
                            </Tooltip>
                        </Select.Option>
                    )
                })}
            </Select>
            <br />

            <br />
            <Card
                loading={loading}
                size="large"
                title=""
                style={{
                    width: "100%",
                }}
            >
                <Tabs centered defaultActiveKey="1" items={tabs} />

            </Card>

        </div>
    );
}

export default CreateMaintenanceComponent;