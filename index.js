var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_tracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  init();
});

// Initial inquiry to ask what the user would like to do
function init() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "Add a department",
        "Add a role",
        "Add an employee",
        "View all departments",
        "View all roles",
        "View all employees",
        "Update an employee role",
      ],
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add a department":
          addDepartment();
          break;

        case "Add a role":
          addRole();
          break;

        case "Add an employee":
          addEmployee();
          break;

        case "View all departments":
          viewDepartments();
          break;
         case "View all roles":
          viewRoles();
          break;

        case "View all employees":
          viewEmployees();
          break;

        case "Update an employee role":
          updateEmployeeRole();
          break;
      }
    });
}

// Function to add departments
function addDepartment() {
  console.log("Add a department");

  // Inquirer prompt to ask for name of new department
  inquirer
    .prompt({
      name: "newDepartment",
      type: "input",
      message: "What department would you like to add?",
    })
    .then(function (answer) {
      connection.query(
        `INSERT INTO department (name) VALUES ("${answer.newDepartment}");`,
        function (err, data) {
          // Then connection.query to INSERT INTO department (name) VALUE ("userInput")
          // Console.table new department table
          console.log("Department has been added.");
        //   console.table(data);
        }
      );
      connection.end();
    });
}

// Function to add roles
function addRole() {
  console.log("Add a role");
  // Inquirer prompt to ask for title, salary and department id of new role,
  inquirer
    .prompt([
      {
        name: "newRoleTitle",
        type: "input",
        message: "What is the job title for your new role?",
      },
      {
        name: "newRoleSalary",
        type: "number",
        message: "What is the salary for your new role?",
      },
      {
          // NEEDS TO BE UPDATED TO INCLUDE LIST OF DEPARTMENTS
        name: "newRoleDepartmentID",
        type: "number",
        message: "What is the department ID for your new role?",
      },
    ])
    .then(function (answer) {
      connection.query(
        `INSERT INTO role (title, salary, department_id) VALUES ("${answer.newRoleTitle}", "${answer.newRoleSalary}", "${answer.newRoleDepartmentID}");`,
        function (err, data) {
          // Then connection.query to INSERT INTO department (name) VALUE ("userInput")
          // Console.table new department table
          console.log("Role has been added.");
        }
      );
      connection.end();
    });
}

// Function to add employment
function addEmployee() {
  console.log("Add an employee");
  // Inquirer prompt to ask for title, salary and department id of new role,
  inquirer
    .prompt([
      {
        name: "newEmpFirstName",
        type: "input",
        message: "What is the new employee's first name?",
      },
      {
        name: "newEmpLastName",
        type: "input",
        message: "What is the new employee's last name?",
      },
      {
        name: "newEmpSalary",
        type: "number",
        message: "What is the new employee's salary?",
      },
      {
        name: "newEmpRoleID",
        type: "number",
        message: "What is the role ID for your new employee?",
      },
      {
        name: "newEmpManagerID",
        type: "number",
        message: "What is the manager ID for your new employee?",
      },
    ])
    .then(function (answer) {
      connection.query(
        `INSERT INTO employee (first_name, last_name, salary, role_id, manager_id) VALUES ("${answer.newEmpFirstName}", "${answer.newEmpLastName}", "${answer.newEmpSalary}", "${answer.newEmpRoleID}", "${answer.newEmpManagerID}");`,
        function (err, data) {
          // Then connection.query to INSERT INTO department (name) VALUE ("userInput")
          // Console.table new department table
          console.log("Employee has been added.");
        }
      );
      connection.end();
    });
}

// Function to view departments
function viewDepartments() {
  console.log("Viewing all departments");
  connection.query("SELECT * FROM department;", function (err, data) {
    console.table(data);
  });
  connection.end();
}

// Function to view roles
function viewRoles() {
  console.log("Viewing all roles");
  connection.query("SELECT role.id, title, salary, name FROM role INNER JOIN department ON role.department_id=department.id;", function (err, data) {
    console.table(data);
  });
  connection.end();
}

// Function to view employmees
function viewEmployees() {
  console.log("Viewing all employees");
  connection.query("SELECT employee.id, first_name, last_name, employee.salary, title, name FROM employee INNER JOIN role on employee.role_id=role.id INNER JOIN department ON role.department_id=department.id;", function (err, data) {
    console.table(data);
  });
  connection.end();
}

// Function to update employee role
function updateEmployeeRole() {
  console.log("Update an employee role");

  // Get a list of employees
  connection.query("SELECT * FROM employee;", function (err, data) {
      console.table(data);
      // display list to user
        inquirer
        .prompt([
          {
          name: "updateEmployee",
          type: "input",
          message: "Enter the id of the employee would you like to update.",
        },
        {
          name: "updateInfo",
          type: "rawlist",
          message: "What information would you like to update?",
          choices: [
              "first_name",
              "last_name",
              "salary",
              "role_id",
              "manager_id",
            ],
        },
        {
            name: "updateInput",
            type: "input",
            message: "What is the new value?",
          }
      ])
        .then(function (answer) {
            // console.log('!!!!!!!!!!!!!!!!!!!!!!', answer);
            let query = `UPDATE employee SET ${answer.updateInfo} = ${answer.updateInput} WHERE id = ${answer.updateEmployee};`
            console.log(query)
          connection.query(
            query,
            function (err, data) {
              // Then connection.query to INSERT INTO department (name) VALUE ("userInput")
              // Console.table new department table
              if (err) {
                  console.log('????????????????', err)
              } else {
                  console.log("Employee has been updated.");
              }
            //   console.table(data);
            }
          );
    });
    // connection.end();
  });
  
}
