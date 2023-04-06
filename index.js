const inquirer = require("inquirer")
const Manager = require("./lib/manager")
const Engineer = require("./lib/engineer")
const Intern = require("./lib/intern")
const fs = require("fs")
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
    menu()
})

function menu() {
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: ["add Engineer", "add intern", "finish"]
    })
        .then(res => {
            switch (res.choice) {
                case "add Engineer":
                    addEngineer()
                    break
                case "add intern":
                    addIntern()
                    break
                case "finish":
                    let html = finish()
                    fs.writeFile("index.html", html, err => {
                        console.log("your profile has been generated")
                    })
                    break
            }
        })
}

function addEngineer() {
    inquirer.prompt([{
        type: "input",
        message: "What is the engineer's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the engineer's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the engineer's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the engineer's GitHub?",
        name: "gitHub"
    }
    ]).then(res => {
        let newEngineer = new Engineer(res.name, res.id, res.email, res.gitHub)
        Employees.push(newEngineer)
        menu()
    })
}

function addIntern() {
    inquirer.prompt([{
        type: "input",
        message: "What is the intern's name?",
        name: "name"
    },
    {
        type: "input",
        message: "What is the intern's id?",
        name: "id"
    },
    {
        type: "input",
        message: "What is the intern's email?",
        name: "email"
    },
    {
        type: "input",
        message: "What is the intern's school?",
        name: "school"
    }
    ]).then(res => {
        let newIntern = new Intern(res.name, res.id, res.email, res.school)
        Employees.push(newIntern)
        menu()
    })
}

function finish() {
    let html = ""
    for (let i = 0; i < Employees.length; i++) {
        html += `
        <div class="card">
        <div class="card-header">
            <h2>${Employees[i].name}</h2>
            <h3>${Employees[i].getRole()}</h3>
        </div>
        <div class="card-body">
            <ul>
                <li>ID: ${Employees[i].id}</li>
                <li>Email: ${Employees[i].email}</li>
                <li>${Employees[i].getRole() === "Intern" ? "School: " + Employees[i].school : Employees[i].getRole() === "Engineer" ? "GitHub: " + Employees[i].gitHub : "Office Number: " + Employees[i].officeNumber}</li>
            </ul>
        </div>
        </div>`
    }
    return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
        <title>Document</title>
    </head>
    <body>
    <h1 class="text-center">My Team</h1>
    <div class="d-flex w-100 justify-content-evenly">
        ${html}
        </div>
    </body>
    </html>`
}