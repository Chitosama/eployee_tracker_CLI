const db = require("./connection");
const inquirer = require("inquirer");

async function viewAllDepartments() {
    try{
        const departments = await db.query('SELECT * FROM departments');
        return departments;
    } catch (err){
        console.log(err)
    }
}

async function addDepartment() {
    try{
        const departments = await viewAllDepartments();
        const {name} = await inquirer.prompt([
            {
            type: 'input',
            name: 'name',
            message: 'Enter name of new department',
        }
        ]);
        await db.query(`INSERT INTO departments (name) VALUES ('${name}')`);
        const newDepartment = await viewAllDepartments();
        return newDepartment;
    }
    catch (err){
        console.log(err)
    }
}

module.exports = {viewAllDepartments, addDepartment};