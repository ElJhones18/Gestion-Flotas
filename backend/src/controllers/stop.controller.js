const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createStop = async (req, res) => {
    const { direction, latitude, longitude, travelId } = req.body;
    try {

        if (!travelId) {
            return res.status(400).json({ error: 'El ID del viaje es requerido' });
        }

        //validar que el viaje exista
        const travelExist = await prisma.travel.findUnique({
            where: {
                id: travelId
            }
        });

        if (!travelExist) {
            return res.status(400).json({ error: 'El viaje no existe' });
        }

        const newStop = await prisma.stop.create({
            data: {
                direction: direction,
                latitude: latitude,
                longitude: longitude,
                travelId: travelId
            }
        })
        res.json(newStop);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear la parada' });
    }
}

const listStop = async (req, res) => {
    try {
        const stop = await prisma.stop.findMany();
        res.json(stop);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar las paradas' });
    }
}

const getStop = async (req, res) => {
    try {
        const stop = await prisma.stop.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                travel: true
            }
        });
        res.json(stop);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener la parada' });
    }
}

const editStop = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            direction,
            latitude,
            longitude,
            travelId
        } = req.body;

        const stopExists = await prisma.stop.findUnique({
            where: {
                id: id
            }
        });

        const stopEdit = {
            direction: direction || stopExists.direction,
            latitude: latitude || stopExists.latitude,
            longitude: longitude || stopExists.longitude,
            travelId: travelId || stopExists.travelId
        }

        const stop = await prisma.stop.update({
            where: {
                id: id
            },
            data: stopEdit
        });

        res.json(stop);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al editar la parada' });
    }
}

const deleteStop = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.stop.delete({
            where: {
                id: id
            }
        });
        res.json({ message: 'Parada eliminada' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar la parada' });
    }
}

module.exports = {
    createStop,
    listStop,
    getStop,
    editStop,
    deleteStop
}