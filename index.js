const {prompt} = require('inquirer');
//const { default: Choice } = require('inquirer/lib/objects/choice');
const db = require('./db/connection');
const {viewAllDepartments, addDepartment} = require('./db/departments');
const {viewAllEmployees, addEmployee, updateEmployeeRole} = require('./db/employees');
const {viewAllRoles, addRole} = require('./db/roles');

const start = async (s) => {
    //used to make sure we are running and user friendly
    if (s) console.log('How can we assist with Employee Management today?');

    //Run set of options used to create and manage employees
    const {choices}= await prompt([{
        type:'list',
        name:'choices',
        message:'Please select from opitons available',
        choices:[
            'View all departments',
            'View all employees',
            'view all roles',
            'Add department',
            'Add employee',
            'Add role',
            'Update employee role',
            'Exit'
        ]
}]);

switch(choices){
    case 'View all departments':
        const departments = await viewAllDepartments();
        console.table(departments);
        break;
    case 'View all employees':
        const employees = await viewAllEmployees();
        console.table(employees);
        break;
    case 'View all roles':
        const roles = await viewAllRoles();
        console.table(roles);
        break;
    case 'Add department':
        const newDepartment = await addDepartment();
        console.table(newDepartment);
        break;
    case 'Add employee':
        const newEmployee = await addEmployee();
        console.table(newEmployee)
        break;
    case 'Add role':
        const newRole = await addRole();
        break;
    case 'Update employee role':
        const updateRole = await updateEmployeeRole();
        break;
    case 'Exit':
        console.log('Thank you! Have a wonderful day!');
        process.exit();

}

start(false);
};

start (true);