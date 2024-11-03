'use strict'

//Cargamos el módulo de mongoose
import mongoose from 'mongoose';
var Schema = mongoose.Schema;

//Definimos el esquema
var Task = Schema({
    description: String,
      assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['Pendiente', 'En progreso', 'Completada'], default: 'Pendiente' },
    inhabitant: {type: Schema.Types.ObjectId, ref: 'Inhabitant', required: false},
    zone: {type: Schema.Types.ObjectId, ref: 'Zone', required: false},
});

//exportamos el esquema
export default mongoose.model('Task', Task);