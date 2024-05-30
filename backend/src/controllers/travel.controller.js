const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createTravel = async (req, res) => {
    const { distance, origin, destination, driverId, truckId } = req.body;
    try {

        if (!driverId || !truckId) {
            return res.status(400).json({ error: 'El ID del conductor y del camión son requeridos' });
        }

        //validar que el conductor y el camion existan
        const driverExist = await prisma.drivers.findUnique({
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
            return res.status(400).json({ error: 'El camion no existe' });
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
                truck: true
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
            driverId,
            truckId
        } = req.body;

        const travelExist = await prisma.travel.findUnique({
            where: {
                id: id
            },
            include: {
                driver: true,
                truck: true
            }
        });

        const travelEdit = 
        {
            distance: distance || travelExist.distance,
            origin: origin || travelExist.origin,
            destination: destination || travelExist.destination,
            driverId: driverId || travelExist.driverId,
            truckId: truckId || travelExist.truckId
        }

        const travel = await prisma.travel.update({
            where: {
                id: id
            },
            data: travelEdit,
            include: {
                driver: true,
                truck: true
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