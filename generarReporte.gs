function generarReporte(fechaReporteExcelInicio,fechaReporteExcelFin) {

  console.log("LAS FECHAS PARA TRABAJAR SON:");
  console.log("FECHA INICIO");
  console.log(fechaReporteExcelInicio);
  console.log("FECHA FIN");
  console.log(fechaReporteExcelFin);
  
  const BD_ID_REPORTE = '1VUTOWEsF_22zB8sLaPrNNC3139rotdED_-GALsGJgUY';
  const bookReporte = SpreadsheetApp.openById(BD_ID_REPORTE);
  const sheetReporte = bookReporte.getSheetByName('reporte'); 

  var limpiarHoja = borrarFilasExceptoEncabezado(sheetReporte);
  console.log(limpiarHoja);

  var idsAsesores = obtenerIdsAsesores();
  for (var i = 0; i < idsAsesores.length; i++) {
    var miId = idsAsesores[i];
    var nombreAsesor = obtenerNombreCompleto(miId, sheetVendedor);
    var dataEventos = obtenerDataEventos(miId, sheetEvento, fechaReporteExcelInicio,fechaReporteExcelFin);
    var dataProgramas = obtenerDataProgramas(miId, sheetPrograma,fechaReporteExcelInicio,fechaReporteExcelFin);
    var dataVentas = obtenerDataVentas(miId, sheetVenta,fechaReporteExcelInicio,fechaReporteExcelFin);
    //DESCONOCIDO
    var dzSt = 0;
    var citasBzSt = 0;
    var mn = 0;
    var citasMn = 0;
    var ci = 0;
    var pf = 0;
    //VENTAS
    var qtyCasiVentas = 0;
    var vc = 0;
    var qtyBn = 0;

    sheetReporte.appendRow([
      nombreAsesor,
      dataEventos['qtyAgendamientos'],
      dataEventos['qtyMantenimientos'],
      dzSt,
      citasBzSt,
      mn,
      citasMn,
      ci,
      pf,
      dataEventos['qtyCitasPrograma'],
      dataProgramas['qtyProgramasXvendedor'],
      dataProgramas['recuentoReferidos'],
      dataProgramas['recuentoClientesActivos'],
      dataEventos['qtyTotalReset'],
      dataEventos['qtyResetTele'],
      dataEventos['motivosResetTele'],
      dataEventos['qtyResetAsesor'],
      dataEventos['motivosResetAsesor'],
      dataVentas['qtyVentas'],
      dataVentas['qtyNoVentas'],
      qtyCasiVentas,
      vc,
      dataEventos['qtyTotalResetReprogramado'],
      dataEventos['qtyResetNucleoIncompleto'],
      qtyBn,
      dataEventos['qtyCitasProximas']
    ]);
  }
  

  return dataEventos;
  
}

function obtenerNombreCompleto(miId, mysheet){
  const fila = buscarFila(miId,mysheet);
  var nombre = mysheet.getRange("C"+fila).getValue();
  var apellido = mysheet.getRange("D"+fila).getValue();
  var nombreCompleto = nombre+" "+apellido;
  return nombreCompleto;
}

function obtenerDatosColumna(hoja, letraColumna) {
  
  // Obtener la última fila con datos en la columna A
  var ultimaFila = hoja.getLastRow();

  var rango = letraColumna+"2:"+letraColumna+ultimaFila;
  
  // Especificar el rango de la columna, desde la fila 1 hasta la última fila con datos
  var rangoColumna = hoja.getRange(rango);
  
  // Obtener los valores de la columna
  var valoresColumna = rangoColumna.getValues();
  
  // Mostrar los valores en la consola de registros
  Logger.log(valoresColumna);
  return(valoresColumna);
  // Ahora puedes hacer lo que quieras con los valores obtenidos
}

function obtenerIdsAsesores(){
  var idsAsesores = obtenerDatosColumna(sheetVendedor,"A");
  var ids = [];

  for (var i = 0; i < idsAsesores.length; i++) {
      ids.push(idsAsesores[i][0]);
  }
  return ids;
}

function borrarFilasExceptoEncabezado(mihoja) {

  var answer = "";

  if (mihoja.getLastRow() > 1) {
    var rangoDatos = mihoja.getRange(2, 1, mihoja.getLastRow() - 1, mihoja.getLastColumn());
    // Borrar el rango de celdas que contiene datos
    rangoDatos.clear({contentsOnly: true});
    answer = "Se limpió exitosamente el sheets del reporte";
  } else {
    answer = "El sheets del reporte no tenía datos";
  }

  return answer;
}
// ------------------ RECUPERAR DATA DE LAS TABLAS ----------------------------------------------
function obtenerDataEventos(miId, mysheet,fechaReporteExcelInicio,fechaReporteExcelFin){
  // DATOS
  var datosEventosTotal = mysheet.getRange(2, 1, mysheet.getLastRow() - 1, mysheet.getLastColumn()).getValues();
  var datosEventos = filasFiltradasPorFecha(datosEventosTotal, fechaReporteExcelInicio,fechaReporteExcelFin,8);
  var datosEventosXvendedor = filtrarPorValor(datosEventos, miId, 2);
  var datosEventosXvendedorXtipoMantenimiento = filtrarPorValor(datosEventosXvendedor,"MANTENIMIENTO", 5);
  var datosEventosXvendedorXtipoDemo = filtrarPorValor(datosEventosXvendedor,"DEMO", 5);
  var datosEventosXvendedorXtipoDemoXprograma = filtrarPorValor(datosEventosXvendedorXtipoDemo,0, 21, false);
  var datosEventosXvendedorXreset = filtrarPorValor(datosEventosXvendedor,"RESET", 6);
  var datosEventosXvendedorXresetReprogramado = filtrarPorValor(datosEventosXvendedor,"RESET REPROGRAMADO", 6);
  var datosEventosXvendedorXresetTele = filtrarPorValor(datosEventosXvendedor,"TELE", 7);
  var datosEventosXvendedorXresetAsesor = filtrarPorValor(datosEventosXvendedor,"ASESOR", 7);
  var datosEventosXvendedorXnucleoIncompleto = filtrarPorValor(datosEventosXvendedor,"NUCLEO INCOMPLETO", 8);
  var datosEventosXvendedorXagendado = filtrarPorValor(datosEventosXvendedor,"AGENDADO", 6);
  // CANTIDADES
  var qtyMantenimientos = datosEventosXvendedorXtipoMantenimiento.length;
  var qtyDemos = datosEventosXvendedorXtipoDemo.length;
  var qtyAgendamientos = qtyMantenimientos + qtyDemos;
  var qtyTotalReset = datosEventosXvendedorXreset.length;
  var qtyTotalResetReprogramado = datosEventosXvendedorXresetReprogramado.length;
  var qtyResetTele = datosEventosXvendedorXresetTele.length;
  var qtyResetAsesor = datosEventosXvendedorXresetAsesor.length;
  var qtyResetNucleoIncompleto = datosEventosXvendedorXnucleoIncompleto.length;
  var qtyCitasProximas = datosEventosXvendedorXagendado.length;
  var qtyCitasPrograma = datosEventosXvendedorXtipoDemoXprograma.length;
  // DATOS INTERNOS
  var motivosResetTele = quitarDuplicados(obtenerListaMotivos(datosEventosXvendedorXresetTele,7));
  var motivosResetAsesor = quitarDuplicados(obtenerListaMotivos(datosEventosXvendedorXresetAsesor,7));

  var datosProcesadosEventos = {
    'qtyAgendamientos': qtyAgendamientos,
    'qtyMantenimientos': qtyMantenimientos,
    'qtyTotalReset': qtyTotalReset,
    'qtyResetTele': qtyResetTele,
    'qtyResetAsesor': qtyResetAsesor,
    'motivosResetTele': motivosResetTele,
    'motivosResetAsesor': motivosResetAsesor,
    'qtyTotalResetReprogramado': qtyTotalResetReprogramado,
    'qtyResetNucleoIncompleto': qtyResetNucleoIncompleto,
    'qtyCitasProximas': qtyCitasProximas,
    'qtyCitasPrograma': qtyCitasPrograma
  };

  return datosProcesadosEventos;
}
function obtenerDataProgramas(miId, mysheet,fechaReporteExcelInicio,fechaReporteExcelFin){
  //PROGRAMAS
  var citasPrograma = 0;
  // DATOS
  var datosProgramasTotal = mysheet.getRange(2, 1, mysheet.getLastRow() - 1, mysheet.getLastColumn()).getValues();
  var datosProgramas = filasFiltradasPorFecha(datosProgramasTotal, fechaReporteExcelInicio,fechaReporteExcelFin,4);
  var datosProgramasXvendedor = filtrarPorValor(datosProgramas, miId, 3);
  // CANTIDADES
  var qtyProgramasXvendedor = datosProgramasXvendedor.length;
  // OPERACIONES
  var recuentoReferidos = obtenerRecuento(datosProgramasXvendedor, 12);
  var recuentoClientesActivos = obtenerRecuento(datosProgramasXvendedor, 13);

  var datosProcesadosProgramas = {
    'qtyProgramasXvendedor': qtyProgramasXvendedor,
    'recuentoReferidos': recuentoReferidos,
    'recuentoClientesActivos': recuentoClientesActivos
  };
  return datosProcesadosProgramas;
}
function obtenerDataVentas(miId, mysheet,fechaReporteExcelInicio,fechaReporteExcelFin){

  var datosVentasTotal = mysheet.getRange(2, 1, mysheet.getLastRow() - 1, mysheet.getLastColumn()).getValues();
  var datosVentas = filasFiltradasPorFecha(datosVentasTotal, fechaReporteExcelInicio,fechaReporteExcelFin,8);
  var datosVentasXvendedor = filtrarPorValor(datosVentas, miId, 7);
  var listaIdEventosVentas = obtenerListaMotivos(datosVentasXvendedor,1);

  var datosEventos = sheetEvento.getRange(2, 1, sheetEvento.getLastRow() - 1, sheetEvento.getLastColumn()).getValues();
  var datosEventosXvendedor = filtrarPorValor(datosEventos, miId, 2);
  var datosEventosXvendedorXtipoDemo = filtrarPorValor(datosEventosXvendedor,"DEMO", 5);
  var listaTotalIdEventos = obtenerListaMotivos(datosEventosXvendedorXtipoDemo,0);

  //CANTIDADES
  var qtyVentas = datosVentasXvendedor.length;
  

  var qtyNoVentas = elementosNoComunes(listaTotalIdEventos,listaIdEventosVentas);

  console.log("Listas:");
  console.log(listaIdEventosVentas);
  console.log(listaTotalIdEventos);
  console.log("resultado");
  console.log(qtyNoVentas);

  var datosProcesadosVentas = {
    'qtyNoVentas': qtyNoVentas,
    'qtyVentas': qtyVentas
  };

  return datosProcesadosVentas;

}

function filtrarPorValor(datos, valorFiltro, columnaDeInteres, condicion=true) {

  if(condicion){
    var filasFiltradas = datos.filter(function(fila) {
      return fila[columnaDeInteres - 1] == valorFiltro;
    });
  }
  else
  {
    var filasFiltradas = datos.filter(function(fila) {
      return fila[columnaDeInteres - 1] != valorFiltro;
    });
  }

  return filasFiltradas;
}

function obtenerListaMotivos(miArray, columna){
  var listaMotivos = [];
  for (var i = 0; i < miArray.length; i++) {
      listaMotivos.push(miArray[i][columna]);
  }
  return listaMotivos;
}

function quitarDuplicados(lista) {
  // Convertir la lista en un conjunto para eliminar duplicados y luego volver a convertirlo a una lista
  var listaSinDuplicados = Array.from(new Set(lista));
  // Convertir la lista sin duplicados a un string separando los valores por comas
  var stringResultado = listaSinDuplicados.join(', ');
  // Devolver el string resultante
  if(stringResultado.length == 0)
  {
    return 0;
  }
  else
  {
    return stringResultado;
  }
}

function obtenerRecuento(datosProgramas, column) {

  var columna = datosProgramas.map(function(fila) {
    return fila[column]; // (índice de la columna desde 0)
  });

  // Filtrar los valores numéricos
  var valoresNumericos = columna.filter(function(valor) {
    return !isNaN(valor); // Filtrar los valores que no son NaN (es decir, números)
  });

  // Calcular la suma de los valores numéricos
  var suma = valoresNumericos.reduce(function(total, valor) {
    return total + valor;
  }, 0); // El segundo parámetro de reduce() especifica el valor inicial de total

  if(suma){
    return suma;
  }
  else
  {
    return 0;
  }
  
}

function elementosNoComunes(lista1, lista2) {
  // Convertir las listas en conjuntos para eliminar duplicados
  var conjunto1 = new Set(lista1);
  var conjunto2 = new Set(lista2);

  // Calcular la diferencia simétrica entre los conjuntos
  var diferencia1 = [...conjunto1].filter(elemento => !conjunto2.has(elemento));
  //var diferencia2 = [...conjunto2].filter(elemento => !conjunto1.has(elemento));

  // Calcular la longitud de la diferencia simétrica total
  //var totalNoComunes = diferencia1.length + diferencia2.length;
  var totalNoComunes = diferencia1.length;

  return totalNoComunes;
}

function filasFiltradasPorFecha(datos, fechaInicial, fechaFinal, columnaFecha){
  // Supongamos que queremos filtrar las filas donde la fecha está entre el 1 de enero de 2022 y el 31 de diciembre de 2022
  var fechaInicio = new Date(fechaInicial);
  var fechaFin = new Date(fechaFinal);

  // Filtrar las filas basadas en la columna de fecha
  var filasFiltradas = datos.filter(function(fila) {
    var fechaFila = new Date(fila[columnaFecha]); // Suponiendo que la columna de fecha está en la primera posición (índice 0)
    return fechaFila >= fechaInicio && fechaFila <= fechaFin;
  });
  return filasFiltradas;
}

//FIN DEL ARCHIVO
