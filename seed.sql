INSERT INTO department (name)
VALUES ("Finance"), ("Engineering"), ("Sales"), ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 80000.00, 1), ("Engineer", 160000.00, 2), ("Salesperson", 90000.00, 3), ("Lawyer", 120000.00, 4);

INSERT INTO employee (first_name, last_name, salary, role_id, manager_id)
VALUES ("Anna", "Andrew", 80000.00, 1, 1), ("Bob", "Barnard", 160000.00, 2, 1), ("Catherine", "Carter", 90000.00, 3, 1), ("Daniel", "Darwin", 120000.00, 4, 3);