const mongooseDelete = require('mongoose-delete');
const { acceptsLanguages } = require('express/lib/request');
const mongoose = require('mongoose');
// Defnimos nuestro Modelo
const UserSchema = new mongoose.Schema(
    {
        name:{
            type: String,
        },
        age: {
            type: Number
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type:String
        },
        role:{
            type:['user','admin'],
            default: 'user'
        }
    },
    {
        timestamps: true, // Nos va a registrar  createAT, updateAT (Fecha de creacion, Fecha de actualizacion)
        versionKey: false,
    }
);

UserSchema.plugin(mongooseDelete, {overrideMethods:'all'}) // para poder usar softDelete

module.exports =mongoose.model("users",UserSchema) // exportamos nuestro esquema .model('nombreTabla',Schema)