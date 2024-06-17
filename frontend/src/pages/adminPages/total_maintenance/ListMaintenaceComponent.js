import { DatePicker, Form, Input, Modal, Timeline, message } from "antd";
import { LoadingOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { PATHS } from "../../../utils/config";
import axios from "axios";
import { useEffect, useState } from "react";

const ListMaintenanceComponent = () => {

    const [maintenances, setMaintenances] = useState([]);
    const [selectedMaintenance, setSelectedMaintenance] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const [date, setDate] = useState('');
    const [repairs, setRepairs] = useState('');
    const [next_event, setNextEvent] = useState('');

    useEffect(() => {
        fetchMaintenances();
    }, []);

    const fetchMaintenances = async () => {
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.LIST_MAINTENANCES;
            const response = await axios.get(URL);
            // console.log(response.data);
            setMaintenances(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
        }
    }

    const handleEdit = async (id) => {
        const maintenance = maintenances.find((m) => m.id == id);
        console.log(maintenance);
        setSelectedMaintenance(maintenance);
        setRepairs(maintenance.repairs);
        setIsModalVisible(true);
    }

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "¿Quiere eliminar este mantenimiento?",
            content: "Esta elección no se puede revertir",
            async onOk() {
                try {
                    const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.DELETE_MAINTENANCE + id;
                    const response = await axios.delete(URL);
                    console.log(response);
                    if (response.status === 200) {
                        message.success("Mantenimiento eliminado correctamente");
                        fetchMaintenances();
                    }
                } catch (error) {
                    message.error("Error al eliminar el mantenimiento");
                    console.log(error);
                }
            },
            onCancel() {
                console.log("Cancel");
            },
        });
    }

    const actions = (id) => (
        <div>
            <EditOutlined
                style={{ marginRight: 10, fontSize: "24px", color: 'blue' }}
                onClick={() => handleEdit(id)} />
            <DeleteOutlined
                style={{ fontSize: "24px", color: 'red' }}
                onClick={() => handleDelete(id)}
            />
        </div>
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
                label: actions(m.id),
                // children: m.date + ' \n ' + m.repairs + ' \n ' + m.next_event,
                children: (
                    <>
                        <p> <b>Fecha:</b> {m.date}</p>  <p><b>Reparaciones:</b> {m.repairs}</p> <p><b>Proximo evento:</b> {m.next_event}</p>
                    </>
                ),
            }
            childrens.push(children);
        });

        return childrens.reverse();
    }

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedMaintenance(null);
        setDate('');
        setRepairs('');
        setNextEvent('');
    };

    const handleOk = async () => {
        const maintenance = {
            date: date || selectedMaintenance.date,
            repairs: repairs || selectedMaintenance.repairs,
            next_event: next_event || selectedMaintenance.next_event,
            truckId: selectedMaintenance.truckId
        }
        console.log(maintenance);
        try {
            const URL = PATHS.BASE_PATH + PATHS.API_ROUTES.EDIT_MAINTENANCE + selectedMaintenance.id;

            const response = await axios.patch(URL, maintenance);

            setIsModalVisible(false);
            setSelectedMaintenance(null);
            setDate('');
            setRepairs('');
            setNextEvent('');
            console.log(response);
            if (response.status === 200) {
                message.success('Mantenimiento editado correctamente');
                fetchMaintenances();
            }
        } catch (error) {
            console.error(error);
            message.error('Error al editar el mantenimiento');
        }
    }

    return (
        <div>
            {loading && <LoadingOutlined />}
            <h1>Historial de mantenimientos</h1>

            <Timeline
                style={{ marginTop: 20, marginRight: "20%" }}
                mode="left"
                items={showMaintenanceHistory()}
            />

            {selectedMaintenance && (
                <Modal
                    title="Editar MAntenimiento"
                    open={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <Form>
                        <Form.Item label="Fecha"
                            rules={[{ required: true, message: "Por favor ingrese la fecha" }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                // value={rotationProgramming}
                                onChange={(date, dateString) => setDate(dateString)}
                            />
                        </Form.Item>

                        <Form.Item label="Reparaciones"
                            rules={[{ required: true, message: "Por favor ingrese las reparaciones" }]}>
                            <Input
                                id="repairs"
                                value={repairs}
                                onChange={(e) => setRepairs(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item label="Próximo evento"
                            rules={[{ required: true, message: "Por favor ingrese el proximo evento" }]}>
                            <DatePicker
                                format="DD/MM/YYYY"
                                // value={rotationProgramming}
                                onChange={(date, dateString) => setNextEvent(dateString)}
                            />
                        </Form.Item>
                    </Form>
                </Modal>
            )}
        </div>
    );
}

export default ListMaintenanceComponent;