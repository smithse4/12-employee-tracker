INSERT INTO department (name)
VALUES ("Finance"), ("Engineering"), ("Sales"), ("Legal");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("Lawyer", 120000.00, 4), ("Engineer", 160000.00, 2), ("Salesperson", 90000.00, 3), ("Accountant", 80000.00, 1);

SELECT * FROM role;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Anna", "Andrew", 11, 1), ("Bob", "Barnard", 22, 1), ("Catherine", "Carter", 33, 1), ("Daniel", "Darwin", 44, 3), ("Edith", "Edwards", 55, 4);

SELECT * FROM employee;