const BD_ID = '1-Ajhs5Zrdlk-OTewYC3bVi0A-HhuihENJRhngtv0zZQ';
const ss = SpreadsheetApp.openById(BD_ID);
const URLactual = ScriptApp.getService().getUrl();


const sheetPersona = ss.getSheetByName('persona'); 
const [headers_persona, ...usersInfo_persona] = sheetPersona.getDataRange().getDisplayValues();
const sheetEvento = ss.getSheetByName('evento'); 
const [headers_evento, ...usersInfo_evento] = sheetEvento.getDataRange().getDisplayValues();
const sheetEmpleado = ss.getSheetByName('empleado'); 
const [headers_empleado, ...usersInfo_empleado] = sheetEmpleado.getDataRange().getDisplayValues();
const sheetVendedor = ss.getSheetByName('vendedor'); 
const [headers_vendedor, ...usersInfo_vendedor] = sheetVendedor.getDataRange().getDisplayValues();
const sheetCliente = ss.getSheetByName('cliente'); 
const [headers_cliente, ...usersInfo_cliente] = sheetCliente.getDataRange().getDisplayValues();
const sheetPrograma = ss.getSheetByName('programa'); 
const [headers_programa, ...usersInfo_programa] = sheetPrograma.getDataRange().getDisplayValues();
const sheetVenta = ss.getSheetByName('venta'); 
const [headers_venta, ...usersInfo_venta] = sheetVenta.getDataRange().getDisplayValues();
var listaCelulares = getCelularColumnData();

function doGet() {
  var template = HtmlService.createTemplateFromFile('main');
  var output = template.evaluate();
  return output;
}

function include ( fileName ){
  return HtmlService.createHtmlOutputFromFile( fileName ).getContent();
}

function getData(){
  
  const overallDict = {
    //'persona':{headers_persona,usersInfo_persona},
    'evento':{headers_evento,usersInfo_evento},
    'empleado':{headers_empleado,usersInfo_empleado},
    'vendedor':{headers_vendedor,usersInfo_vendedor},
    'cliente':{headers_cliente, usersInfo_cliente},
    'programa':{headers_programa,usersInfo_programa},
    'venta':{headers_venta,usersInfo_venta}
  };

  return overallDict;
}

function getCelularColumnData() {
  
  // Obtén todos los datos de la hoja
  var data = sheetPersona.getDataRange().getValues();
  
  // Encuentra el índice de la columna 'celular'
  var header = data[0]; // Asumiendo que la primera fila contiene los encabezados
  var celularIndex = header.indexOf('celular');
  
  // Comprueba si se ha encontrado la columna 'celular'
  if (celularIndex === -1) {
    Logger.log('No se encontró la columna "celular".');
    return;
  }
  
  // Crea una lista para almacenar los valores de la columna 'celular'
  var celularList = [];
  
  // Itera a través de las filas y agrega los valores de la columna 'celular' a la lista
  for (var i = 1; i < data.length; i++) { // Comienza desde 1 para omitir la fila de encabezado
    if(data[i][celularIndex]!='NULL'){
      celularList.push(data[i][celularIndex]);
    }
  }

  return celularList;
}
