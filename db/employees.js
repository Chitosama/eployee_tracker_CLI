const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllRoles } = require("./roles");
const { viewAllDepartments } = require("./departments");

//view all employees
async function viewAllEmployees() {
    //  "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id;"
    try {
        const employee = await db.query(
          "SELECT * FROM employees"
                );
        return employee;
    } catch (err) {
        console.log(err);
    }
}

//add employee
async function addEmployee() {
    try {
        const role = await viewAllRoles();
        const employee = await viewAllEmployees();
        const departments = await viewAllDepartments();
        const { firstName, lastName, roleId, managerId, departmentId } = await inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "Enter first name",
            },
            {
                type: "input",
                name: "lastName",
                message: "Enter last name",
            },
            {
                type: "list",
                name: "roleId",
                message: "Enter role",
                choices: role.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    };
                }),
            },
            {
                type: "input",
                name: "managerId",
                message: "Enter manager ID",
                choices: employee.map((employee) => {
                    return {
                        name: employee.first_name,
                        value: employee.id,
                    };
                }
            ),
            },
            {
                type: "list",
                name: "departmentId",
                message: "Enter department ID",
                choices: departments.map((departments) => {
                    return {
                        name: departments.name,
                        value: departments.id,
                    };
            }),
            },
        ]);

        await db.query(
            `INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id) VALUES ("${firstName}", "${lastName}", "${roleId}", "${managerId}", "${departmentId}")`
        );
        const newEmployee = await viewAllEmployees();

        return newEmployee;
    } catch (err) {
        console.log(err);
    }
}

async function updateEmployeeRole() {
    try {
        const employee = await viewAllEmployees();
        const role = await viewAllRoles();
        const { employeeId, roleId } = await inquirer.prompt([
            {
                type: "list",
                name: "employeeId",
                message: "Select employee to update",
                choices: employee.map((employee) => {
                    return {
                        name: employee.first_name,
                        value: employee.id,
                    };
                }),
            },
            {
                type: "list",
                name: "roleId",
                message: "Select new role",
                choices: role.map((role) => {
                    return {
                        name: role.title,
                        value: role.id,
                    };
                }),
            },
        ]);
        await db.query(
            `UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`
        );
        const updatedEmployee = await viewAllEmployees();
        return updatedEmployee;
    } catch (err) {
        console.log(err);
    }
}


module.exports = { viewAllEmployees, addEmployee, updateEmployeeRole };

