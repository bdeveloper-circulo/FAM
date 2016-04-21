// requiero la libreria z-schema, es una notacion para validar json
var zschema = require('z-schema');

var validator = new zschema();

// defino el schema contra el que verifica
// mas info en http://json-schema.org/latest/json-schema-validation.html
var schema = {
  id: 'form',              // nombre de verificador
  type: 'object',          // no es un array, es un objeto el parametro
  properties: {            // define propiedades del objeto
    name: {                // nombre de propiedad
      type: 'string'       // tipo del que va a ser
    },
    correo_electronico: {  // nombre de propiedad
      type: 'string',      // tipo esperado
      format: 'email'      // define formatos predefinidos, onda date etc
    },
    docente: {             // nombre de propiedad
      tyoe: 'string',      // tipo esperado
      enum: ['0', '1']     // o '0' o '1'
    },
    participo_foro: {      // nombre de propiedad
      type: 'string',      // tipo esperado
      enum: ['0','1']      // o '0' o '1'
    },
    comentario: {          // nombre de propiedad
      type: 'string'       // tipo esperado
    },
    archivo1: {            // nombre de propiedad
      type: 'string'       // tipo esperado
    },
    archivo2: {            // nombre de propiedad
      type: 'string'       // tipo esperado
    },
    archivo31: {           // nombre de propiedad
      type: 'string'       // tipo esperado
    },
    submit: {              // nombre de propiedad
      type: 'string'       // tipo esperado
    },
    verif_foroambmuni: {   // nombre de propiedad
      type: 'string',      // tipo esperado
      pattern: '^circulo\.digital2016xcvf$'  // regex contra el que matchea
    }
  },
  required: ['name', 'correo_electronico', 'docente', 'participo_foro', 'comentario'] // campos que deben estar presentes obligatoriamente
}


// exporto un validador basico
exports.formvalidator = function(data) {
  return validator.validate(data, schema);
};
