import { obtenerSuperheroePorId, obtenerTodosLosSuperheroes, buscarSuperheroesPorAtributo, obtenerSuperheroesMayoresDe30, agregarSuperheroe, editarSuperheroe, eliminarPorId, eliminarPorNombre } from '../services/superheroesService.mjs';
import { renderizarSuperheroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

// TP3 - SPRINT3 //
export async function obtenerTodosLosSuperheroesController(req, res) {
    try {
        const superheroes = await obtenerTodosLosSuperheroes();

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);

        res.render('dashboard', { heroes: superheroesFormateados });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener los superhéroes', error: error.message });
    }
}

export async function agregarSuperheroeController(req, res) {
    try {
        const datos = req.body;

        await agregarSuperheroe(datos);

        res.status(200).send( "Superheroe agregado correctamente" );
    } catch (error) {
        res.status(500).send( { mensaje: 'Error al agregar superheroe', error: error.message });
    }
}

export async function mostrarFormularioController(req, res) {
    // Verificar si el parámetro "id" existe en la ruta
    const vista = req.params.id ? 'editSuperhero' : 'addSuperhero';

    // Renderizar la vista correspondiente
    res.render(vista);
}

export async function obtenerSuperheroePorIdController(req, res) {
    try {
        const { id } = req.params;

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }
        
        res.status(200).send(superheroe);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener el superhéroe', error: error.message });
    }
}

export async function editarSuperheroeController(req, res) {
    try {
        const id = { _id: req.params.id };
        const datos = req.body;

        await editarSuperheroe(id, datos);

        res.status(200).send("Superhéroe actualizado correctamente")
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al actualizar superheroe', error: error.message });
    }
}

export async function eliminarPorIdController(req, res) {
    try{
        const id = { _id: req.params.id };

        const superheroe = await obtenerSuperheroePorId(id);

        if (!superheroe) {
            return res.status(404).send({ mensaje: 'Superhéroe no encontrado' });
        }

        const superheroeFormateado = renderizarSuperheroe(superheroe);

        await eliminarPorId(id);

        res.status(200).send({ "Superheroe eliminado: ": superheroeFormateado });
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar superheroe', error: error.message});
    }   
}








export async function buscarSuperheroesPorAtributoController(req, res) {
    try {
        const { atributo, valor } = req.params;

        const superheroes = await buscarSuperheroesPorAtributo(atributo, valor);

        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);

        res.status(200).send(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al buscar los superhéroes', error: error.message });
    }
}

export async function obtenerSuperheroesMayoresDe30Controller(req, res) {
    try {
        const superheroes = await obtenerSuperheroesMayoresDe30();
        
        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes mayores de 30 años' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);

        res.status(200).send(superheroesFormateados);
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al obtener superhéroes mayores de 30', error: error.message });
    }
}

export async function eliminarPorNombreController(req, res) {
    try {
        const nombre = { nombreSuperHeroe: req.params.nombre };

        const superheroes = await buscarSuperheroesPorAtributo('nombreSuperHeroe', nombre.nombreSuperHeroe);

        if (superheroes.length === 0) {
            return res.status(404).send({ mensaje: 'No se encontraron superhéroes con ese atributo' });
        }

        const superheroesFormateados = renderizarListaSuperheroes(superheroes);

        await eliminarPorNombre(nombre);

        res.status(200).send({"Superheroe eliminado: ": superheroesFormateados});
    } catch (error) {
        res.status(500).send({ mensaje: 'Error al eliminar superheroe', error: error.message});
    }
    
}

// TP3 - SPRINT3 //

