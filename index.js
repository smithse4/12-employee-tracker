var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Mama90Kay",
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
        "Update a department",
        "Update a role",
        "Update an employee",
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

        case "Update a department":
          updateDepartment();
          break;

        case "Update a role":
          updateRole();
          break;

        case "Update an employee":
          updateEmployee();
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
        type: "input",
        message: "What is the salary for your new role?",
      },
      {
        name: "newRoleDepartmentID",
        type: "input",
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
        type: "input",
        message: "What is the new employee's salary?",
      },
      {
        name: "newEmpRoleID",
        type: "input",
        message: "What is the role ID for your new employee?",
      },
      {
        name: "newEmpManagerID",
        type: "input",
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
    // console.log("All departments");
    // console.log("================");
    // for (let i = 0; i < data.length; i++) {
    //   console.log("ID: " + data[i].id + " || Department: " + data[i].name);
    // }
    console.table(data);
  });
  connection.end();
}

// Function to view roles
function viewRoles() {
  console.log("Viewing all roles");
  connection.query("SELECT * FROM role;", function (err, data) {
    // console.log("All roles");
    // console.log("================");
    // for (let i = 0; i < data.length; i++) {
    //   console.log(
    //     "ID: " +
    //       data[i].id +
    //       " || Title: " +
    //       data[i].title +
    //       " || Salary: " +
    //       data[i].salary +
    //       " || Department ID: " +
    //       data[i].department_id
    //   );
    // }
    console.table(data);
  });
  connection.end();
}

// Function to view employment
function viewEmployees() {
  console.log("Viewing all employees");
  connection.query("SELECT * FROM employee;", function (err, data) {
    // console.log("All employees");
    // console.log("================");
    // for (let i = 0; i < data.length; i++) {
    //   console.log(
    //     "ID: " +
    //       data[i].id +
    //       " || Name: " +
    //       data[i].first_name +
    //       " " +
    //       data[i].last_name +
    //       " || Title: " +
    //       data[i].title +
    //       " || Salary: " +
    //       data[i].salary +
    //       " || Department ID: " +
    //       data[i].department_id
    //   );
    // }
    console.table(data);
  });
  connection.end();
}

// Function to update departments
function updateDepartment() {
  console.log("Update a department");
}

// Function to update role
function updateRole() {
  console.log("Update a role");
}

// Function to update employment
function updateEmployee() {
  console.log("Update an employee");
}
