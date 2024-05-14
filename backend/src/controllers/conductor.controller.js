const { Prisma, PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const CreateConductor = async (req, res) => {
    const { nombre, apellido, cedula, celular, email, rendimiento_conduccion, historial_viajes, tareas_realizar } = req.body;
    try {
        const newConductor = await prisma.conductor.create({
            data: {
                nombre: nombre,
                apellido: apellido,
                cedula: cedula,
                celular: celular,
                email: email,
                rendimiento_conduccion: rendimiento_conduccion,
                historial_viajes: {
                    create: {
                        ruta: historial_viajes.ruta,
                        tiempo: historial_viajes.tiempo,
                    },
                },
                tareas_realizar: {
                    create: {
                        tipo: tareas_realizar.tipo,
                        descripcion: tareas_realizar.descripcion,
                    }
                }
            }
        })
        res.json(newConductor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el conductor' });
    }
};

const ListConductor = async (req, res) => {
    try {
        const conductor = await prisma.conductor.findMany();
        res.json(conductor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al listar los conductores' });
    }
};

const getConductor = async (req, res) => {
    try {
        const conductor = await prisma.conductor.findUnique({
            where: {
                id: req.params.id
            }
        });
        res.json(conductor);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el conductor' });
    }
};

const editConductor = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            nombre,
            apellido,
            cedula,
            celular,
            email,
            rendimiento_conduccion,
            historial_viajes,
            tareas_realizar
        } = req.body;

        // Obtener el conductor existente
        const conductorExistente = await prisma.conductor.findUnique({
            where: { id: id },
            include: {
                historial_viajes: true,
                tareas_realizar: true,
            },
        });

        if (!conductorExistente) {
            return res.status(404).json({ error: 'Conductor no encontrado' });
        }

        // Actualizar solo los campos proporcionados
        const conductorEdit = {
            nombre: nombre || conductorExistente.nombre,
            apellido: apellido || conductorExistente.apellido,
            cedula: cedula || conductorExistente.cedula,
            celular: celular || conductorExistente.celular,
            email: email || conductorExistente.email,
            rendimiento_conduccion: rendimiento_conduccion || conductorExistente.rendimiento_conduccion,
        };

        if (historial_viajes && historial_viajes.id) {
            conductorEdit.historial_viajes = {
                update: {
                    where: { id: historial_viajes.conductorId },
                    data: {
                        ruta: historial_viajes.ruta || undefined,
                        tiempo: historial_viajes.tiempo || undefined,
                    },
                },
            };
        }

        if (tareas_realizar && tareas_realizar.id) {
            conductorEdit.tareas_realizar = {
                update: {
                    where: { id: tareas_realizar.conductorId },
                    data: {
                        tipo: tareas_realizar.tipo || undefined,
                        descripcion: tareas_realizar.descripcion || undefined,
                    },
                },
            };
        }

        // Actualizar el conductor
        const conductorActualizado = await prisma.conductor.update({
            where: { id: id },
            data: conductorEdit,
            include: {
                historial_viajes: true,
                tareas_realizar: true,
            },
        });

        res.status(200).json(conductorActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al editar el conductor' });
    }
};

const deleteConductor = async (req, res) => {
    try {
        const { id } = req.params;

        //eliminar las tareas asociadas al conductor
        await prisma.tareas.deleteMany({
            where: { conductorId: id }
        });

        //eliminar los viajes asociados al conductor
        await prisma.viajes.deleteMany({
            where: { conductorId: id }
        });

        const conductorDelete = await prisma.conductor.delete({
            where: { id }
        });

        res.status(200).json(conductorDelete);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el conductor' });
    }
};

module.exports = {
    CreateConductor,
    ListConductor,
    getConductor,
    editConductor,
    deleteConductor,
}