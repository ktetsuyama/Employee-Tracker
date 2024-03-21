const inquirer = require("inquirer");
const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
	host: "localhost",
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
});

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
			if (answers.mainOptions === "View All Departments") {
				return viewAllDepartments();
			} else if (answers.mainOptions === "View All Roles") {
				return viewAllRoles();
			} else if (answers.mainOptions === "View All Employees") {
				return viewAllEmployees();
			} else if (answers.mainOptions === "Add a Department") {
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
				console.log("You selected:", answers.mainOptions);
				// Re-initialize the main menu
				mainMenu();
			}
		});
}

function viewAllDepartments() {
	return connection
		.promise()
		.query("SELECT * FROM department")
		.then(([dept]) => {
			console.table(dept);
			mainMenu();
		})
		.catch((error) => {
			console.log("Error fetching departments:", error);
		});
}

function viewAllRoles() {
	return connection
		.promise()
		.query("SELECT * FROM role")
		.then(([roles]) => {
			console.table(roles);
			mainMenu();
		})
		.catch((error) => {
			console.log("Error fetching roles:", error);
		});
}
function viewAllEmployees() {
	return connection
		.promise()
		.query("SELECT * FROM employee")
		.then(([employees]) => {
			console.table(employees);
			mainMenu();
		})
		.catch((error) => {
			console.log("Error fetching employees:", error);
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
			connection
				.promise()
				.query(
					`INSERT INTO department (name) VALUES ('${answers.newDepartment}')`
				)
				.then(() => {
					console.log("New department added:", answers.newDepartment);
					mainMenu();
				})
				.catch((error) => {
					console.log("Error adding department:", error);
				});
		});
}

function fetchRoleChoices() {
	return connection
		.promise()
		.query(`SELECT id AS value, name FROM department`)
		.then(([results]) => results);
}

async function addRole() {
	const choices = await fetchRoleChoices();
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
				choices: choices,
			},
		])
		.then((answers) => {
			connection
				.promise()
				.query(
					"INSERT INTO role (title, salary, department_id) VALUES (?,?,?)",
					[answers.newRoleName, answers.newRoleSalary, answers.newRoleDept]
				)
				.then(() => {
					console.log("New Role added:", answers.newRoleName);
					mainMenu();
				})
				.catch((error) => {
					console.error("Error adding new Role:", error);
				});
		});
}

function fecthRolesAndManagers() {
	return Promise.all([
		connection.promise().query("SELECT id, title FROM role"),
		connection
			.promise()
			.query(
				'SELECT id, CONCAT(first_name," ", last_name) AS name FROM employee'
			),
	]).then(([roles, managers]) => {
		return { roles: roles[0], managers: managers[0] };
	});
}
async function addEmployee() {
	const { roles, managers } = await fecthRolesAndManagers();
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
				choices: roles.map((role) => ({ name: role.title, value: role.id })),
			},
			{
				type: "list",
				message: "Who is the manager of the new Employee?",
				name: "newEmployeeManager",
				choices: managers.map((manager) => ({
					name: manager.name,
					value: manager.id,
				})),
			},
		])
		.then((answers) => {
			connection
				.promise()
				.query(
					"INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
					[
						answers.newEmployeeFn,
						answers.newEmployeeLn,
						answers.newEmployeeRole,
						answers.newEmployeeManager,
					]
				)
				.then(() => {
					console.log(
						"New Employee added:",
						answers.newEmployeeFn,
						answers.newEmployeeLn
					);
					mainMenu();
				})
				.catch((error) => {
					console.error("Error adding new Employee:", error);
				});
		});
}

function fectEmployeesAndRoles() {
	return Promise.all([
		connection
			.promise()
			.query(
				'SELECT id, CONCAT(first_name," ", last_name) AS name FROM employee'
			),
		connection.promise().query("SELECT id, title FROM role"),
	]).then(([employees, roles]) => {
		return { employees: employees[0], roles: roles[0] };
	});
}
async function updateEmployee() {
	const { employees, roles } = await fectEmployeesAndRoles();
	inquirer
		.prompt([
			{
				type: "list",
				message: "Which employee's role do you want to update?",
				name: "empRoleUpdateName",
				choices: employees.map((employee) => ({
					name: employee.name,
					value: employee.id,
				})),
			},
			{
				type: "list",
				message: "Which role do you want to assign to the selected employee?",
				name: "empRoleUpdateRole",
				choices: roles.map((role) => ({ name: role.title, value: role.id })),
			},
		])
		.then((answers) => {
			connection
				.promise()
				.query(`UPDATE employee SET role = ? WHERE name = ?`, [
					answers.empRoleUpdateName,
					answers.empRoleUpdateRole,
				])
				.then(() => {
					console.log("Employee updated:", result.insertId);
					mainMenu();
				})
				.catch((error) => {
					console.error("Error Updating Employee:", error);
				});
		});
}
mainMenu();
