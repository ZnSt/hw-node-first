const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const contacts = require('./contacts');

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case 'list':
      const data = await contacts.listContacts();
      console.log('data: ', data);
      break;

    case 'get':
      const contact = await contacts.getContactById(id);
      if (!contact) {
        throw new Error(`Contact with id ${id} not found`);
      }
      console.log('contact: ', contact);
      break;

    case 'add':
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case 'remove':
      const removeContact = await contacts.removeContact(id);
      console.log(removeContact);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
};

// invokeAction({ action: 'list' }); - all contacts

// const id = 'AeHIrLTr6JkxGE6SN-0Rw';
// invokeAction({ action: 'get', id });

// const newData = {
//   name: 'Alex',
//   email: 'znovastanislav@gmail.com',
//   phone: '0993290610',
// };

// invokeAction({ action: 'add', ...newData });

// const removeId = 'rsKkOQUi80UsgVPCcLZZW';

// invokeAction({ action: 'remove', id: removeId });

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
