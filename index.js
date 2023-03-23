const inquirer = require("inquirer")
const Manager = require("./lib/manager")
const Employees = []
inquirer.prompt([{
    type: "input",
    message: "What is the manager's name?",
    name: "name"
},
{
    type: "input",
    message: "What is the manager's id?",
    name: "id"
},
{
    type: "input",
    message: "What is the manager's email?",
    name: "email"
},
{
    type: "input",
    message: "What is the manager's office number?",
    name: "officeNumber"
}
]).then(res => {
    let newManager = new Manager(res.name, res.id, res.email, res.officeNumber)
    Employees.push(newManager)
})

function menu() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["add Engineer", "add intern", "finish"]
    })
}