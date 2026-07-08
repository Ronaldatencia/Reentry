const SPREADSHEET_ID = '1laiseLDWvTFM9M6xFGIrhbTuwGx5zcVXzxPoK0YQ13g';

const TABLES = {
  vehicles: {
    sheet: 'Vehiculos',
    key: 'plate',
    columns: {
      placa: 'plate',
      marca: 'brand',
      modelo: 'model',
      ano: 'year',
      color: 'color',
      tarifa: 'rate',
      estado: 'status',
      conductor: 'driver',
      diasPermitidos: 'allowedDays',
      tarifaFestivo: 'holidayRate',
      idOrigen: 'sourceId'
    }
  },
  drivers: {
    sheet: 'Conductores',
    key: 'id',
    columns: {
      cedula: 'id',
      nombre: 'name',
      telefono: 'phone',
      licencia: 'license',
      vencimiento: 'expires',
      placa: 'plate',
      estado: 'status'
    }
  },
  incomes: {
    sheet: 'Ingresos',
    key: 'id',
    columns: {
      id: 'id',
      fecha: 'date',
      placa: 'plate',
      conductor: 'driver',
      valor: 'value',
      tarifaEsperada: 'expected',
      tarifa: 'tariff',
      periodicidad: 'periodicity',
      saldoPendiente: 'balance',
      estadoPago: 'payStatus',
      metodo: 'method',
      notas: 'notes',
      usuario: 'user',
      creado: 'created',
      origen: 'source',
      monto: 'amount'
    }
  },
  expenses: {
    sheet: 'Gastos',
    key: 'id',
    columns: {
      id: 'id',
      fecha: 'date',
      placa: 'plate',
      categoria: 'cat',
      concepto: 'concept',
      valor: 'value',
      proveedor: 'provider',
      vencimiento: 'expires',
      notas: 'notes',
      usuario: 'user'
    }
  },
  debts: {
    sheet: 'Deudas',
    key: 'id',
    columns: {
      id: 'id',
      fecha: 'date',
      placa: 'plate',
      conductor: 'driver',
      concepto: 'concept',
      valor: 'value',
      notas: 'notes',
      estado: 'status',
      creado: 'created'
    }
  },
  pays: {
    sheet: 'Abonos',
    key: 'id',
    columns: {
      id: 'id',
      deuda: 'debt',
      fecha: 'date',
      valor: 'value',
      notas: 'notes',
      usuario: 'user',
      metodo: 'method',
      creado: 'created',
      placa: 'plate'
    }
  },
  docs: {
    sheet: 'Documentos',
    key: 'id',
    columns: {
      id: 'id',
      placa: 'plate',
      tipo: 'type',
      numero: 'number',
      expedicion: 'issued',
      vencimiento: 'expires',
      valor: 'value'
    }
  },
  savings: {
    sheet: 'Ahorros',
    key: 'id',
    columns: {
      id: 'id',
      ingreso: 'income',
      fecha: 'date',
      placa: 'plate',
      conductor: 'driver',
      valor: 'value',
      notas: 'notes',
      usuario: 'user',
      creado: 'created'
    }
  },
  savingReturns: {
    sheet: 'DevolucionesAhorro',
    key: 'id',
    columns: {
      id: 'id',
      fecha: 'date',
      conductor: 'driver',
      valor: 'value',
      notas: 'notes',
      usuario: 'user',
      creado: 'created'
    }
  },
  tariffs: {
    sheet: 'TarifasVinculacion',
    key: 'id',
    columns: {
      id: 'id',
      placa: 'plate',
      conductor: 'driver',
      valor: 'value',
      periodicidad: 'periodicity',
      inicio: 'start',
      fin: 'end',
      estado: 'status',
      notas: 'notes',
      creado: 'created'
    }
  }
};

function doGet(e) {
  const action = (e.parameter.action || 'read').toLowerCase();
  if (action !== 'read') return json_({ ok: false, error: 'Accion no soportada' });
  return json_({ ok: true, data: readAll_() });
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    const kind = String(body.kind || '');
    const row = body.row || {};

    if (kind === 'settings') {
      saveSettings_(row);
      return json_({ ok: true });
    }

    const parts = kind.split(':');
    const action = parts[0];
    const table = parts[1];
    if (!TABLES[table]) return json_({ ok: false, error: 'Tabla no soportada' });

    if (action === 'save') upsert_(table, row);
    else if (action === 'delete') remove_(table, row);
    else return json_({ ok: false, error: 'Accion no soportada' });

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message || err) });
  }
}

function doOptions() {
  return json_({ ok: true });
}

function readAll_() {
  const out = { settings: readSettings_() };
  Object.keys(TABLES).forEach(function(table) {
    out[table] = readTable_(table);
  });
  return out;
}

function readSettings_() {
  const sheet = getSheet_('Configuracion');
  const values = sheet.getDataRange().getDisplayValues();
  const settings = {};
  for (let i = 1; i < values.length; i++) {
    if (values[i][0]) settings[values[i][0]] = values[i][1];
  }
  return settings;
}

function readTable_(table) {
  const config = TABLES[table];
  const sheet = getTableSheet_(config);
  const range = sheet.getDataRange();
  const values = range.getValues();
  const displayValues = range.getDisplayValues();
  if (values.length < 2) return [];
  const headers = displayValues[0].map(String);
  return values.slice(1).filter(function(row) {
    return row.some(function(cell) { return cell !== ''; });
  }).map(function(row, rowIndex) {
    const item = {};
    headers.forEach(function(header, index) {
      const key = config.columns[header] || header;
      item[key] = normalizeCell_(row[index], displayValues[rowIndex + 1][index]);
    });
    return item;
  });
}

function normalizeCell_(value, displayValue) {
  if (value instanceof Date) {
    return Utilities.formatDate(value, Session.getScriptTimeZone(), 'yyyy-MM-dd');
  }
  return value == null || value === '' ? '' : String(displayValue || value);
}

function saveSettings_(settings) {
  const sheet = getSheet_('Configuracion');
  const values = sheet.getDataRange().getValues();
  const existing = {};
  for (let i = 1; i < values.length; i++) {
    if (values[i][0]) existing[values[i][0]] = i + 1;
  }
  Object.keys(settings).forEach(function(key) {
    const row = existing[key] || sheet.getLastRow() + 1;
    sheet.getRange(row, 1, 1, 2).setValues([[key, settings[key]]]);
  });
}

function upsert_(table, row) {
  const config = TABLES[table];
  const sheet = getTableSheet_(config);
  const headers = headers_(sheet);
  const key = String(row[config.key] || '');
  if (!key) throw new Error('Registro sin identificador');
  const rowNumber = findRow_(sheet, headers, config, key);
  const values = headers.map(function(header) {
    const englishKey = config.columns[header] || header;
    return row[englishKey] == null ? '' : row[englishKey];
  });
  if (rowNumber) sheet.getRange(rowNumber, 1, 1, headers.length).setValues([values]);
  else sheet.appendRow(values);
}

function remove_(table, row) {
  const config = TABLES[table];
  const sheet = getTableSheet_(config);
  const headers = headers_(sheet);
  const key = String(row[config.key] || row.id || row.plate || '');
  const rowNumber = findRow_(sheet, headers, config, key);
  if (rowNumber) sheet.deleteRow(rowNumber);
}

function findRow_(sheet, headers, config, key) {
  const spanishKey = Object.keys(config.columns).find(function(header) {
    return config.columns[header] === config.key;
  });
  const keyColumn = headers.indexOf(spanishKey);
  if (keyColumn < 0) return 0;
  const values = sheet.getDataRange().getDisplayValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][keyColumn]).toUpperCase() === key.toUpperCase()) return i + 1;
  }
  return 0;
}

function headers_(sheet) {
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getDisplayValues()[0].map(String);
}

function getTableSheet_(config) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(config.sheet);
  if (!sheet) {
    sheet = ss.insertSheet(config.sheet);
    sheet.getRange(1, 1, 1, Object.keys(config.columns).length).setValues([Object.keys(config.columns)]);
  }
  if (sheet.getLastRow() === 0 || sheet.getLastColumn() === 0) {
    sheet.getRange(1, 1, 1, Object.keys(config.columns).length).setValues([Object.keys(config.columns)]);
  }
  return sheet;
}

function getSheet_(name) {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
  if (!sheet) throw new Error('No existe la hoja ' + name);
  return sheet;
}

function json_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
