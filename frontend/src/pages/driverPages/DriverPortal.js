import { useEffect, useState } from "react";
import { PATHS } from "../../utils/config";
import { Collapse, Divider, Descriptions, Tabs, Card, Timeline } from 'antd';
import { TruckOutlined, UnorderedListOutlined, IdcardOutlined, LoadingOutlined } from '@ant-design/icons';

const DriverPortal = () => {
    const [driver, setDriver] = useState({});
    const [tasks, setTasks] = useState({});
    const [travels, setTravels] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDriverData();
    }, []);

    const fetchDriverData = async () => {
        try {
            const email = localStorage.getItem('user');
            const response = await fetch(`${PATHS.BASE_PATH}${PATHS.API_ROUTES.GET_USER_BY_EMAIL}${email}`);
            const data = await response.json();
            setDriver(data);
            setTasks(data.tasks);
            setTravels(data.history_travel);
            console.log(data);
            console.log(data.tasks);
            console.log(data.history_travel);
            setLoading(false);
        } catch (error) {
            console.log(error);
        }
    }

    const generalInfo = [
        {
            key: '1',
            label: 'Nombre',
            children: driver.username,
        },
        {
            key: '2',
            label: 'Apellido',
            children: driver.lastname,
        },
        {
            key: '3',
            label: 'Telefono',
            children: driver.phone,
        },
        {
            key: '4',
            label: 'Cédula',
            children: driver.cedula,
        },
        {
            key: '5',
            label: 'Correo',
            children: driver.email,
        },
        {
            key: '6',
            label: 'Rendimiento como conductor',
            children: driver.performance_driver,
        },
    ];

    const showTasksByState = (state) => {
        if (loading) {
            return <LoadingOutlined />
        }
        return (
            tasks.map(task => (
                task.state === state &&
                <Card
                    size="small"
                    title={task.type}
                    style={{
                        width: 250,
                        marginRight: 16,
                        marginBottom: 16,
                    }}
                >
                    <p>{task.description}</p>
                </Card>
            ))
        )
    }

    const showTravels = () => {
        if (loading) {
            return <LoadingOutlined />
        }

        const childrens = [];
        travels.forEach(travel => {
            let children = {
                children: travel.origin + ' - ' + travel.distance + ' - ' + travel.destination,
            }
            childrens.push(children);
        });

        return childrens;
    }

    const tasksTabs = [
        {
            key: '1',
            label: 'Por hacer',
            children: (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {showTasksByState("Por hacer")}
                </div>
            ),
        },
        {
            key: '2',
            label: 'En progreso',
            children: (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {showTasksByState("En progreso")}
                </div>
            ),
        },
        {
            key: '3',
            label: 'Realizadas',
            children: (
                <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {showTasksByState("Realizada")}
                </div>
            ),
        },
    ];

    if (loading) {
        return <LoadingOutlined />
    }
    return (

        <div>
            <h1>Portal del Conductor</h1>
            <p>Bienvenido, {driver.username} {driver.lastname}, en esta pagina podrás revisar toda tu Información como conductor de CocaCola. </p>

            <Divider orientation="left">Información general</Divider>
            <Collapse
                expandIconPosition="end"
                size="large"
                items={[{
                    key: '1', label: <IdcardOutlined style={{ fontSize: '24px' }} />,
                    children: <Descriptions layout="vertical" items={generalInfo} />
                }]}
            />

            <Divider orientation="left">Tus tareas</Divider>
            <Collapse
                expandIconPosition="end"
                size="large"
                items={[{
                    key: '1', label: <UnorderedListOutlined style={{ fontSize: '24px' }} />,
                    children:
                        <Tabs centered defaultActiveKey="1" items={tasksTabs} />
                }]}
            />

            <Divider orientation="left">Tu historial de viajes</Divider>
            <Collapse
                expandIconPosition="end"
                size="large"
                items={[{
                    key: '1', label: <TruckOutlined style={{ fontSize: '24px' }} />,
                    children:
                        <Timeline
                            mode="alternate"
                            items={showTravels()}
                        />
                }]}
            />
        </div>
    )
}

export default DriverPortal;