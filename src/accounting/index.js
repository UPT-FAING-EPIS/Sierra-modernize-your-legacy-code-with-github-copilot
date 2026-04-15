const readlineSync = require('readline-sync');

let storageBalanceCents = 100000;

function formatAmount(cents) {
  return (cents / 100).toFixed(2);
}

function parseAmountToCents(rawValue) {
  const normalized = String(rawValue).trim();

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return null;
  }

  const [wholePart, decimalPart = ''] = normalized.split('.');
  const centsPart = (decimalPart + '00').slice(0, 2);

  return Number(wholePart) * 100 + Number(centsPart);
}

function dataProgram(passedOperation, balanceCents) {
  const operationType = passedOperation;

  if (operationType === 'READ') {
    return storageBalanceCents;
  }

  if (operationType === 'WRITE') {
    storageBalanceCents = balanceCents;
  }

  return storageBalanceCents;
}

function operations(passedOperation) {
  const operationType = passedOperation;
  let finalBalanceCents = 100000;

  if (operationType === 'TOTAL ') {
    finalBalanceCents = dataProgram('READ', finalBalanceCents);
    console.log(`Current balance: ${formatAmount(finalBalanceCents)}`);
    return;
  }

  if (operationType === 'CREDIT') {
    const amountInput = readlineSync.question('Enter credit amount: ');
    const amountCents = parseAmountToCents(amountInput);

    if (amountCents === null) {
      console.log('Invalid amount. Please enter a positive number with up to 2 decimals.');
      return;
    }

    finalBalanceCents = dataProgram('READ', finalBalanceCents);
    finalBalanceCents += amountCents;
    dataProgram('WRITE', finalBalanceCents);
    console.log(`Amount credited. New balance: ${formatAmount(finalBalanceCents)}`);
    return;
  }

  if (operationType === 'DEBIT ') {
    const amountInput = readlineSync.question('Enter debit amount: ');
    const amountCents = parseAmountToCents(amountInput);

    if (amountCents === null) {
      console.log('Invalid amount. Please enter a positive number with up to 2 decimals.');
      return;
    }

    finalBalanceCents = dataProgram('READ', finalBalanceCents);

    if (finalBalanceCents >= amountCents) {
      finalBalanceCents -= amountCents;
      dataProgram('WRITE', finalBalanceCents);
      console.log(`Amount debited. New balance: ${formatAmount(finalBalanceCents)}`);
    } else {
      console.log('Insufficient funds for this debit.');
    }
  }
}

function main() {
  let continueFlag = 'YES';

  while (continueFlag !== 'NO') {
    console.log('--------------------------------');
    console.log('Account Management System');
    console.log('1. View Balance');
    console.log('2. Credit Account');
    console.log('3. Debit Account');
    console.log('4. Exit');
    console.log('--------------------------------');

    const choiceInput = readlineSync.question('Enter your choice (1-4): ');
    const userChoice = Number.parseInt(choiceInput, 10);

    switch (userChoice) {
      case 1:
        operations('TOTAL ');
        break;
      case 2:
        operations('CREDIT');
        break;
      case 3:
        operations('DEBIT ');
        break;
      case 4:
        continueFlag = 'NO';
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
        break;
    }
  }

  console.log('Exiting the program. Goodbye!');
}

main();
