const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const createMaintenance = async (req, res) => {
    const { date, repairs, next_event, truckId } = req.body
    try {

        if (!truckId) {
            return res.status(400).json({ error: 'El ID del camión es requerido' });
        }

        //validar que el camion exista
        const truckExist = await prisma.truck.findUnique({
            where: {
                id: truckId
            }
        });

        if (!truckExist) {
            return res.status(400).json({ error: 'El camión no existe' });
        }

        const newMaintenance = await prisma.total_maintenance.create({
            data: {
                date: date,
                repairs: repairs,
                next_event: next_event,
                truckId: truckId
            }
        })
        res.json(newMaintenance);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el mantenimiento' });
    }
}

const listMaintenance = async (req, res) => {
    try {
        const maintenance = await prisma.total_maintenance.findMany(
            {
                include: {
                    truck: true
                }
            }
        );
        res.json(maintenance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los mantenimientos' });
    }
}

const getMaintenance = async (req, res) => {
    try {
        const maintenance = await prisma.total_maintenance.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                truck: true
            }
        });
        res.json(maintenance);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el mantenimiento' });
    }
}

const editMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            date,
            repairs,
            next_event,
            truckId
        } = req.body;

        const maintenanceExists = await prisma.total_maintenance.findUnique({
            where: {
                id: id
            }
        });

        if (!maintenanceExists) {
            return res.status(400).json({ error: 'El mantenimiento no existe' });
        }

        const maintenanceEdit = {
            date: date || maintenanceExists.date,
            repairs: repairs || maintenanceExists.repairs,
            next_event: next_event || maintenanceExists.next_event,
            truckId: truckId || maintenanceExists.truckId
        }

        const maintenance = await prisma.total_maintenance.update({
            where: {
                id: id
            },
            data: maintenanceEdit
        });

        res.json(maintenance);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar el mantenimiento' });
    }
}

const deleteMaintenance = async (req, res) => {
    try {
        const { id } = req.params;
        const maintenance = await prisma.total_maintenance.delete({
            where: {
                id: id
            }
        });
        res.json({ maintenance, message: 'Mantenimiento eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el mantenimiento' });
    }
}

module.exports = {
    createMaintenance,
    listMaintenance,
    getMaintenance,
    editMaintenance,
    deleteMaintenance
}