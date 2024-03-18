const inquirer = require("inquirer");
const mysql = require("mysql");
require("dotenv").config();

function mainMenu() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "What would you like to do? (Use arrow keys)",
				name: "mainOptions",
				choices: [
					"View All Departments",
					"View All Roles",
					"View All Employees",
					"Add a Department",
					"Add a Role",
					"Add an Employee",
					"Update an Employee Role",
					"Exit",
				],
			},
		])
		.then((answers) => {
			if (answers.mainOptions === "Add a Department") {
				return addDeparment();
			} else if (answers.mainOptions === "Add a Role") {
				return addRole();
			} else if (answers.mainOptions === "Add an Employee") {
				return addEmployee();
			} else if (answers.mainOptions === "Update an Employee Role") {
				return updateEmployee();
			} else if (answers.mainOptions === "Exit") {
				console.log("Exiting...");
				process.exit();
			} else {
				// Handle other main options here
				console.log("You selected:", answers.mainOptions);
				// Re-initialize the main menu
				mainMenu();
			}
		});
}
function addDeparment() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the name of the new Department?",
				name: "newDepartment",
			},
		])
		.then((answers) => {
			// Step 2: Connect to the database
			const connection = mysql.createConnection({
				host: "localhost",
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
			});

			connection.connect((err) => {
				if (err) throw err;
				console.log("Connected to the database!");

				// Step 3: Construct the SQL query
				const sql = `INSERT INTO department (department_name) VALUES ('${answers.newDepartment}')`;

				// Step 4: Execute the SQL query
				connection.query(sql, (err, result) => {
					if (err) throw err;
					console.log("New department added:", answers.newDepartment);
					connection.end();
				});
			});
		});
}
function addRole() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the Name of the new Role?",
				name: "newRoleName",
			},
			{
				type: "input",
				message: "What is the Salary of the new Role?",
				name: "newRoleSalary",
			},
			{
				type: "list",
				message: "What is the Department of the new Role?",
				name: "newRoleDept",
				choices: [],
			},
		])
		.then((answers) => {
			// Step 2: Connect to the database
			const connection = mysql.createConnection({
				host: "localhost",
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
			});

			connection.connect((err) => {
				if (err) throw err;
				console.log("Connected to the database!");

				// Step 3: Construct the SQL query
				const sql = `INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)`;
				const params = [
					answers.newRoleName,
					answers.newRoleSalary,
					answers.newRoleDept,
				];

				// Step 4: Execute the SQL query
				connection.query(sql, params, (err, result) => {
					if (err) throw err;
					console.log("New role added:", answers.newRoleName);
					connection.end();
				});
			});
		});
}
function addEmployee() {
	inquirer
		.prompt([
			{
				type: "input",
				message: "What is the First name of the new Employee?",
				name: "newEmployeeFn",
			},
			{
				type: "input",
				message: "What is the Last name of the new Employee?",
				name: "newEmployeeLn",
			},
			{
				type: "list",
				message: "What is the role of the new Employee?",
				name: "newEmployeeRole",
				choices: [],
			},
			{
				type: "list",
				message: "Who is the manager of the new Employee?",
				name: "newEmployeeManager",
				choices: [],
			},
		])
		.then((answers) => {
			// Step 2: Connect to the database
			const connection = mysql.createConnection({
				host: "localhost",
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
			});

			connection.connect((err) => {
				if (err) throw err;
				console.log("Connected to the database!");

				// Step 3: Construct the SQL query
				const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
				const params = [
					answers.newRoleName,
					answers.newRoleSalary,
					answers.newRoleDept,
				];

				// Step 4: Execute the SQL query
				connection.query(sql, params, (err, result) => {
					if (err) throw err;
					console.log("New role added:", answers.newRoleName);
					connection.end();
				});
			});
		});
}
function updateEmployee() {
	inquirer
		.prompt([
			{
				type: "list",
				message: "Which employee's role do you want to update?",
				name: "empRoleUpdateName",
				choices: [],
			},
			{
				type: "list",
				message: "Which role do you want to assign to the selected employee?",
				name: "empRoleUpdateRole",
				choices: [],
			},
		])
		.then((answers) => {
			// Step 2: Connect to the database
			const connection = mysql.createConnection({
				host: "localhost",
				user: process.env.DB_USER,
				password: process.env.DB_PASSWORD,
				database: process.env.DB_NAME,
			});

			connection.connect((err) => {
				if (err) throw err;
				console.log("Connected to the database!");

				// Step 3: Construct the SQL query
				const sql = `UPDATE employee SET role = ? WHERE name = ?`;
				const params = [answers.empRoleUpdateName, answers.empRoleUpdateRole];

				// Step 4: Execute the SQL query
				connection.query(sql, params, (err, result) => {
					if (err) throw err;
					console.log("Employee Role Updated:", answers.empRoleUpdateName);
					connection.end();
				});
			});
		});
}

mainMenu();
