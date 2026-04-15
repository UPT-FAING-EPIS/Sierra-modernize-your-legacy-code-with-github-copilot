const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const path = require('node:path');

const appDir = __dirname;
const appFile = path.join(appDir, 'index.js');

function runApp(inputs) {
  const joinedInput = `${inputs.join('\n')}\n`;
  const result = spawnSync('node', [appFile], {
    cwd: appDir,
    input: joinedInput,
    encoding: 'utf8'
  });

  assert.equal(result.status, 0, `Unexpected exit status. stderr: ${result.stderr}`);
  return result.stdout;
}

test('TC-001: muestra menu principal al iniciar', () => {
  const output = runApp(['4']);

  assert.match(output, /Account Management System/);
  assert.match(output, /1\. View Balance/);
  assert.match(output, /2\. Credit Account/);
  assert.match(output, /3\. Debit Account/);
  assert.match(output, /4\. Exit/);
});

test('TC-002: opcion 4 sale de forma controlada', () => {
  const output = runApp(['4']);

  assert.match(output, /Exiting the program\. Goodbye!/);
});

test('TC-003: opcion invalida es rechazada', () => {
  const output = runApp(['9', '4']);

  assert.match(output, /Invalid choice, please select 1-4\./);
});

test('TC-004: consulta inicial devuelve 1000.00', () => {
  const output = runApp(['1', '4']);

  assert.match(output, /Current balance: 1000\.00/);
});

test('TC-005: credito incrementa saldo', () => {
  const output = runApp(['2', '250.50', '1', '4']);

  assert.match(output, /Current balance: 1250\.50/);
});

test('TC-006: debito reduce saldo', () => {
  const output = runApp(['3', '200.00', '1', '4']);

  assert.match(output, /Current balance: 800\.00/);
});

test('TC-007: debito superior al saldo es bloqueado', () => {
  const output = runApp(['3', '1500.00', '4']);

  assert.match(output, /Insufficient funds for this debit\./);
});

test('TC-008: operaciones multiples conservan saldo acumulado', () => {
  const output = runApp(['2', '100.00', '3', '50.00', '1', '4']);

  assert.match(output, /Current balance: 1050\.00/);
});
