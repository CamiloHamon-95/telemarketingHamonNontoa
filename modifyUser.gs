// Obtener el valor de la celda anterior en la columna A
//var celdaAnterior = hoja.getRange(hoja.getLastRow(), 1).getValue();

function modifyEmpleado(form) {
  const filaPersona = buscarFila(form.idPersonaEmpleado,sheetPersona);
  const filaEmpleado = buscarFila(form.idEmpleado,sheetEmpleado);

  sheetPersona.getRange(filaPersona,2,1,sheetPersona.getLastColumn()-1).setValues([[
    form.nombreEmpleado.toUpperCase(),
    form.apellidoEmpleado.toUpperCase(),
    form.celularEmpleado,
    form.departamentoEmpleado.toUpperCase(),
    form.ciudadEmpleado.toUpperCase(),
    form.direccionEmpleado.toUpperCase(),
    form.emailEmpleado.toLowerCase(),
    '=$A'+filaPersona+'&"-"&$B'+filaPersona+'&"-"&$C'+filaPersona+'&"-"&$D'+filaPersona
  ]])

  sheetEmpleado.getRange(filaEmpleado,2,1,sheetEmpleado.getLastColumn()-1).setValues([[
    form.idPersonaEmpleado,
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;2;0)',
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;3;0)',
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;4;0)',
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;5;0)',
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;6;0)',
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;7;0)',
    '=VLOOKUP($B'+filaEmpleado+';tabla_persona;8;0)',
    form.salarioEmpleado,
    form.epsEmpleado.toUpperCase(),
    form.cargoEmpleado.toUpperCase(),
    '=$A'+filaEmpleado+'&"-"&VLOOKUP($B'+filaEmpleado+';tabla_persona;9;0)'
  ]])

  return "Registro editado con éxito";
};

function modifyVendedor(form){

  const filaPersona = buscarFila(form.idPersonaVendedor,sheetPersona);
  const filaVendedor = buscarFila(form.idVendedor,sheetEmpleado);

  sheetPersona.getRange(filaPersona,2,1,sheetPersona.getLastColumn()-1).setValues([[
    form.nombreVendedor.toUpperCase(),
    form.apellidoVendedor.toUpperCase(),
    form.celularVendedor,
    form.departamentoVendedor.toUpperCase(),
    form.ciudadVendedor.toUpperCase(),
    form.direccionVendedor.toUpperCase(),
    form.emailVendedor.toLowerCase(),
    '=$A'+filaPersona+'&"-"&$B'+filaPersona+'&"-"&$C'+filaPersona
  ]])

  sheetVendedor.getRange(filaVendedor,2,1,sheetVendedor.getLastColumn()-1).setValues([[
    form.idPersonaVendedor,
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;2;0)',
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;3;0)',
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;4;0)',
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;5;0)',
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;6;0)',
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;7;0)',
    '=VLOOKUP($B'+filaVendedor+';tabla_persona;8;0)',
    form.epsVendedor.toUpperCase(),
    form.cargoVendedor.toUpperCase(),
    form.metaVendedor,
    form.historicoVendedor,
    form.qtyVentasVendedor,
    '=$A'+filaVendedor+'&"-"&VLOOKUP($B'+filaVendedor+';tabla_persona;9;0)'
  ]])

  return "Registro editado con éxito";
};

function modifyCliente(form){

  const filaPersona = buscarFila(form.idPersonaCliente,sheetPersona);
  const filaCliente = buscarFila(form.idCliente,sheetCliente);
  var idVendedor = form.vendedorCliente.split('-')[0];
  var idEmpleado = form.empleadoCliente.split('-')[0];
  var idPrograma = form.programaCliente.split('-')[0];
  var idContactoReferente = 'null';
  var fieldContactoReferente = form.contacto_referenteCliente;
  if(fieldContactoReferente === undefined){
    idContactoReferente = 'null';
  }else{
    idContactoReferente = fieldContactoReferente.split('-')[0];
  }

  sheetPersona.getRange(filaPersona,2,1,sheetPersona.getLastColumn()-1).setValues([[
    form.nombreCliente.toUpperCase(),
    form.apellidoCliente.toUpperCase(),
    form.celularCliente.toUpperCase(),
    form.departamentoCliente.toUpperCase(),
    form.ciudadCliente.toUpperCase(),
    form.direccionCliente.toUpperCase(),
    form.emailCliente.toLowerCase(),
    '=$A'+filaPersona+'&"-"&$B'+filaPersona+'&"-"&$C'+filaPersona
  ]])

  sheetCliente.getRange(filaCliente,2,1,sheetCliente.getLastColumn()-1).setValues([[
    form.idPersonaCliente,
    idVendedor,
    idEmpleado,
    idContactoReferente,
    '=VLOOKUP($B'+filaCliente+';tabla_persona;2;0)',
    '=VLOOKUP($B'+filaCliente+';tabla_persona;3;0)',
    '=VLOOKUP($B'+filaCliente+';tabla_persona;4;0)',
    '=VLOOKUP($B'+filaCliente+';tabla_persona;5;0)',
    '=VLOOKUP($B'+filaCliente+';tabla_persona;6;0)',
    '=VLOOKUP($B'+filaCliente+';tabla_persona;7;0)',
    '=VLOOKUP($B'+filaCliente+';tabla_persona;8;0)',
    form.calificacionCliente,
    '=$A'+filaCliente+'&"-"&VLOOKUP($B'+filaCliente+';tabla_persona;9;0)',
    '=VLOOKUP($C'+filaCliente+';tabla_vendedor;15;0)',
    '=VLOOKUP($D'+filaCliente+';tabla_empleado;13;0)',
    '=IF($E'+filaCliente+'="null";"NO APLICA";VLOOKUP($E'+filaCliente+';tabla_cliente;14;0))',
    idPrograma,
    form.origenCliente.toUpperCase()
  ]])

  return "Registro editado con éxito";
};

function modifyEvento(form){

  var idVendedor = form.vendedorEvento.split('-')[0];
  var idEmpleado = form.empleadoEvento.split('-')[0];
  var idCliente = form.clienteEvento.split('-')[0];
  var nombreEvento = form.tipoEvento +" // "+ form.clienteEvento;
  const filaEvento = buscarFila(form.idEvento,sheetEvento);
  // Obtener el ID del eventoCalendar
  var idCalendar = sheetEvento.getRange("S"+filaEvento).getValue();
  var fechaTabla = sheetEvento.getRange("K"+filaEvento).getValue();
  var partes = form.fechaEvento.split("-");
  var fechaEventoFormated = partes[1] + "/" + partes[2] + "/" + partes[0];
  var fechaInicioEvento = String(fechaEventoFormated) + ' ' + String(form.horaInicioEvento);
  var fechaFinEvento = String(fechaEventoFormated) + ' ' + String(form.horaInicioEvento);
  // Condicional para validar si la fecha fue modificada
  console.log("COMPARACION DE FECHAS");
  console.log("fecha tabla: ");
  console.log(fechaTabla);
  console.log("fecha nueva: ");
  console.log(fechaInicioEvento);
  if(fechaTabla != fechaInicioEvento){
    //Eliminar el evento para crear uno nuevo
    const event = CalendarApp.getEventById(idCalendar);
    event.deleteEvent();

     // Crear el nuevo evento
     idCalendar = crearEventoCalendar(nombreEvento,fechaInicioEvento,fechaFinEvento,form.correosEvento,form.observacionesEvento);
  }

  sheetEvento.getRange(filaEvento,2,1,sheetEvento.getLastColumn()-1).setValues([[
    idVendedor,
    idEmpleado,
    idCliente,
    '=F'+filaEvento+'&" // "&Q'+filaEvento,
    form.tipoEvento,
    form.estadoEvento.toUpperCase(),
    form.fechaEvento,
    form.horaInicioEvento,
    form.horaFinEvento,
    '=TEXT($H'+filaEvento+';"mm/dd/yyyy"&" "&TEXT($I'+filaEvento+';"hh:mm"))',
    '=TEXT($H'+filaEvento+';"mm/dd/yyyy"&" "&TEXT($J'+filaEvento+';"hh:mm"))',
    form.correosEvento.toLowerCase(),
    form.observacionesEvento,
    '=VLOOKUP($B'+filaEvento+';tabla_vendedor;15;0)',
    '=VLOOKUP($C'+filaEvento+';tabla_empleado;13;0)',
    '=VLOOKUP($D'+filaEvento+';tabla_cliente;14;0)',
    '=A'+filaEvento+'&" - "&E'+filaEvento,
    idCalendar
  ]])

  return "Nuevo seguimiento agregado a la base de datos";
};

function modifyPrograma(form){
  const filaPrograma = buscarFila(form.idPrograma,sheetPrograma);
  var idEvento = form.eventoPrograma.split('-')[0];

  sheetPrograma.getRange(filaPrograma,2,1,sheetPrograma.getLastColumn()-1).setValues([[
    idEvento,
    form.nombrePrograma.toUpperCase(),
    '=C'+filaPrograma+'&" // "&Q'+filaPrograma+'',
    '=VLOOKUP($B'+filaPrograma+';tabla_evento;8;0)',
    '=VLOOKUP($B'+filaPrograma+';tabla_evento;9;0)',
    '=VLOOKUP($B'+filaPrograma+';tabla_evento;10;0)',
    '=E'+filaPrograma+'+L'+filaPrograma+'',
    '=TEXT($H'+filaPrograma+';"mm/dd/yyyy"&" "&TEXT($F'+filaPrograma+';"hh:mm"))',
    '=TEXT($H'+filaPrograma+';"mm/dd/yyyy"&" "&TEXT($G'+filaPrograma+';"hh:mm"))',
    form.correosPrograma.toLowerCase(),
    form.diasPrograma,
    '=TODAY()-$E'+filaPrograma,
    form.premioPrograma,
    '=IF(H'+filaPrograma+'-TODAY()>-1;"ACTIVO";"VENCIDO")',
    form.resultadoPrograma,
    '=VLOOKUP($B'+filaPrograma+';tabla_evento;18;0)',
    '=COUNTIF(cliente!R:R;"="&A'+filaPrograma+')',
    '=A'+filaPrograma+'&" - "&D'+filaPrograma+''
  ]])
  return "Registro editado con éxito";
};

function modifyVenta(form){
  const filaVenta = buscarFila(form.idVenta,sheetVenta);
  var idEvento = form.eventoVenta.split('-')[0];

  sheetVenta.getRange(filaVenta,2,1,sheetVenta.getLastColumn()-1).setValues([[
    idEvento,
    form.articuloVenta.toUpperCase(),
    form.valorVenta,
    form.modoPagoVenta.toUpperCase(),
    '=VLOOKUP(B'+filaVenta+';tabla_evento;18;0)',
    '=VLOOKUP(B'+lrVenta+';tabla_evento;2;0)',
    '=VLOOKUP($G'+lrVenta+';tabla_vendedor;15;0)',
    '=VLOOKUP($G'+lrVenta+';tabla_vendedor;8;0)'
  ]]);

  return "Registro editado con éxito";
};

function getDataRow(id, nameTable){
  var mysheet;
  switch (nameTable) {
      case 'empleado':
        mysheet = sheetEmpleado;
        break;
      case 'vendedor':
        mysheet = sheetVendedor;
        break;
      case 'cliente':
        mysheet = sheetCliente;
        break;
      case 'evento':
        mysheet = sheetEvento;
        break;
      case 'programa':
        mysheet = sheetPrograma;
        break;
      case 'venta':
        mysheet = sheetVenta;
        break;
      default:
        console.log('Caso no tenido en cuenta');
        break;
  } 
  const myfila = buscarFila(id, mysheet);
  var mydata = mysheet.getRange(myfila,2,1,mysheet.getLastColumn()-1).getValues();
  console.log(mydata);
  switch (nameTable) {
      case 'evento':
        var fechaEvento = String(mydata[0][9]).split(' ')[0];
        var horaInicioEvento = String(mydata[0][9]).split(' ')[1];
        var horaFinEvento = String(mydata[0][10]).split(' ')[1];
        

        if(horaInicioEvento.length === 4){
          horaInicioEvento = '0'+horaInicioEvento;
        }
        if(horaFinEvento.length === 4){
          horaFinEvento = '0'+horaFinEvento;
        }
        
        mydata[0][6] = fechaEvento;
        mydata[0][7] = horaInicioEvento;
        mydata[0][8] = horaFinEvento;
        break;
      case 'programa':
        break;
      case 'venta':
        break;
      default:
        console.log('Caso no tenido en cuenta');
        break;
  }
  console.log("Hasta acá todo bien");
  console.log(mydata);
  return mydata;
}

function buscarFila(miId, mysheet){
  const ids = mysheet.getRange(2,1,mysheet.getLastRow()-1,1).getValues().map(id => id[0]);
  const index = ids.indexOf(Number(miId));
  const row = index + 2;
  return row;
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

function datetimeAString(datetime) {
  var fecha = datetime.getFullYear() + '-' + ('0' + (datetime.getMonth() + 1)).slice(-2) + '-' + ('0' + datetime.getDate()).slice(-2);
  return fecha;
}
