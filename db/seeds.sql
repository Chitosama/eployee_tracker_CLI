USE employees;

INSERT INTO departments (name)
VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES
  ('Sales Lead', 100000, 1),
  ('Salesperson', 80000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 200000, 4),
  ('Lawyer', 180000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id, department_id)
VALUES
  ('John', 'Doe', 1, NULL, 2),
  ('Mike', 'Chan', 2,NULL, 1),
  ('Ashley', 'Rodriguez', 3, NULL,3),
  ('Kevin', 'Tupik', 4, NULL,1),
  ('Malia', 'Brown', 5, 2,1),
  ('Sarah', 'Lourd', 6, NULL,1),
  ('Tom', 'Allen', 7, 1,3);

-- Path: employee_tracker_CLI/db/schema.sql