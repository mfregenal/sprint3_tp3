import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {
    async obtenerPorId(id) {
        return await SuperHero.findById(id);
    }

    async obtenerTodos() {
        return await SuperHero.find({});
    }

    async buscarPorAtributo(atributo, valor) {
        if ( Number(valor) ){
            return await SuperHero.find( { [atributo]:Number(valor) } );
        } else {
            return await SuperHero.find( { [atributo]:{ $regex: valor, $options: "i" } } );
        }
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find( { edad: { $gt: 30 }, planetaOrigen: { $regex: "Tierra", $options: "i" }, $expr: { $gt: [ { $size: "$poderes" }, 2 ] } } );
    }

    // TP1-SPRINT3 //
    async agregarSuperheroe(datos){
        await SuperHero.insertOne(datos);
    }

    async editarSuperheroe(id, datos){
        await SuperHero.updateOne(id, { $set: datos });
    }

    async eliminarPorId(id){
        await SuperHero.deleteOne(id);
    }

    async eliminarPorNombre(nombre) {
        await SuperHero.deleteOne(nombre);
    }
}

export default new SuperHeroRepository();