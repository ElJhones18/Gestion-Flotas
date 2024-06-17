const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTravel = async (req, res) => {
    const { distance, origin, destination, driverId, truckId } = req.body;
    try {

        if (!driverId) {
            return res.status(400).json({ error: 'El ID del conductor y del camión son requeridos' });
        }

        //validar que el conductor y el camion existan
        const driverExist = await prisma.users.findUnique({
            where: {
                id: driverId
            }
        });

        if (!driverExist) {
            return res.status(400).json({ error: 'El conductor no existe' });
        }

        const truckExist = await prisma.truck.findUnique({
            where: {
                id: truckId
            }
        });

        if (!truckExist) {
            return res.status(400).json({ error: 'El camión no existe' });
        }

        // Obtener el checklist asociado con el camión
        const checklist = await prisma.checklist.findUnique({
            where: { truckId: truckId }
        });

        if (!checklist) {
            return res.status(400).json({ error: 'El checklist del camión no existe' });
        }

        // Verificar que los campos del checklist estén en true
        if (!checklist.coolant || !checklist.oil_level || !checklist.tire_pressure || !checklist.lights) {
            return res.status(400).json({ error: 'El checklist del camión no está completo. Todos los campos deben estar en true.' });
        }

        const newTravel = await prisma.travel.create({
            data: {
                distance: distance,
                origin: origin,
                destination: destination,
                driverId: driverId,
                truckId: truckId
            }
        })

        await prisma.notification.create({
            data: {
                userId: driverId,
                type: 'Nuevo viaje',
                description: `Tienes un nuevo viaje con destino a ${destination}!`,
                read: false
            }
        });

        res.json(newTravel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el viaje' });
    }
}

const listTravel = async (req, res) => {
    try {
        const travel = await prisma.travel.findMany();
        res.json(travel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los viajes' });
    }
}

const getTravel = async (req, res) => {
    try {
        const travel = await prisma.travel.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                driver: true,
                stops: true
            }
        });
        res.json(travel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el viaje' });
    }
}

const editTravel = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            distance,
            origin,
            destination,
            driverId
        } = req.body;

        const travelExist = await prisma.travel.findUnique({
            where: {
                id: id
            },
            include: {
                driver: true
            }
        });

        const travelEdit = 
        {
            distance: distance || travelExist.distance,
            origin: origin || travelExist.origin,
            destination: destination || travelExist.destination,
            driverId: driverId || travelExist.driverId
        }

        const travel = await prisma.travel.update({
            where: {
                id: id
            },
            data: travelEdit,
            include: {
                driver: true
            }
        });
        res.json(travel);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar el viaje' });
    }
}

const deleteTravel = async (req, res) => {
    try {
        const { id } = req.params;

        //eliminar las paradas asociadas al viaje
        await prisma.stop.deleteMany({
            where: { travelId: id }
        });

        await prisma.travel.delete({
            where: {
                id: id
            }
        });
        res.json({ message: 'Viaje eliminado' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el viaje' });
    }
}

module.exports = {
    createTravel,
    listTravel,
    getTravel,
    editTravel,
    deleteTravel
}
