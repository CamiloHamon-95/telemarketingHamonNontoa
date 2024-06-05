var fechaActual = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

function modifyEmpleado(form) {

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

  const filaPersona = buscarFila(form.idPersonaEmpleado,sheetPersona);
  const filaEmpleado = buscarFila(form.idEmpleado,sheetEmpleado);
  var fechaCreacion = sheetPersona.getRange("J"+filaPersona).getValue();
  fechaCreacion = Utilities.formatDate(fechaCreacion, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

  sheetPersona.getRange(filaPersona,2,1,sheetPersona.getLastColumn()-1).setValues([[
    form.nombreEmpleado.toUpperCase(),
    form.apellidoEmpleado.toUpperCase(),
    form.celularEmpleado,
    form.departamentoEmpleado.toUpperCase(),
    form.ciudadEmpleado.toUpperCase(),
    form.direccionEmpleado.toUpperCase(),
    form.emailEmpleado.toLowerCase(),
    '=$A'+filaPersona+'&"-"&$B'+filaPersona+'&"-"&$C'+filaPersona+'&"-"&$D'+filaPersona,
    String(fechaCreacion),
    String(fechaActual)
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
  console.log("SI ENTRA EN LAS FUNCIONES VENDEDOR MODIFY");
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

  const filaPersona = buscarFila(form.idPersonaVendedor,sheetPersona);
  const filaVendedor = buscarFila(form.idVendedor,sheetVendedor);
  var fechaCreacion = sheetPersona.getRange("J"+filaPersona).getValue();
  fechaCreacion = Utilities.formatDate(fechaCreacion, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');

  sheetPersona.getRange(filaPersona,2,1,sheetPersona.getLastColumn()-1).setValues([[
    form.nombreVendedor.toUpperCase(),
    form.apellidoVendedor.toUpperCase(),
    form.celularVendedor,
    form.departamentoVendedor.toUpperCase(),
    form.ciudadVendedor.toUpperCase(),
    form.direccionVendedor.toUpperCase(),
    form.emailVendedor.toLowerCase(),
    '=$A'+filaPersona+'&"-"&$B'+filaPersona+'&"-"&$C'+filaPersona+'&"-"&$H'+filaPersona,
    String(fechaCreacion),
    String(fechaActual)
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
    'VENDEDOR',
    form.metaVendedor,
    '=SUMIF(venta!G:G;A'+filaVendedor+';venta!D:D)',
    '=COUNTIF(venta!G:G;A'+filaVendedor+')',
    '=$A'+filaVendedor+'&"-"&VLOOKUP($B'+filaVendedor+';tabla_persona;9;0)',
    form.idCalendarDemos,
    form.idCalendarProgramas,
    String(form.activoVendedor)
  ]])

  return "Registro editado con éxito";
};

function modifyCliente(form){
  console.log("SI ENTRA EN LAS FUNCIONES CLIENTE MODIFY");
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

  console.log("SWITCH CLIENTE");
  console.log(form.activoCliente);

  const filaPersona = buscarFila(form.idPersonaCliente,sheetPersona);
  const filaCliente = buscarFila(form.idCliente,sheetCliente);
  var fechaCreacion = sheetPersona.getRange("J"+filaPersona).getValue();
  fechaCreacion = Utilities.formatDate(fechaCreacion, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
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
    '=$A'+filaPersona+'&"-"&$B'+filaPersona+'&"-"&$C'+filaPersona+'&"-"&$D'+filaPersona,
    String(fechaCreacion),
    String(fechaActual)
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
    String(form.activoCliente),
    '=$A'+filaCliente+'&"-"&VLOOKUP($B'+filaCliente+';tabla_persona;9;0)&"-"&$O'+filaCliente+'&"-"&$T'+filaCliente,
    '=VLOOKUP($C'+filaCliente+';tabla_vendedor;15;0)',
    '=VLOOKUP($D'+filaCliente+';tabla_empleado;13;0)',
    '=IF($E'+filaCliente+'=0;"0-NO APLICA";VLOOKUP($E'+filaCliente+';tabla_cliente;14;0))',
    idPrograma,
    form.origenCliente.toUpperCase(),
    '=IF($R'+filaCliente+'=0;"0-NO APLICA";VLOOKUP($R'+filaCliente+';tabla_programa;16;0))',
    form.nucleoCliente.toUpperCase(),
    form.prospectoCliente.toUpperCase()
  ]])

  return "Registro editado con éxito";
};

function modifyPrograma(form){
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


  const filaPrograma = buscarFila(form.idPrograma,sheetPrograma);
  var fechaCreacion = sheetPrograma.getRange("S"+filaPrograma).getValue();
  fechaCreacion = Utilities.formatDate(fechaCreacion, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  var idCliente = form.clientePrograma.split('-')[0];
  var filaCliente = buscarFila(idCliente,sheetCliente);
  var cliente = sheetCliente.getRange("N"+filaCliente).getValue();
  var idVendedor = form.vendedorPrograma.split('-')[0];
  var idCalendar = sheetPrograma.getRange("Q"+filaPrograma).getValue();
  //var nombrePrograma = sheetPrograma.getRange("P"+filaPrograma).getValue();
  var nombrePrograma = form.idPrograma + '-PROGRAMA 4 EN 14-'+cliente;

  /*
  // Obtener el ID del eventoCalendar
  var fechaTabla = sheetPrograma.getRange("E"+filaPrograma).getValue();
  // Obtener el día, el mes y el año de la fecha
  var dia = fechaTabla.getDate();
  var mes = fechaTabla.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero) hasta 11 (diciembre)
  var year = fechaTabla.getFullYear();

  // Formatear la fecha en el formato deseado (MM/DD/YYYY)
  var fechaString = (mes < 10 ? '0' : '') + mes + '/' + (dia < 10 ? '0' : '') + dia + '/' + year;

  fechaTabla = fechaString+' 10:00';
  console.log("FECHA TABLA");
  console.log(fechaTabla);
  */

  console.log(fechaString); // Output: "05/07/2024"
  var partes = form.fechaPrograma.split("-");
  var fechaProgramaFormated = partes[1] + "/" + partes[2] + "/" + partes[0];
  var fechaInicioPrograma = String(fechaProgramaFormated) + ' 10:00';
  var fechaFinPrograma = String(fechaProgramaFormated) + ' 11:00';
  // Condicional para validar si la fecha fue modificada
  console.log("COMPARACION DE FECHAS");
  console.log("fecha tabla: ");
  console.log(fechaTabla);
  console.log("fecha nueva: ");
  console.log(fechaInicioPrograma);
  // Para ID Calendar vendedor
  var filaVendedor = buscarFila(idVendedor,sheetVendedor);
  var idCalendarEvento = sheetVendedor.getRange("Q"+filaVendedor).getValue();
  //Eliminar el evento para crear uno nuevo
  console.log("SE VA A ELIMINAR Y A CREAR UN NUEVO EVENTO CALENDAR!!");
  eliminarEventoCalendario(idCalendarEvento,idCalendar);
  console.log("ESTE ES EL ID DEL VENDEDOR CON ID: "+idVendedor);
  console.log(idCalendarEvento);

  //SUMA DE 14 DÍAS
  console.log("FECHAS FINALES");
  var miFechaFin1 = sumarDiasFecha(fechaInicioPrograma,14);
  var miFechaFin2 = sumarDiasFecha(fechaFinPrograma,14);

    // Crear el nuevo evento
    idCalendar = crearEventoCalendar(idCalendarEvento, nombrePrograma,miFechaFin1,miFechaFin2,'','FIN PROGRAMA 4 EN 14');


  sheetPrograma.getRange(filaPrograma,2,1,sheetPrograma.getLastColumn()-1).setValues([[
    idCliente,
    idVendedor,
    '4 EN 14',
    form.fechaPrograma,
    '=TEXT($E'+filaPrograma+'+14;"mm/dd/yyyy")&" 10:00"',
    '=TEXT($E'+filaPrograma+'+14;"mm/dd/yyyy")&" 11:00"',
    14,
    '=TODAY()-$E'+filaPrograma,
    form.premioPrograma.toUpperCase(),
    '=IF($E'+filaPrograma+'-TODAY()>-1;"ACTIVO";"VENCIDO")',
    form.resultadoPrograma,
    '=COUNTIF(cliente!R:R;"="&A'+filaPrograma+')',
    '=COUNTIFS(cliente!R:R;"="&A'+filaPrograma+';cliente!M:M;"=on")',
    '=VLOOKUP(B'+filaPrograma+';tabla_cliente;14;0)',
    '=A'+filaPrograma+'&"-"&D'+filaPrograma+'&"-"&O'+filaPrograma,
    idCalendar,
    '=VLOOKUP($C'+filaPrograma+';tabla_vendedor;15;0)',
    String(fechaCreacion),
    String(fechaActual)
  ]])
  return "Registro editado con éxito";
};

function modifyEvento(form){

  console.log("INGRESA A EDITAR UN EVENTO");

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

  var idVendedor = form.vendedorEvento.split('-')[0];
  var idEmpleado = form.empleadoEvento.split('-')[0];
  var idCliente = form.clienteEvento.split('-')[0];
  var idPrograma = form.programaEvento.split('-')[0];
  var nombreEvento = form.tipoEvento +" // "+ form.clienteEvento;
  const filaEvento = buscarFila(form.idEvento,sheetEvento);
  var fechaCreacion = sheetEvento.getRange("W"+filaEvento).getValue();
  fechaCreacion = Utilities.formatDate(fechaCreacion, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  // Obtener el ID del eventoCalendar
  var idCalendar = sheetEvento.getRange("T"+filaEvento).getValue();
  var partes = form.fechaEvento.split("-");
  var fechaEventoFormated = partes[1] + "/" + partes[2] + "/" + partes[0];
  var fechaInicioEvento = String(fechaEventoFormated) + ' ' + String(form.horaInicioEvento);
  var fechaFinEvento = String(fechaEventoFormated) + ' ' + String(form.horaFinEvento);
  // Condicional para validar si la fecha fue modificada
  console.log("fecha nueva: ");
  console.log(fechaInicioEvento);
  if(form.tipoEvento.toUpperCase() != 'SEGUIMIENTO'){
    // Para ID Calendar vendedor
    var filaVendedor = buscarFila(idVendedor,sheetVendedor);
    var idCalendarEvento = sheetVendedor.getRange("P"+filaVendedor).getValue();
    //Eliminar el evento para crear uno nuevo
    console.log("SE VA A ELIMINAR Y A CREAR UN NUEVO EVENTO!!");
    eliminarEventoCalendario(idCalendarEvento,idCalendar);
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

    
    console.log("ESTE ES EL ID DEL VENDEDOR CON ID: "+idVendedor);
    console.log(idCalendarEvento);
    var correos = "";
    if(form.correosEvento.toUpperCase() != "NULL"){
      correos = form.correosEvento;
    }

    console.log("VA A CREAR UN EVENTO EN CALENDAR!");

    idCalendar = crearEventoCalendar(idCalendarEvento, nombreEvento,fechaInicioEvento,fechaFinEvento,correos,miDescripcion);
  }else{
    console.log("NO genera evento en calendar porque el evento es de tipo SEGUIMIENTO");
  }

  sheetEvento.getRange(filaEvento,2,1,sheetEvento.getLastColumn()-1).setValues([[
    idVendedor,
    idEmpleado,
    idCliente,
    form.tipoEvento.toUpperCase(),
    form.estadoEvento.toUpperCase(),
    form.resetPersona.toUpperCase(),
    form.resetMotivo.toUpperCase(),
    form.fechaEvento,
    form.horaInicioEvento,
    form.horaFinEvento,
    '=TEXT($I'+filaEvento+';"mm/dd/yyyy"&" "&TEXT($J'+filaEvento+';"hh:mm"))',
    '=TEXT($I'+filaEvento+';"mm/dd/yyyy"&" "&TEXT($K'+filaEvento+';"hh:mm"))',
    form.correosEvento.toLowerCase(),
    form.observacionesEvento,
    '=VLOOKUP($B'+filaEvento+';tabla_vendedor;15;0)',
    '=VLOOKUP($C'+filaEvento+';tabla_empleado;13;0)',
    '=VLOOKUP($D'+filaEvento+';tabla_cliente;14;0)',
    '=A'+filaEvento+'&"-"&E'+filaEvento+'&"-"&R'+filaEvento,
    idCalendar,
    idPrograma,
    '=IF($U'+filaEvento+'=0;"0-NO APLICA";VLOOKUP($U'+filaEvento+';tabla_programa;16;0))',
    String(fechaCreacion),
    String(fechaActual)
  ]])

  return "Nuevo seguimiento agregado a la base de datos";
};

function modifyVenta(form){
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

  const filaVenta = buscarFila(form.idVenta,sheetVenta);
  var fechaCreacion = sheetVenta.getRange("J"+filaVenta).getValue();
  fechaCreacion = Utilities.formatDate(fechaCreacion, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss');
  var idEvento = form.eventoVenta.split('-')[0];

  sheetVenta.getRange(filaVenta,2,1,sheetVenta.getLastColumn()-1).setValues([[
    idEvento,
    form.articuloVenta.toUpperCase(),
    form.valorVenta,
    form.modoPagoVenta.toUpperCase(),
    '=VLOOKUP(B'+filaVenta+';tabla_evento;19;0)',
    '=VLOOKUP(B'+filaVenta+';tabla_evento;2;0)',
    '=VLOOKUP($G'+filaVenta+';tabla_vendedor;15;0)',
    '=VLOOKUP($B'+filaVenta+';tabla_evento;9;0)',
    String(fechaCreacion),
    String(fechaActual)
  ]]);

  return "Registro editado con éxito";
};

function getDataRow(id, nameTable){
  console.log("SI ENTRA ACÁ!!");
  console.log(nameTable);
  console.log(id);
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
        console.log('Caso no tenido en cuenta al seleccionar el SHEET');
        break;
  } 
  const myfila = buscarFila(id, mysheet);
  var mydata = mysheet.getRange(myfila,2,1,mysheet.getLastColumn()-1).getValues();
  switch (nameTable) {
      case 'evento':
        var estadoEvento = String(mydata[0][3]);
        var fechaEvento = String(mydata[0][10]).split(' ')[0];
        var horaInicioEvento = String(mydata[0][10]).split(' ')[1];
        var horaFinEvento = String(mydata[0][11]).split(' ')[1];

        console.log(estadoEvento);
        console.log(horaInicioEvento);
        console.log(horaFinEvento);

        if (estadoEvento === 'MANTENIMIENTO'){
          estadoEvento = 'TIENE ROYAL';
        }
        
        var year = fechaEvento.split('/')[2];
        var month = fechaEvento.split('/')[0];
        var day = fechaEvento.split('/')[1];

        fechaEvento = year+'-'+month+'-'+day;

        if(horaInicioEvento == undefined || horaFinEvento == undefined){
          horaInicioEvento = '08:00'
          horaFinEvento = '08:01'
        }

        if(horaInicioEvento.length === 4){
          horaInicioEvento = '0'+horaInicioEvento;
        }
        if(horaFinEvento.length === 4){
          horaFinEvento = '0'+horaFinEvento;
        }
        
        mydata[0][3] = estadoEvento;
        mydata[0][7] = fechaEvento;
        mydata[0][8] = horaInicioEvento;
        mydata[0][9] = horaFinEvento;
        console.log("MY DATA:");
        console.log(mydata);
        delete mydata[0][21];
        delete mydata[0][22];
        break;
      case 'programa':

        // Obtener el ID del eventoCalendar
        console.log(mydata[0][3]);
        var fechaTabla = mydata[0][3];
        // Obtener el día, el mes y el año de la fecha
        var dia = fechaTabla.getDate();
        var mes = fechaTabla.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero) hasta 11 (diciembre)
        var year = fechaTabla.getFullYear();

        // Formatear la fecha en el formato deseado (MM/DD/YYYY)
        var fechaString = (mes < 10 ? '0' : '') + mes + '/' + (dia < 10 ? '0' : '') + dia + '/' + year;

        fechaTabla = fechaString+' 10:00';
        console.log("FECHA TABLA");
        console.log(fechaTabla);

        var fechaPrograma = String(fechaTabla).split(' ')[0];

        var year = fechaPrograma.split('/')[2];
        var month = fechaPrograma.split('/')[0];
        var day = fechaPrograma.split('/')[1];

        fechaPrograma = year+'-'+month+'-'+day;

        mydata[0][3] = fechaPrograma;
        console.log("MY DATA:");
        console.log(mydata);
        delete mydata[0][4];
        delete mydata[0][5];
        delete mydata[0][6];
        delete mydata[0][7];
        delete mydata[0][17];
        delete mydata[0][18];
        break;
      case 'venta':
        console.log("MY DATA:");
        console.log(mydata);
        delete mydata[0][7];
        delete mydata[0][8];
        delete mydata[0][9];
        break;
      default:
        console.log('Caso no tenido en cuenta al eliminar data de EVENTO/PROGRAMA/VENTA');
        break;
  }
  return mydata;
}

function buscarFila(miId, mysheet){
  const ids = mysheet.getRange(2,1,mysheet.getLastRow()-1,1).getValues().map(id => id[0]);
  const index = ids.indexOf(Number(miId));
  const row = index + 2;
  return row;
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

function eliminarEventoCalendario(idCalendario, idEvento){
  var calendario = CalendarApp.getCalendarById(idCalendario);
  var evento = calendario.getEventById(idEvento); // Obtén el evento por su ID
  
  if (evento) {
    try{
      evento.deleteEvent(); // Elimina el evento si se encontró
      console.log('Evento eliminado correctamente.');
    } catch (error) {
      console.log('No se encontró el evento con el ID proporcionado.');
    }
  } else {
    console.log('No se encontró el evento con el ID proporcionado.');
  }

}

function datetimeAString(datetime) {
  var fecha = datetime.getFullYear() + '-' + ('0' + (datetime.getMonth() + 1)).slice(-2) + '-' + ('0' + datetime.getDate()).slice(-2);
  return fecha;
}

function sumarDiasFecha(fechaString, dias){
  // Convertir la cadena en un objeto Date
  var fecha = new Date(fechaString);

  // Sumar 14 días a la fecha
  fecha.setDate(fecha.getDate() + dias);

  // Obtener el día, mes, año, hora y minutos de la fecha
  var dia = fecha.getDate();
  var mes = fecha.getMonth() + 1; // Se suma 1 porque los meses se indexan desde 0 (enero) hasta 11 (diciembre)
  var año = fecha.getFullYear();
  var hora = fecha.getHours();
  var minutos = fecha.getMinutes();

  // Formatear la nueva fecha en el mismo formato de cadena
  var nuevaFechaString = (mes < 10 ? '0' : '') + mes + '/' + (dia < 10 ? '0' : '') + dia + '/' + año + ' ' + (hora < 10 ? '0' : '') + hora + ':' + (minutos < 10 ? '0' : '') + minutos;

  return nuevaFechaString;

}

function reiniciarAppWeb() {
  // Obtiene la URL de la aplicación web
  var urlAppWeb = ScriptApp.getService().getUrl();
  console.log("INGRESÓ A LA APP PARA REINICIAR");
  console.log(urlAppWeb);
  console.log(URLactual);

  // Abre la URL en una nueva pestaña del navegador
  var accionRecargar = UrlFetchApp.fetch(URLactual);
  Utilities.sleep(2000);
  console.log("ACA DEBERIA IMPRIMIR EL RESULTADO DE VOLVER A CARGAR LA URL");
  console.log(accionRecargar);
}

function recargarApp() {
  var htmlOutput = HtmlService.createHtmlOutputFromFile('main.html')
    .setTitle('Telemarketing HNSAS')
    .setWidth(800)
    .setHeight(600);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Título_de_tu_diálogo');
}
