/* Initialise the log history & cursor position */
let machineName = "user@user ~ # "
let terminalHistoryLog = []
let cursorLogPosition = terminalHistoryLog.length
const userBirthday = "01/01/2000"

/* Set some core DOM items */
let terminalContainer = currentTerminalDiv = document.getElementsByClassName("terminal-container")[0]
let siteContainer = document.getElementsByClassName("site-container")[0]

/* These count the number of tables of a certain type present in the DOM */
let manTableCount = expTableCount = skiTableCount = 0

/* A structure of system commands used for the man pages and valid command list */
const commandData = [
    {
        "name": "ls",
        "description": "Lists the valid commands that the terminal will accept. Try some out!"
    },
    {
        "name": "whois",
        "description": "The whois utility lists general information."
    },
    {
        "name": "skills",
        "description": "The skills utility lists skills information."
    },
    {
        "name": "experience",
        "description": "The experience lists professional experience."
    },
    {
        "name": "github",
        "description": "Provides a link to the source code for this project."
    },
    {
        "name": "uptime",
        "description": "The uptime utility displays the current time, the" +
            " length of time the system has been up, the number of users, and " +
            "the load average of the system over the last 1, 5, and 15 minutes."
    },
    {
        "name": "history",
        "description": "The history utility lists all previous commands used within the current terminal session."
    },
    {
        "name": "man",
        "description": "The man utility is the command manual and provides a full list of system commands / descriptions."
    },
    {
        "name": "clear",
        "description": "The clear utility clears all previous command output and resets the terminal session."
    },
    {
        "name": "contact",
        "description": "The contact utility provides a contact email address."
    },
    {
        "name": "exit",
        "description": "The exit utility leaves the terminal session."
    }
]

const skillsData = [
    {
        "name": "• YOUR SKILL HERE"
    },
    {
        "name": "• YOUR SKILL HERE"
    },
    {
        "name": "• YOUR SKILL HERE"
    },
    {
        "name": "• YOUR SKILL HERE"
    },
    {
        "name": "• YOUR SKILL HERE"
    },
    {
        "name": "• YOUR SKILL HERE"
    }
]

const experienceData = [
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "LDN, UK"
    },
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "CBG, UK"
    },
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "CBG, UK"
    },
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "CBG, UK"
    },
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "CBG, UK"
    },
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "CBG, UK"
    },
    {
        "title": "ROLE",
        "company": "COMPANY NAME",
        "duration": "FROM - TO",
        "location": "HNVR, DE"
    }
]

/* Content for the whois command. Designed to be a string of any length */
const whoisContent = "<p>WHOIS CONTENT HERE</p>"

const githubContent = "<p>- 🖥️ MINITERM ON GITHUB 🎉 -</p>" +
  "<p>Miniterm is an open-source project by thomaskr. Get your own, today!</p>" +
  "<p>" +
  "<a href=\"https://github.com/thmsrmbld/miniterm\"target=\"_blank\">" +
  "miniterm.github</a>" +
  "</p>"

const initialisePage = () => {
    /* Initialises the page. We just sequentially load in the initial page
     elements. We could do this with CSS, but ...here we are) */
    setTimeout(mockLogin, 400)
    setTimeout(mockCommands, 1000)
    setTimeout(loadUserInput, 1400)
    setTimeout(commandListener, 1600)
    setInterval("inputRefocus()", 1800)
}

const inputRefocus = () => {
    /* Refocuses the command line automatically if it falls out of focus */
    let commandLine = document.getElementsByClassName("terminal-input")[0]
    if (document.activeElement !== commandLine) {
        commandLine.focus()
    }
}

const commandListener = () => {
    /* Main command listener - processes and runs the keyboard input */
    let userInput = document.getElementsByClassName("terminal-input")[0]
    userInput.addEventListener("keyup", function(event) {

        /* First, we handle the ArrowUp event (but only if the cursor isn't
         already at the start of the array). Then, we handle the ArrowDown
         event (only if the cursor isn't already at the end of the array). */
        if (event.key === "ArrowUp" && cursorLogPosition > 1){
            cursorLogPosition -= 1
            userInput.value = terminalHistoryLog.slice(
              cursorLogPosition - 1
            )[0]
        }
        if (event.key === "ArrowDown" && cursorLogPosition < terminalHistoryLog.length){
            cursorLogPosition += 1
            userInput.value = terminalHistoryLog.slice(
              cursorLogPosition - 1
            )[0]
        }
        /* Otherwise, we handle the keyboard Enter event */
        else if (event.key === "Enter") {
            event.preventDefault()
            /* We need to transform the input for processing, but also
             want to store the raw data for later use */
            let rawInput = userInput.value
            let cleanedInput = userInput.value.toLowerCase()

            /* We only store non-blanks */
            if (rawInput !== "") {
                terminalHistoryLog.push(rawInput)
                cursorLogPosition = terminalHistoryLog.length + 1
            }
            /* Before processing input, write to the previous line on the screen */
            setPrevLine(rawInput)

            /* This is the main switch statement takes the cleaned input and
             decides which command to fire */
            switch(cleanedInput) {
                case "":
                    /* Do nothing */
                    break
                case "cd":
                    cdPrinter()
                    break
                case "clear":
                    clearTerminal()
                    break
                case "contact":
                    contactPrinter()
                    break
                case "exit":
                    window.open("https://blacklivesmatter.com/")
                    break
                case "experience":
                    experiencePrinter(experienceData)
                    break
                case "miniterm":
                case "github":
                    githubPrinter()
                    break
                case "history":
                    historyPrinter(terminalHistoryLog)
                    break
                case "ls":
                case "help":
                    commandPrinter(commandData)
                    break
                case "man":
                    manPrinter(commandData)
                    break
                case "skills":
                    skillsPrinter(skillsData)
                    break
                case "uptime":
                    uptimePrinter()
                    break
                case "whois":
                    whoisPrinter()
                    break
                default:
                    /* Otherwise, the command doesn't exist */
                    commandNotFoundPrinter(cleanedInput)
            }

            /* Finally, force a reset and re-focus of terminal input field */
            userInput.value = ""
            userInput.focus()
            terminalContainer.scrollIntoView(false)
        }
    })
}

const setPrevLine = (rawInput) => {
    /* Get the relevant DOM objects, and set the content of the previous
     terminal line */
    let previousLineDiv = document.createElement("div")
    previousLineDiv.innerHTML = machineName + rawInput
    previousLineDiv.setAttribute("class", "ag output-row green-hl")
    siteContainer.insertBefore(previousLineDiv, currentTerminalDiv)
}

const uptimePrinter = () => {
    /* Prints how long you've been alive in days since your birthday */
    let duration = new Date(userBirthday)
    let todaysDate = new Date()
    let daysDelta = todaysDate.getTime() - duration.getTime()
    daysDelta = daysDelta / (1000 * 3600 * 24)
    let timeNow = new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})

    /* To display the final uptime */
    let uptimeDiv = document.createElement("p")
    uptimeDiv.setAttribute("class", "ag output-row")
    uptimeDiv.innerHTML = timeNow + " up " + Math.round((daysDelta + Number.EPSILON) * 100) + " days, 1 user, load averages: 5.24 5.18 5.42"
    siteContainer.insertBefore(uptimeDiv, currentTerminalDiv)
}

const skillsPrinter = (skillsData) => {
    /* Prints a list of skills to screen */
    skiTableCount += 1

    /* Build title */
    let skillsStart = document.createElement("div")
    skillsStart.setAttribute("class", "ag output-row")
    skillsStart.innerHTML = " --- SKILLS --- "
    siteContainer.insertBefore(skillsStart, currentTerminalDiv)

    /* Build table */
    let skillsTable = document.createElement("table")
    skillsTable.setAttribute("class", "skTb" + skiTableCount + " ag skTable" +
      " output-row")
    siteContainer.insertBefore(skillsTable, currentTerminalDiv)

    let skTable = document.getElementsByClassName("skTb" + skiTableCount)[0]
    let tdData = Object.keys(skillsData)
    generateTable(skTable, skillsData)
}

const generateTable = (table, data) => {
    /* Generic table generator for tabular data,
    consumes a data structure and spits out a HTML table.*/
    for (let element of data) {
        let row = table.insertRow()

        for (let key in element) {
            let cell = row.insertCell()
            let textContent = document.createTextNode(element[key])
            cell.appendChild(textContent)
        }
    }
}

const experiencePrinter = (experienceData) => {
    /* Prints work experiences to the screen. */
    expTableCount += 1

    /* Build title */
    let expStart = document.createElement("div")
    expStart.setAttribute("class", "ag output-row")
    expStart.innerHTML = " --- EXPERIENCE --- "
    siteContainer.insertBefore(expStart, currentTerminalDiv)

    /* Build table */
    let expTable = document.createElement("table")
    expTable.setAttribute("class", "exTb" + expTableCount + " ag exTable" +" output-row")
    siteContainer.insertBefore(expTable, currentTerminalDiv)

    let exTable = document.getElementsByClassName("exTb" + expTableCount)[0]
    let tdData = Object.keys(experienceData[0])
    generateTable(exTable, experienceData)
    siteContainer.insertBefore(exTable, currentTerminalDiv)
}

const manPrinter = (commandData) => {
    /* Prints man-pages to screen */
    manTableCount += 1

    /* Build title */
    let manStart = document.createElement("div")
    manStart.setAttribute("class", "ag output-row")
    manStart.innerHTML = " --- BSD General Commands Manual --- "
    siteContainer.insertBefore(manStart, currentTerminalDiv)

    /* Build table */
    let manTable = document.createElement("table")
    manTable.setAttribute("class", "mnTb" + manTableCount + " ag mnTable" +
      " output-row")
    siteContainer.insertBefore(manTable, currentTerminalDiv)

    let mnTable = document.getElementsByClassName("mnTb" + manTableCount)[0]
    let tdData = Object.keys(experienceData[0])
    generateTable(mnTable, commandData)
    siteContainer.insertBefore(mnTable, currentTerminalDiv)
}

const whoisPrinter = () => {
    /* Prints 'whois' details to screen */
    let whoisDiv = document.createElement("p")
    whoisDiv.innerHTML = whoisContent
    whoisDiv.setAttribute("class", "ag output-row")
    siteContainer.insertBefore(whoisDiv, currentTerminalDiv)
}

const githubPrinter = () => {
    /* Prints 'whois' details to screen */
    let githubDiv = document.createElement("p")
    githubDiv.innerHTML = githubContent
    githubDiv.setAttribute("class", "ag output-row")
    siteContainer.insertBefore(githubDiv, currentTerminalDiv)
}

const cdPrinter = () => {
    /* Prints 'cd' easter egg to screen */
    let cdDiv = document.createElement("p")
    cdDiv.innerHTML = "...cd? Where ya gonna change to, kid? This ain\'t a REAL machine..."
    cdDiv.setAttribute("class", "ag output-row")
    siteContainer.insertBefore(cdDiv, currentTerminalDiv)
}

const commandPrinter = (commandData) => {
    /* Builds a string of available commands and outputs to terminal */
    let commandArray = []

    commandData.forEach((command) => {
        commandArray.push(command.name)
    })

    let commandString = commandArray.join(", ")
    let lsDiv = document.createElement("div")
    lsDiv.innerHTML = commandString
    lsDiv.setAttribute("class", "ag output-row")
    siteContainer.insertBefore(lsDiv, currentTerminalDiv)
}

const commandNotFoundPrinter = (userInput, rawInput) => {
    /* We need to create two line outputs to emulate bash (the error is an
     extra line */
    let commandNotFoundDiv = document.createElement("div")
    commandNotFoundDiv.innerHTML = "-bash: " + rawInput + ": command not found"
    commandNotFoundDiv.setAttribute("class", "ag output-row")
    siteContainer.insertBefore(commandNotFoundDiv, currentTerminalDiv)
}

const contactPrinter = () => {
    /* Prints contact details to screen */
    let contactDiv = document.createElement("div")
    let email = "user@email.com"
    contactDiv.innerHTML = '📧 <a href="mailto: ' + email + '?subject=Hello, Thomas!" target="_blank">' + email + '</a>'
    contactDiv.setAttribute("class", "ag output-row")
    siteContainer.insertBefore(contactDiv, currentTerminalDiv)
}

const historyPrinter = (terminalHistoryLog) => {
    /* Prints terminal history to screen */
    terminalHistoryLog.forEach((entryItem, index) => {
        let historyOutputRow = document.createElement("div")
        historyOutputRow.innerHTML = (index + 1) + " " + entryItem
        historyOutputRow.setAttribute("class", "ag output-row")
        siteContainer.insertBefore(historyOutputRow, currentTerminalDiv)
    })
}

const clearTerminal = () => {
    /* All autogenerated output has the class "ag", so we just delete those */
    let agLines = document.getElementsByClassName("ag")
    while(agLines[0]){
        agLines[0].parentNode.removeChild(agLines[0])
    }
    /* Null the count of active tables now in the DOM, cause they're all gone */
     expTableCount = skiTableCount = manTableCount = 0
}

const mockLogin = () => {
    /* Micro function for mocking the 'login' process, called on first page
     load timer */
    let todaysDate = new Date()
    document.getElementsByClassName("login-time")[0].innerHTML = "Last login: " + todaysDate.toLocaleString() + " on ttys001"
}

const mockCommands = () => {
    /* Micro function for showing which commands are available, called on
     first page load timer */
    const instructionText = "- 💻 'ls' lists valid commands. ⬆️ & ⬇️ arrows" +
      " cycle command history -"
    document.getElementsByClassName("command-list")[0].innerHTML = instructionText
}

const loadUserInput = () => {
    /* Colors the terminal input element and creates the input on load */
    terminalContainer.style.backgroundColor = "rgba(0, 255, 0, 0.06)"
    let userInput = document.createElement("input")
    userInput.setAttribute("type", "text")
    userInput.setAttribute("class", "terminal-input")
    userInput.setAttribute("autofocus", "autofocus")
    document.getElementsByClassName("machine-name")[0].innerHTML = machineName
    terminalContainer.appendChild(userInput)
}
/* Just calls and runs the whole system :) */
initialisePage()