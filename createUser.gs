function createEmpleado(form) {

  for (var key in form) {
    if (form.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto directamente
      if (form[key] === "") { // Verifica si el valor de la propiedad está vacío
        form[key] = "NULL"; // Asigna "NULL" si el valor está vacío
      }
      else{
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
    }
  }

  var idEmpleadoFlag = form.idEmpleado;
  var lrPersona=sheetPersona.getLastRow()+1;
  var lrEmpleado=sheetEmpleado.getLastRow()+1;

  if(idEmpleadoFlag === '0'){
    var idPersona = createNewId(sheetPersona);
    var idEmpleado = createNewId(sheetEmpleado);

    sheetPersona.appendRow([
      idPersona,
      form.nombreEmpleado.toUpperCase(),
      form.apellidoEmpleado.toUpperCase(),
      form.celularEmpleado,
      form.departamentoEmpleado.toUpperCase(),
      form.ciudadEmpleado.toUpperCase(),
      form.direccionEmpleado.toUpperCase(),
      form.emailEmpleado.toLowerCase(),
      '=$A'+lrPersona+'&"-"&$B'+lrPersona+'&"-"&$C'+lrPersona+'&"-"&$D'+lrPersona
    ]);

    sheetEmpleado.appendRow([
      idEmpleado,
      idPersona,
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;2;0)',
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;3;0)',
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;4;0)',
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;5;0)',
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;6;0)',
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;7;0)',
      '=VLOOKUP($B'+lrEmpleado+';tabla_persona;8;0)',
      form.salarioEmpleado,
      form.epsEmpleado.toUpperCase(),
      form.cargoEmpleado.toUpperCase(),
      '=$A'+lrEmpleado+'&"-"&VLOOKUP($B'+lrEmpleado+';tabla_persona;9;0)'
    ]);

    return "Nuevo empleado agregado a la base de datos";
  }
  else
  {

  }
};

function createVendedor(form){

  console.log("SI ENTRA EN LAS FUNCIONES VENDEDOR CREATE");

  for (var key in form) {
    if (form.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto directamente
      if (form[key] === "") { // Verifica si el valor de la propiedad está vacío
        form[key] = "NULL"; // Asigna "NULL" si el valor está vacío
      }
      else{
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
    }
  }

  console.log("VALOR DE SWITCH");
  console.log(form);

  var idVendedorFlag = form.idVendedor;
  var lrPersona=sheetPersona.getLastRow()+1;
  var lrVendedor=sheetVendedor.getLastRow()+1;

  if(idVendedorFlag == '0'){
    var idPersona = createNewId(sheetPersona);
    var idVendedor = createNewId(sheetVendedor);

    sheetPersona.appendRow([
      idPersona,
      form.nombreVendedor.toUpperCase(),
      form.apellidoVendedor.toUpperCase(),
      form.celularVendedor,
      form.departamentoVendedor.toUpperCase(),
      form.ciudadVendedor.toUpperCase(),
      form.direccionVendedor.toUpperCase(),
      form.emailVendedor.toLowerCase(),
      '=$A'+lrPersona+'&"-"&$B'+lrPersona+'&"-"&$C'+lrPersona+'&"-"&$H'+lrPersona
    ]);
    sheetVendedor.appendRow([
      idVendedor,
      idPersona,
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;2;0)',
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;3;0)',
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;4;0)',
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;5;0)',
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;6;0)',
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;7;0)',
      '=VLOOKUP($B'+lrVendedor+';tabla_persona;8;0)',
      form.epsVendedor.toUpperCase(),
      'VENDEDOR',
      form.metaVendedor,
      '=SUMIF(venta!G:G;A'+lrVendedor+';venta!D:D)',
      '=COUNTIF(venta!G:G;A'+lrVendedor+')',
      '=$A'+lrVendedor+'&"-"&VLOOKUP($B'+lrVendedor+';tabla_persona;9;0)',
      form.idCalendarDemos,
      form.idCalendarProgramas,
      String(form.activoVendedor)
    ]);

    return "Nuevo vendedor agregado a la base de datos";
  }
  else
  {

  }
};

function createCliente(form){

  console.log("SI ENTRA EN LAS FUNCIONES CLIENTE CREATE");

  for (var key in form) {
    if (form.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto directamente
      if (form[key] === "") { // Verifica si el valor de la propiedad está vacío
        form[key] = "NULL"; // Asigna "NULL" si el valor está vacío
      }
      else{
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
    }
  }

  console.log("VALOR DE SWITCH");
  console.log(form.activoCliente);

  var idClienteFlag = form.idCliente;
  var lrPersona=sheetPersona.getLastRow()+1;
  var lrCliente=sheetCliente.getLastRow()+1;
  var idVendedor = form.vendedorCliente.split('-')[0];
  var idEmpleado = form.empleadoCliente.split('-')[0];
  var idContactoReferente = form.contacto_referenteCliente.split('-')[0];
  var idPrograma = form.programaCliente.split('-')[0];

  if(idClienteFlag == '0'){
    var idPersona = createNewId(sheetPersona);
    var idCliente = createNewId(sheetCliente);

    sheetPersona.appendRow([
      idPersona,
      form.nombreCliente.toUpperCase(),
      form.apellidoCliente.toUpperCase(),
      form.celularCliente,
      form.departamentoCliente.toUpperCase(),
      form.ciudadCliente.toUpperCase(),
      form.direccionCliente.toUpperCase(),
      form.emailCliente.toLowerCase(),
      '=$A'+lrPersona+'&"-"&$B'+lrPersona+'&"-"&$C'+lrPersona+'&"-"&$D'+lrPersona
    ]);
    sheetCliente.appendRow([
      idCliente,
      idPersona,
      idVendedor,
      idEmpleado,
      idContactoReferente,
      '=VLOOKUP($B'+lrCliente+';tabla_persona;2;0)',
      '=VLOOKUP($B'+lrCliente+';tabla_persona;3;0)',
      '=VLOOKUP($B'+lrCliente+';tabla_persona;4;0)',
      '=VLOOKUP($B'+lrCliente+';tabla_persona;5;0)',
      '=VLOOKUP($B'+lrCliente+';tabla_persona;6;0)',
      '=VLOOKUP($B'+lrCliente+';tabla_persona;7;0)',
      '=VLOOKUP($B'+lrCliente+';tabla_persona;8;0)',
      String(form.activoCliente),
      '=$A'+lrCliente+'&"-"&VLOOKUP($B'+lrCliente+';tabla_persona;9;0)',
      '=VLOOKUP($C'+lrCliente+';tabla_vendedor;15;0)',
      '=VLOOKUP($D'+lrCliente+';tabla_empleado;13;0)',
      '=IF($E'+lrCliente+'=0;"0-NO APLICA";VLOOKUP($E'+lrCliente+';tabla_cliente;14;0))',
      idPrograma,
      form.origenCliente.toUpperCase(),
      '=IF($R'+lrCliente+'=0;"0-NO APLICA";VLOOKUP($R'+lrCliente+';tabla_programa;16;0))',
      form.nucleoCliente.toUpperCase()
    ]);

    return "Nuevo cliente agregado a la base de datos";
  }
  else
  {

  }
};

function createPrograma(form){

  for (var key in form) {
    if (form.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto directamente
      if (form[key] === "") { // Verifica si el valor de la propiedad está vacío
        form[key] = "NULL"; // Asigna "NULL" si el valor está vacío
      }
      else{
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
    }
  }

  var idProgramaFlag = form.idPrograma;
  var lrPrograma=sheetPrograma.getLastRow()+1;
  var idCliente = form.clientePrograma.split('-')[0];
  var idVendedor = form.vendedorPrograma.split('-')[0];
  if(idProgramaFlag == '0'){
    var idPrograma = createNewId(sheetPrograma);
    const filaCliente = buscarFila(idCliente,sheetCliente);
    var cliente = sheetCliente.getRange("N"+filaCliente).getValue();
    var nombrePrograma = idPrograma + '-PROGRAMA 4 EN 14-'+cliente;
    // PROCESO FECHA
    // Convertir la cadena de fecha en un objeto Date
    var fechaForm = new Date(form.fechaPrograma);

    // Sumar 14 días a la fecha
    fechaForm.setDate(fechaForm.getDate() + 14);

    // Formatear la nueva fecha en el mismo formato de string
    var nuevaFechaString = fechaForm.toISOString().split('T')[0];
    // FIN PROCESO FECHA
    var partes = nuevaFechaString.split("-");
    var fechaProgramaFormated = partes[1] + "/" + partes[2] + "/" + partes[0];
    var fechaInicioPrograma = String(fechaProgramaFormated) + ' ' + '10:00';
    var fechaFinPrograma = String(fechaProgramaFormated) + ' ' + '11:00';
    
    // Para ID Calendar vendedor
    var filaVendedor = buscarFila(idVendedor,sheetVendedor);
    var idCalendarPrograma = sheetVendedor.getRange("Q"+filaVendedor).getValue();

    // CREACION DEL EVENTO EN CALENDAR
    var idEventoCalendar = crearEventoCalendar(idCalendarPrograma,nombrePrograma,fechaInicioPrograma,fechaFinPrograma,'',"FIN PROGRAMA 4 EN 14");
    sheetPrograma.appendRow([
      idPrograma,
      idCliente,
      idVendedor,
      '4 EN 14',
      form.fechaPrograma,
      '=TEXT($E'+lrPrograma+'+14;"mm/dd/yyyy")&" 10:00"',
      '=TEXT($E'+lrPrograma+'+14;"mm/dd/yyyy")&" 11:00"',
      14,
      '=TODAY()-$E'+lrPrograma,
      form.premioPrograma,
      '=IF($E'+lrPrograma+'-TODAY()>-1;"ACTIVO";"VENCIDO")',
      form.resultadoPrograma,
      '=COUNTIF(cliente!R:R;"="&A'+lrPrograma+')',
      '=COUNTIFS(cliente!R:R;"="&A'+lrPrograma+';cliente!M:M;"=on")',
      '=VLOOKUP(B'+lrPrograma+';tabla_cliente;14;0)',
      '=A'+lrPrograma+'&"-"&D'+lrPrograma+'&"-"&O'+lrPrograma,
      idEventoCalendar,
      '=VLOOKUP($C'+lrPrograma+';tabla_vendedor;15;0)'
    ]);

    return "Nuevo programa agregado a la base de datos";
  }
  else
  {

  }
};

function createEvento(form){

  for (var key in form) {
    if (form.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto directamente
      if (form[key] === "") { // Verifica si el valor de la propiedad está vacío
        form[key] = "NULL"; // Asigna "NULL" si el valor está vacío
      }
      else{
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
    }
  }

  var idEventoFlag = form.idEvento;
  var idVendedor = form.vendedorEvento.split('-')[0];
  var idEmpleado = form.empleadoEvento.split('-')[0];
  var idCliente = form.clienteEvento.split('-')[0];
  var idPrograma = form.programaEvento.split('-')[0];
  var nombreEvento = form.tipoEvento +" // "+ form.clienteEvento;
  var partes = form.fechaEvento.split("-");
  var fechaEventoFormated = partes[1] + "/" + partes[2] + "/" + partes[0];
  var fechaInicioEvento = String(fechaEventoFormated) + ' ' + String(form.horaInicioEvento);
  var fechaFinEvento = String(fechaEventoFormated) + ' ' + String(form.horaFinEvento);
  // Datos del cliente
  const filaCliente = buscarFila(idCliente,sheetCliente);
  var cliente = sheetCliente.getRange("F"+filaCliente).getValue()+" "+sheetCliente.getRange("G"+filaCliente).getValue();
  var celularCliente = sheetCliente.getRange("H"+filaCliente).getValue();
  var departamentoCliente = sheetCliente.getRange("I"+filaCliente).getValue();
  var ciudadCliente = sheetCliente.getRange("J"+filaCliente).getValue();
  var direccionCliente = sheetCliente.getRange("K"+filaCliente).getValue();
  var contactoRef = sheetCliente.getRange("Q"+filaCliente).getValue();
  var origenCliente = sheetCliente.getRange("S"+filaCliente).getValue();
  var nucleoCliente = sheetCliente.getRange("U"+filaCliente).getValue();
  var programaCliente =  sheetCliente.getRange("T"+filaCliente).getValue();
  var asesorCliente =  sheetCliente.getRange("O"+filaCliente).getValue();

  var miDescripcion = "<font color='#9000CB'><b>Cliente:</b></font>&emsp;"+cliente+"<br>"+
  "<font color='#EAA300'><b>Celular:</b></font>&emsp;"+celularCliente+"<br>"+
  "<font color='#9000CB'><b>Departamento:</b></font>&emsp;"+departamentoCliente+"<br>"+
  "<font color='#EAA300'><b>Ciudad:</b></font>&emsp;"+ciudadCliente+"<br>"+
  "<font color='#9000CB'><b>Dirección:</b></font>&emsp;"+direccionCliente+"<br>"+
  "<font color='#EAA300'><b>Contacto Referente:</b></font>&emsp;"+contactoRef+"<br>"+
  "<font color='#9000CB'><b>Origen:</b></font>&emsp;"+origenCliente+"<br>"+
  "<font color='#EAA300'><b>Nucleo:</b></font>&emsp;"+nucleoCliente+"<br>"+
  "<font color='#9000CB'><b>Programa:</b></font>&emsp;"+programaCliente+"<br>"+
  "<font color='#EAA300'><b>Asesor:</b></font>&emsp;"+asesorCliente+"<br>"+
  "<font color='#9000CB'><b>Observaciones:</b></font>&emsp;"+form.observacionesEvento+"<br>";

  // Para ID Calendar vendedor
  var filaVendedor = buscarFila(idVendedor,sheetVendedor);
  var idCalendarEvento = sheetVendedor.getRange("P"+filaVendedor).getValue();
  console.log("ESTE ES EL ID DEL VENDEDOR CON ID: "+idVendedor);
  console.log("CALENDAR ID: "+idCalendarEvento);
  var correos = "";
  if(form.correosEvento.toUpperCase() != "NULL"){
    correos = form.correosEvento;
  }
  

  var idEventoCalendar = crearEventoCalendar(idCalendarEvento, nombreEvento,fechaInicioEvento,fechaFinEvento,correos,miDescripcion);
  //arreglar formato de la hora
  var horaInicioEvento = form.horaInicioEvento;
  var horaFinEvento = form.horaFinEvento;
  if(form.horaInicioEvento.length === 4){
    horaInicioEvento = '0'+horaInicioEvento;
  }
  if(form.horaFinEvento.length === 4){
    horaFinEvento = '0'+horaFinEvento;
  }
  console.log("HORAS DE INICIO Y FIN");
  console.log(horaInicioEvento);
  console.log(horaFinEvento);


  if(idEventoFlag == '0'){
    var idEvento = createNewId(sheetEvento);
    var lr=sheetEvento.getLastRow()+1;

    sheetEvento.appendRow([
      idEvento,
      idVendedor,
      idEmpleado,
      idCliente,
      form.tipoEvento.toUpperCase(),
      form.estadoEvento.toUpperCase(),
      form.resetPersona.toUpperCase(),
      form.resetMotivo.toUpperCase(),
      form.fechaEvento,
      horaInicioEvento,
      horaFinEvento,
      '=TEXT($I'+lr+';"mm/dd/yyyy"&" "&TEXT($J'+lr+';"hh:mm"))',
      '=TEXT($I'+lr+';"mm/dd/yyyy"&" "&TEXT($K'+lr+';"hh:mm"))',
      form.correosEvento.toLowerCase(),
      form.observacionesEvento,
      '=VLOOKUP($B'+lr+';tabla_vendedor;15;0)',
      '=VLOOKUP($C'+lr+';tabla_empleado;13;0)',
      '=VLOOKUP($D'+lr+';tabla_cliente;14;0)',
      '=A'+lr+'&" - "&E'+lr+'&" - "&R'+lr,
      idEventoCalendar,
      idPrograma,
      '=IF($U'+lr+'=0;"0-NO APLICA";VLOOKUP($U'+lr+';tabla_programa;16;0))'
    ]);

    return "Nuevo seguimiento agregado a la base de datos";
  }
  else
  {

  }
};

function createVenta(form){

  for (var key in form) {
    if (form.hasOwnProperty(key)) { // Verifica si la propiedad pertenece al objeto directamente
      if (form[key] === "") { // Verifica si el valor de la propiedad está vacío
        form[key] = "NULL"; // Asigna "NULL" si el valor está vacío
      }
      else{
        if (typeof form[key] === "string") {
          form[key] = form[key].trim();
        }
      }
    }
  }

  var idVentaFlag = form.idVenta;
  var lrVenta=sheetVenta.getLastRow()+1;
  var idEvento = form.eventoVenta.split('-')[0];

  if(idVentaFlag == '0'){

    var idVenta = createNewId(sheetVenta);

    sheetVenta.appendRow([
      idVenta,
      idEvento,
      form.articuloVenta.toUpperCase(),
      form.valorVenta,
      form.modoPagoVenta,
      '=VLOOKUP(B'+lrVenta+';tabla_evento;19;0)',
      '=VLOOKUP(B'+lrVenta+';tabla_evento;2;0)',
      '=VLOOKUP($G'+lrVenta+';tabla_vendedor;15;0)',
      '=VLOOKUP($B'+lrVenta+';tabla_evento;9;0)'
    ]);

    return "Nueva venta agregado a la base de datos";
  }
  else
  {

  }
};

function createNewId(mySheet){
  let id = 1;
  if(mySheet.getLastRow() === 1){
    return id;
  }
  var ids = mySheet.getRange(2,1,mySheet.getLastRow()-1,1).getValues().map(id=>id[0]);
  let maxId = 0;
  ids.forEach(id=>{
    if(id > maxId){
      maxId = id;
    }
  });
  return maxId + 1;
}

function crearEventoCalendar(idCalendar, nombreEvento, fechaInicio, fechaFin, correos, descripcion){

  var calendario = CalendarApp.getCalendarById(idCalendar);

  var event = calendario.createEvent(
    nombreEvento,
    new Date(fechaInicio),
    new Date(fechaFin),
    {guests: correos,
    description: descripcion}
  );
  return event.getId();
}

function buscarFila(miId, mysheet){
  const ids = mysheet.getRange(2,1,mysheet.getLastRow()-1,1).getValues().map(id => id[0]);
  const index = ids.indexOf(Number(miId));
  const row = index + 2;
  return row;
}
