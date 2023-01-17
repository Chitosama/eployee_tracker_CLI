const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllDepartments() {
    try{
        const departments = db.query('SELECT * FROM department');
        return departments;
    } catch (err){
        console.log(err)
    }
}

async function addDepartment() {
    try{
        const departments = viewAllDepartments();
        const {name} = inquirer.prompt([
            {
            type: 'input',
            name: 'departmentName',
            message: 'Enter name of new department'
        }
        ]);
        await db.query(`INSERT INTO department (name) VALUES ('${name}')`);
        const newDepartment = await viewAllDepartments();
        return newDepartment
    }
    catch (err){
        console.log(err)
    }
}

module.exports = {viewAllDepartments, addDepartment};