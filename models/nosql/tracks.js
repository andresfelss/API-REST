const mongooseDelete = require('mongoose-delete');
const { acceptsLanguages } = require('express/lib/request');
const mongoose = require('mongoose');
// Defnimos nuestro Modelo
const TracksSchema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        album: {
            type: String
        },
        cover:{
            type: String,
            validator: (req)=>{
                return true;
            },
            message: "ERROR_URL",
        },
        artist:{
            name:{
                type: String,
            },
            nickname: {
                type: String
            },
            nationality: {
                type: String
            },
        },
        duration: {
            start: {
                type: Number
            },
            end: {
                type: Number
            }
        },
        medioId: {
            type: mongoose.Types.ObjectId // string de tipo id en mongo
        },
    },
    {
        timestamps: true, // Nos va a registrar  createAT, updateAT (Fecha de creacion, Fecha de actualizacion)
        versionKey: false,
    }
);
TracksSchema.plugin(mongooseDelete, {overrideMethods:'all'}); // para poder usar softDelete

module.exports =mongoose.model("tracks",TracksSchema) // exportamos nuestro esquema .model('nombreTabla',Schema)