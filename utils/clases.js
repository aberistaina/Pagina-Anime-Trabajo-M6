const { v4: uuid } = require("uuid");

class Anime {


    constructor({ id, nombre, genero, year, autor, imagen, descripcion }) {
        this.id = id || uuid().slice(0, 3);
        this.nombre = nombre;
        this.genero = genero;
        this.year = year;
        this.autor = autor;
        this.imagen = imagen,
        this.descripcion = descripcion
    }

}

module.exports = Anime
