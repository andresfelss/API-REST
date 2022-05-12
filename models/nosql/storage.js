const mongooseDelete = require('mongoose-delete');
// const { acceptsLanguages } = require('express/lib/request');
const mongoose = require('mongoose');

// Defnimos nuestro Modelo de storage
const StorageSchema = new mongoose.Schema(
    {
        url:{
            type: String,
        },
        filename: {
            type: String
        }
    },
    {
        timestamps: true, // Nos va a registrar  createAT, updateAT (Fecha de creacion, Fecha de actualizacion)
        versionKey: false,
    }
);

StorageSchema.plugin(mongooseDelete, {overrideMethods:'all'}); // para poder usar softDelete
module.exports =mongoose.model("storage",StorageSchema) // exportamos nuestro esquema .model('nombreTabla',Schema)