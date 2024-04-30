const ss = SpreadsheetApp.getActiveSpreadsheet();
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
