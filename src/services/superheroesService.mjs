import superHeroRepository from '../repositories/SuperHeroRepository.mjs';

export async function obtenerSuperheroePorId(id) {
    return await superHeroRepository.obtenerPorId(id);
}

export async function obtenerTodosLosSuperheroes() {
    return await superHeroRepository.obtenerTodos();
}

export async function buscarSuperheroesPorAtributo(atributo, valor) {
    return await superHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperheroesMayoresDe30() {
    return await superHeroRepository.obtenerMayoresDe30();
}

// TP1-SPRINT3 //
export async function agregarSuperheroe(datos) {
    await superHeroRepository.agregarSuperheroe(datos);
}

export async function editarSuperheroe(id, datos) {
    await superHeroRepository.editarSuperheroe(id, datos);    
}

export async function eliminarPorId(id) {
    await superHeroRepository.eliminarPorId(id);    
}

export async function eliminarPorNombre(nombre) {
    await superHeroRepository.eliminarPorNombre(nombre);
}