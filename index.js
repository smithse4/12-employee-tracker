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
        "Add a employee",
        "View all departments",
        "View all roles",
        "View all employees",
        "Update a department",
        "Update a role",
        "Update a employee",
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
}

// Function to add roles
function addRole() {
  console.log("Add a role");
}

// Function to add employment
function addEmployee() {
  console.log("Add an employee");
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
