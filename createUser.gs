
// Obtener el valor de la celda anterior en la columna A
//var celdaAnterior = hoja.getRange(hoja.getLastRow(), 1).getValue();

function createEmpleado(form) {

  console.log(form)

  console.log("SI ENTRA A LA FUNCION");

  var idEmpleadoFlag = form.idEmpleado;
  var lrPersona=sheetPersona.getLastRow()+1;
  console.log("EN LA FILA"+lrPersona);
  var lrEmpleado=sheetEmpleado.getLastRow()+1;
  console.log("EN LA FILA"+lrEmpleado);

  if(idEmpleadoFlag === '0'){
    console.log(form);
    var idPersona = createNewId(sheetPersona);
    var idEmpleado = createNewId(sheetEmpleado);


    console.log("va a crear una nueva persona");
    console.log("EN LA FILA"+lrPersona);
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

    console.log("Supuestamente creó la persona en la fila "+lrPersona);
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
    console.log("Supuestamente creó el empleado en la fila "+lrEmpleado);

    return "Nuevo empleado agregado a la base de datos";
  }
  else
  {

  }
};

function createVendedor(form){

  var idVendedorFlag = form.idVendedor;
  var lrPersona=sheetPersona.getLastRow()+1;
  var lrVendedor=sheetVendedor.getLastRow()+1;
  console.log(form);

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
      '=$A'+lrPersona+'&"-"&$B'+lrPersona+'&"-"&$C'+lrPersona+'&"-"&$D'+lrPersona
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
      form.cargoVendedor.toUpperCase(),
      form.metaVendedor,
      form.historicoVendedor,
      form.qtyVentasVendedor,
      '=$A'+lrVendedor+'&"-"&VLOOKUP($B'+lrVendedor+';tabla_persona;9;0)'
    ]);

    return "Nuevo vendedor agregado a la base de datos";
  }
  else
  {

  }
};

function createCliente(form){

  var idClienteFlag = form.idCliente;
  var lrPersona=sheetPersona.getLastRow()+1;
  var lrCliente=sheetCliente.getLastRow()+1;
  var idVendedor = form.vendedorCliente.split('-')[0];
  var idEmpleado = form.empleadoCliente.split('-')[0];
  var idContactoReferente = form.contacto_referenteCliente.split('-')[0];
  var idPrograma = form.programaCliente.split('-')[0];
  console.log(form);

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
      form.calificacionCliente,
      '=$A'+lrCliente+'&"-"&VLOOKUP($B'+lrCliente+';tabla_persona;9;0)',
      '=VLOOKUP($C'+lrCliente+';tabla_vendedor;15;0)',
      '=VLOOKUP($D'+lrCliente+';tabla_empleado;13;0)',
      '=IF($E'+lrCliente+'="null";"NO APLICA";VLOOKUP($E'+lrCliente+';tabla_cliente;14;0))',
      idPrograma,
      form.origenCliente.toUpperCase()
    ]);

    return "Nuevo cliente agregado a la base de datos";
  }
  else
  {

  }
};

function createEvento(form){

  var idEventoFlag = form.idEvento;
  var idVendedor = form.vendedorEvento.split('-')[0];
  var idEmpleado = form.empleadoEvento.split('-')[0];
  var idCliente = form.clienteEvento.split('-')[0];
  var nombreEvento = form.tipoEvento +" // "+ form.clienteEvento;
  var partes = form.fechaEvento.split("-");
  var fechaEventoFormated = partes[1] + "/" + partes[2] + "/" + partes[0];
  var fechaInicioEvento = String(fechaEventoFormated) + ' ' + String(form.horaInicioEvento);
  var fechaFinEvento = String(fechaEventoFormated) + ' ' + String(form.horaInicioEvento);
  var idEventoCalendar = crearEventoCalendar(nombreEvento,fechaInicioEvento,fechaFinEvento,form.correosEvento,form.observacionesEvento);
  //arreglar formato de la hora
  var horaInicioEvento = form.horaInicioEvento;
  var horaFinEvento = form.horaFinEvento;
  if(form.horaInicioEvento.length === 4){
    horaInicioEvento = '0'+horaInicioEvento;
  }
  if(form.horaFinEvento.length === 4){
    horaFinEvento = '0'+horaFinEvento;
  }


  if(idEventoFlag == '0'){
    var idEvento = createNewId(sheetEvento);
    var lr=sheetEvento.getLastRow()+1;

    sheetEvento.appendRow([
      idEvento,
      idVendedor,
      idEmpleado,
      idCliente,
      '=F'+lr+'&" // "&Q'+lr,
      form.tipoEvento.toUpperCase(),
      form.estadoEvento.toUpperCase(),
      form.fechaEvento,
      horaInicioEvento,
      horaFinEvento,
      '=TEXT($H'+lr+';"mm/dd/yyyy"&" "&TEXT($I'+lr+';"hh:mm"))',
      '=TEXT($H'+lr+';"mm/dd/yyyy"&" "&TEXT($J'+lr+';"hh:mm"))',
      form.correosEvento.toLowerCase(),
      form.observacionesEvento,
      '=VLOOKUP($B'+lr+';tabla_vendedor;15;0)',
      '=VLOOKUP($C'+lr+';tabla_empleado;13;0)',
      '=VLOOKUP($D'+lr+';tabla_cliente;14;0)',
      '=A'+lr+'&" - "&E'+lr+'',
      idEventoCalendar
    ]);

    return "Nuevo seguimiento agregado a la base de datos";
  }
  else
  {

  }
};

function createPrograma(form){

  var idProgramaFlag = form.idPrograma;
  var lrPrograma=sheetPrograma.getLastRow()+1;
  var idEvento = form.eventoPrograma.split('-')[0];
  var nombreEvento = form.nombrePrograma +" // "+ form.eventoPrograma;
  var filaEvento = buscarFila(idEvento,sheetEvento);
  var fechaInicioEventoS = sheetEvento.getRange("K"+filaEvento).getValue();
  var fechaInicioEventoO = new Date(fechaInicioEventoS);
  fechaInicioEventoO.setDate(fechaInicioEventoO.getDate() + parseInt(form.diasPrograma));
  var fechaInicioEvento = (fechaInicioEventoO.getMonth() + 1) + "/" + fechaInicioEventoO.getDate() + "/" + fechaInicioEventoO.getFullYear() + " " + fechaInicioEventoO.getHours() + ":" + ("0" + fechaInicioEventoO.getMinutes()).slice(-2);
  var fechaFinEventoS = sheetEvento.getRange("L"+filaEvento).getValue();
  var fechaFinEventoO = new Date(fechaFinEventoS);
  fechaFinEventoO.setDate(fechaFinEventoO.getDate() + parseInt(form.diasPrograma));
  var fechaFinEvento = (fechaFinEventoO.getMonth() + 1) + "/" + fechaFinEventoO.getDate() + "/" + fechaFinEventoO.getFullYear() + " " + fechaFinEventoO.getHours() + ":" + ("0" + fechaFinEventoO.getMinutes()).slice(-2);
  console.log('FECHAS DEL PROGRAMA OBTENIDAS DEL EVENTO');
  console.log(fechaInicioEvento);
  console.log(fechaFinEvento);
  var idEventoCalendar = crearEventoCalendar(nombreEvento,fechaInicioEvento,fechaFinEvento,form.correosPrograma,"Fin del evento");

  if(idProgramaFlag == '0'){
    var idPrograma = createNewId(sheetPrograma);
    sheetPrograma.appendRow([
      idPrograma,
      idEvento,
      form.nombrePrograma.toUpperCase(),
      '=C'+lrPrograma+'&" // "&Q'+lrPrograma,
      '=VLOOKUP($B'+lrPrograma+';tabla_evento;8;0)',
      '=VLOOKUP($B'+lrPrograma+';tabla_evento;9;0)',
      '=VLOOKUP($B'+lrPrograma+';tabla_evento;10;0)',
      '=E'+lrPrograma+'+L'+lrPrograma,
      '=TEXT($H'+lrPrograma+';"mm/dd/yyyy"&" "&TEXT($F'+lrPrograma+';"hh:mm"))',
      '=TEXT($H'+lrPrograma+';"mm/dd/yyyy"&" "&TEXT($G'+lrPrograma+';"hh:mm"))',
      form.correosPrograma,
      form.diasPrograma,
      '=TODAY()-E'+lrPrograma,
      form.premioPrograma.toUpperCase(),
      '=IF(H'+lrPrograma+'-TODAY()>-1;"ACTIVO";"VENCIDO")',
      form.resultadoPrograma.toUpperCase(),
      '=VLOOKUP($B'+lrPrograma+';tabla_evento;18;0)',
      '=COUNTIF(cliente!R:R;"="&A'+filaPrograma+')',
      '=A'+filaPrograma+'&" - "&D'+filaPrograma,
      idEventoCalendar
    ]);

    return "Nuevo programa agregado a la base de datos";
  }
  else
  {

  }
};

function createVenta(form){

  var idVentaFlag = form.idVenta;
  var lrVenta=sheetVenta.getLastRow()+1;
  var idEvento = form.eventoVenta.split('-')[0];

  console.log(form);

  if(idVentaFlag == '0'){

    var idVenta = createNewId(sheetVenta);

    sheetVenta.appendRow([
      idVenta,
      idEvento,
      form.articuloVenta.toUpperCase(),
      form.valorVenta,
      form.modoPagoVenta,
      '=VLOOKUP(B'+lrVenta+';tabla_evento;18;0)',
      '=VLOOKUP(B'+lrVenta+';tabla_evento;2;0)',
      '=VLOOKUP($G'+lrVenta+';tabla_vendedor;15;0)',
      '=VLOOKUP($G'+lrVenta+';tabla_vendedor;8;0)'
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

function crearEventoCalendar(nombreEvento, fechaInicio, fechaFin, correos, descripcion){
  var event = CalendarApp.getDefaultCalendar().createEvent(
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
