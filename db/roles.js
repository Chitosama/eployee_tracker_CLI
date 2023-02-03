const db = require("./connection");
const inquirer = require("inquirer");
const { viewAllDepartments } = require("./departments");

async function viewAllRoles() {
  try {
    const role = db.query("SELECT * FROM role");
    return role;
  } catch (err) {
    console.log(err);
  }
}

async function addRole() {
    try {
      const department = await viewAllDepartments();
      const { title, salary, department_id } = await inquirer.prompt([
        {
          type: "input",
          name: "title",
          message: 'Enter title',
        },
        {
          type: "list",
          name: "department_id",
          message: 'Enter the department',
          choices: department.map((department) => {
            return {
              name: department.name,
              value: department.id,
            };
          }),
        },
        {
          type: "input",
          name: "salary",
          message: 'Enter salary',
        },
      ]);
  
      await db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ("${title}", "${salary}", "${department_id}")`
      );
      const newRole = await viewAllRoles();
  
      return newRole;
    } catch (err) {
      console.log(err);
    }
  }
  module.exports = { viewAllRoles, addRole };