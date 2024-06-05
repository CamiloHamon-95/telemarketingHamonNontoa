function borrarRegistro(id, nombreTabla) {

  var listaPersonas = ['empleado','vendedor','cliente'];
  var listaEventosCalendar = ['programa','evento'];
  var idCalendarEvento = '';
  var idCalendar = '';
  var mysheet;

  switch (nombreTabla) {
    case 'empleado':
      mysheet = sheetEmpleado;
      break;

    case 'vendedor':
      mysheet = sheetVendedor;
      break;

    case 'cliente':
      mysheet = sheetCliente;
      break;

    case 'programa':
      mysheet = sheetPrograma;
      break;

    case 'evento':
      mysheet = sheetEvento;
      break;
    
    case 'venta':
      mysheet = sheetVenta;
      break;

    default:
      break;
  }

  console.log("ID:");
  console.log(id);
  console.log("Nombre Tabla:");
  console.log(nombreTabla);

  var miFila = buscarFila(id,mysheet);
  console.log("LA FILA");
  console.log(miFila);

  if(listaPersonas.includes(nombreTabla)){
    // DESPUES DE ELIMINAR EL REGISTRO, ELIMINAR LA PERSONA.
  }
  else if(listaEventosCalendar.includes(nombreTabla)){

    // PRIMERO! ELIMINAR EVENTOS EN CALENDAR ANTES DE ELIMINAR EL REGISTRO

    if(nombreTabla == 'evento'){
      var idVendedor = mysheet.getRange("B"+miFila).getValue();
      console.log("VENDEDOR ID");
      console.log(idVendedor);
      // Para ID Calendar vendedor
      var filaVendedor = buscarFila(idVendedor,sheetVendedor);
      console.log("FILA VENDEDOR");
      console.log(filaVendedor);
      // Columna P para el ID del calendar de Eventos
      idCalendarEvento = sheetVendedor.getRange("P"+filaVendedor).getValue();
      console.log("ID CALENDARIO");
      console.log(idCalendarEvento);
      //ID calendar
      idCalendar = mysheet.getRange("T"+miFila).getValue();
      console.log("SE VA A ELMINAR EL EVENTO DE:");
      console.log("VENDEDOR: "+idVendedor+".  FilaVendedor: "+filaVendedor+".  Fila del evento: "+miFila+".  idCalendar: "+idCalendar);
    }
    else{
      // EN CASO DE PROGRAMA
      var idVendedor = mysheet.getRange("C"+miFila).getValue();
      // Para ID Calendar vendedor
      var filaVendedor = buscarFila(idVendedor,sheetVendedor);
      // Columna Q para el ID del calendar de Eventos
      idCalendarEvento = mysheet.getRange("Q"+miFila).getValue();
      //ID calendar
      idCalendar = mysheet.getRange("Q"+miFila).getValue();

      console.log("SE VA A ELMINAR EL PROGRAMA DE:");
      console.log("VENDEDOR: "+idVendedor+".  FilaVendedor: "+filaVendedor+".  Fila del programa: "+miFila+".  idCalendar: "+idCalendar);
    }

    eliminarEventoCalendario(idCalendarEvento,idCalendar);

  }else{

  }

  if(!listaPersonas.includes(nombreTabla)){
    mysheet.deleteRow(miFila);
  }


}
