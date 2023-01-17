const {prompt} = require('inquirer');
const { default: Choice } = require('inquirer/lib/objects/choice');
const db = require('./db/connection');
const viewAllDepartments = require('./db/departments');
const viewAllEmployees = require('./db/employees');
const viewAllRoles = require('./db/roles');

const start = async (s) => {
    //used to make sure we are running and user friendly
    if (s) console.log('How can we assist with Employee Management today?');

    //Run set of options used to create and manage employees
    const {options}= await prompt([{
        type:'list',
        name:'choice',
        message:'Please select from opitons available',
        choices:[
            'View all departments',
            'View all employees',
            'view all roles',
            'Exit'
        ]
}]);

switch(Choice){
    case 'View all departments':
        const departments = await viewAllDepartments();
        console.table(departments);
        break;
    case 'View all employees':
        const employees = await viewAllEmployees();
        console.table(employees);
        break;
    case 'view all roles':
        const roles = await viewAllRoles();
        console.table(roles);
        break;
    case 'Exit':
        console.log('Thank you! Have a wonderful day!');
        process.exit();

}

start(false);
};

start (true);