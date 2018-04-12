export default {
  visitor: {
    ids: [
      'motherSurname',
      'fatherSurname',
      'name',
      'phone',
      'birthday',
      'address',
      'email',
      'addressReference',
      'facebook',
      'createdAt'
    ],
    header: 'Apellido materno,Apellido paterno,Nombre,Telefono,Fecha de nacimiento,Dirección,Correo,Referencia,Facebook,Fecha de creación\n'
  },
  patient: {
    ids: [
      'motherSurname',
      'fatherSurname',
      'name',
      'phone',
      'birthday',
      'civilStatus',
      'documentType',
      'document',
      'address',
      'residence',
      'nacionality',
      'sex',
      'email',
      'pathological',
      'surgical',
      'occupation',
      'degree',
      'addressReference',
      'facebook',
      'alergies',
      'createdAt'
    ],
    header: 'Apellido materno,Apellido paterno,Nombre,Telefono,Fecha de nacimiento,Estado civil,Tipo de documento,Documento,Dirección,Procedencia,Lugar de nacimiento,Sexo,Correo,Antecedentes patológicos,Antecedentes cirúrgicos,Ocupación,Grado de instrucción,Referencia,Facebook,Alergías,Fecha de creación\n'
  }
}
