/* MiniTerm - A minimal terminal emulator for web portfolios */

const TerminalData = {
  // User configuration
  config: {
    machineName: "user@user ~ # ",
    userBirthday: "01/01/2000",
    email: "user@email.com",
  },

  // Command registry
  commands: [
    {
      name: "ls",
      description:
        "Lists the valid commands that the terminal will accept. Try some out!",
    },
    {
      name: "whois",
      description: "The whois utility lists general information.",
    },
    {
      name: "skills",
      description: "The skills utility lists skills information.",
    },
    {
      name: "experience",
      description: "The experience lists professional experience.",
    },
    {
      name: "github",
      description: "Provides a link to the source code for this project.",
    },
    {
      name: "uptime",
      description:
        "The uptime utility displays the current time, the length of time the system has been up, the number of users, and the load average of the system over the last 1, 5, and 15 minutes.",
    },
    {
      name: "history",
      description:
        "The history utility lists all previous commands used within the current terminal session.",
    },
    {
      name: "man",
      description:
        "The man utility is the command manual and provides a full list of system commands / descriptions.",
    },
    {
      name: "clear",
      description:
        "The clear utility clears all previous command output and resets the terminal session.",
    },
    {
      name: "contact",
      description: "The contact utility provides a contact email address.",
    },
    {
      name: "exit",
      description: "The exit utility leaves the terminal session.",
    },
  ],

  // Personal data
  skills: [
    { name: "• YOUR SKILL HERE" },
    { name: "• YOUR SKILL HERE" },
    { name: "• YOUR SKILL HERE" },
    { name: "• YOUR SKILL HERE" },
    { name: "• YOUR SKILL HERE" },
    { name: "• YOUR SKILL HERE" },
  ],

  experience: [
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "LDN, UK",
    },
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "CBG, UK",
    },
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "CBG, UK",
    },
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "CBG, UK",
    },
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "CBG, UK",
    },
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "CBG, UK",
    },
    {
      title: "ROLE",
      company: "COMPANY NAME",
      duration: "FROM - TO",
      location: "HNVR, DE",
    },
  ],

  // Content for various commands
  content: {
    whois: "<p>WHOIS CONTENT HERE</p>",

    github: `<p>- 🖥️ MINITERM ON GITHUB 🎉 -</p>
<p>Miniterm is an open-source project by thomaskr. Get your own, today!</p>
<p><a href="https://github.com/thmsrmbld/miniterm" target="_blank">miniterm.github</a></p>`,

    instructions:
      "- ✳ 'ls' lists valid commands. ⇧ & ⇩  arrows cycle command history -",
  },
};

// Terminal renderer - Handles all DOM operations
class TerminalRenderer {
  
  constructor(containerId, siteContainerId) {
    this.terminalContainer = document.getElementsByClassName(containerId)[0];
    this.siteContainer = document.getElementsByClassName(siteContainerId)[0];
    this.currentTerminalDiv = this.terminalContainer;
    this.tableCounters = { man: 0, experience: 0, skills: 0 };
  }

  // Create a new terminal output line
  createOutputLine(content, className = "ag output-row") {
    const outputLine = document.createElement("div");
    outputLine.innerHTML = content;
    outputLine.setAttribute("class", className);
    this.siteContainer.insertBefore(outputLine, this.currentTerminalDiv);
    return outputLine;
  }

  // Create a command line with the machine name
  createCommandLine(input) {
    return this.createOutputLine(
      TerminalData.config.machineName + input,
      "ag output-row green-hl"
    );
  }

  // Generate and insert a table
  createTable(data, type) {
    this.tableCounters[type]++;
    const count = this.tableCounters[type];

    // Create title
    this.createOutputLine(` --- ${type.toUpperCase()} --- `);

    // Create table
    const table = document.createElement("table");
    table.setAttribute(
      "class",
      `${type.substring(0, 2)}Tb${count} ag ${type.substring(
        0,
        2
      )}Table output-row`
    );
    this.siteContainer.insertBefore(table, this.currentTerminalDiv);

    // Generate table contents
    this.generateTableContent(table, data);

    return table;
  }

  // Generate table contents
  generateTableContent(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let textContent = document.createTextNode(element[key]);
        cell.appendChild(textContent);
      }
    }
  }

  // Clear all output
  clearOutput() {
    const agLines = document.getElementsByClassName("ag");
    while (agLines[0]) {
      agLines[0].parentNode.removeChild(agLines[0]);
    }

    // Reset table counters
    for (let counter in this.tableCounters) {
      this.tableCounters[counter] = 0;
    }
  }

  // Initialize terminal UI
  initializeTerminalUI() {
    // Set terminal background color
    this.terminalContainer.style.backgroundColor = "rgba(0, 255, 0, 0.06)";

    // Create input field
    const userInput = document.createElement("input");
    userInput.setAttribute("type", "text");
    userInput.setAttribute("class", "terminal-input");
    userInput.setAttribute("autofocus", "autofocus");

    // Set machine name
    document.getElementsByClassName("machine-name")[0].innerHTML =
      TerminalData.config.machineName;

    // Append input to terminal
    this.terminalContainer.appendChild(userInput);

    return userInput;
  }

  // Display login message
  displayLoginMessage() {
    const todaysDate = new Date();
    document.getElementsByClassName("login-time")[0].innerHTML =
      "Last login: " + todaysDate.toLocaleString() + " on ttys001";
  }

  // Display command instructions
  displayCommandInstructions() {
    document.getElementsByClassName("command-list")[0].innerHTML =
      TerminalData.content.instructions;
  }

  // Ensure terminal is scrolled to the bottom
  scrollToBottom() {
    this.terminalContainer.scrollIntoView(false);
  }
}

// Command Processor - Handles command execution
class CommandProcessor {
  constructor(terminal) {
    this.terminal = terminal;
  }

  // Process user input and execute appropriate command
  processCommand(input) {
    const rawInput = input;
    const cleanedInput = input.toLowerCase().trim();

    // Display the command in the terminal
    this.terminal.createCommandLine(rawInput);

    // Execute the command
    switch (cleanedInput) {
      case "":
        // Do nothing
        break;
      case "cd":
        this.cdCommand();
        break;
      case "clear":
        this.terminal.clearOutput();
        break;
      case "contact":
        this.contactCommand();
        break;
      case "exit":
        window.open(
          "https://www.google.com/search?q=learn+to+code&oq=learn+to+code"
        );
        break;
      case "experience":
        this.experienceCommand();
        break;
      case "miniterm":
      case "github":
        this.githubCommand();
        break;
      case "history":
        this.historyCommand();
        break;
      case "ls":
      case "help":
        this.listCommand();
        break;
      case "man":
        this.manCommand();
        break;
      case "skills":
        this.skillsCommand();
        break;
      case "uptime":
        this.uptimeCommand();
        break;
      case "whois":
        this.whoisCommand();
        break;
      default:
        this.commandNotFoundCommand(rawInput);
    }
  }

  // Commands implementations
  cdCommand() {
    this.terminal.createOutputLine(
      "...cd? Where ya gonna change to, kid? This ain't a REAL machine..."
    );
  }

  contactCommand() {
    const email = TerminalData.config.email;
    this.terminal.createOutputLine(
      `📧 <a href="mailto: ${email}?subject=Hello, Thomas!" target="_blank">${email}</a>`
    );
  }

  experienceCommand() {
    this.terminal.createTable(TerminalData.experience, "experience");
  }

  githubCommand() {
    this.terminal.createOutputLine(TerminalData.content.github);
  }

  historyCommand() {
    TerminalState.history.forEach((cmd, index) => {
      this.terminal.createOutputLine(`${index + 1} ${cmd}`);
    });
  }

  listCommand() {
    const commandNames = TerminalData.commands
      .map((cmd) => cmd.name)
      .join(", ");
    this.terminal.createOutputLine(commandNames);
  }

  manCommand() {
    this.terminal.createTable(TerminalData.commands, "man");
  }

  skillsCommand() {
    this.terminal.createTable(TerminalData.skills, "skills");
  }

  uptimeCommand() {
    const birthday = new Date(TerminalData.config.userBirthday);
    const today = new Date();
    const daysDelta =
      (today.getTime() - birthday.getTime()) / (1000 * 3600 * 24);
    const timeNow = today.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    this.terminal.createOutputLine(
      `${timeNow} up ${Math.round(
        (daysDelta + Number.EPSILON) * 100
      )} days, 1 user, load averages: 5.24 5.18 5.42`
    );
  }

  whoisCommand() {
    this.terminal.createOutputLine(TerminalData.content.whois);
  }

  commandNotFoundCommand(input) {
    this.terminal.createOutputLine(`-bash: ${input}: command not found`);
  }
}

// Terminal State Manager - Handles terminal state
class TerminalState {
  static history = [];
  static cursorPosition = 0;

  static addToHistory(command) {
    if (command.trim() !== "") {
      this.history.push(command);
      this.cursorPosition = this.history.length;
    }
  }

  static getPreviousCommand() {
    if (this.cursorPosition > 0) {
      this.cursorPosition--;
      return this.history[this.cursorPosition];
    }
    return null;
  }

  static getNextCommand() {
    if (this.cursorPosition < this.history.length) {
      this.cursorPosition++;
      return this.cursorPosition === this.history.length
        ? ""
        : this.history[this.cursorPosition];
    }
    return "";
  }
}

// Input Handler - Manages user input events
class InputHandler {
  constructor(terminal, commandProcessor) {
    this.terminal = terminal;
    this.commandProcessor = commandProcessor;
    this.inputElement = null;
  }

  // Initialize the input field
  initializeInput() {
    this.inputElement = this.terminal.initializeTerminalUI();
    this.setupEventListeners();
    return this.inputElement;
  }

  setupEventListeners() {
    // Key event handler
    this.inputElement.addEventListener("keyup", (event) => {
      switch (event.key) {
        case "ArrowUp":
          this.handleUpArrow();
          break;
          
        case "ArrowDown":
          this.handleDownArrow();
          break;
          
        case "Enter":
          this.handleEnterKey(event);
          break;
      }
    });
  }

  handleUpArrow() {
    const prevCmd = TerminalState.getPreviousCommand();
    if (prevCmd !== null) {
      this.inputElement.value = prevCmd;
    }
  }

  handleDownArrow() {
    this.inputElement.value = TerminalState.getNextCommand();
  }

  handleEnterKey(event) {
    event.preventDefault();
    
    const inputValue = this.inputElement.value;
    
    // Only process non-empty commands
    if (inputValue.trim() !== "") {
      // Add to history and process
      TerminalState.addToHistory(inputValue);
      this.commandProcessor.processCommand(inputValue);
    }
    
    // Reset and refocus regardless of input
    this.inputElement.value = "";
    this.inputElement.focus();
    this.terminal.scrollToBottom();
  }

  // Refocus the input field if it loses focus
  refocus() {
    if (document.activeElement !== this.inputElement) {
      this.inputElement.focus();
    }
  }
}

// Main application class
class MiniTerm {

  constructor() {
    // Initialize components
    this.terminal = new TerminalRenderer(
      "terminal-container",
      "site-container"
    );
    this.commandProcessor = new CommandProcessor(this.terminal);
    this.inputHandler = new InputHandler(this.terminal, this.commandProcessor);
    this.initialize();
  }

  initialize() {
    // Schedule startup sequence 
    setTimeout(() => this.terminal.displayLoginMessage(), 400);
    setTimeout(() => this.terminal.displayCommandInstructions(), 1000);
    setTimeout(() => this.inputHandler.initializeInput(), 1400);

    // Set up periodic refocus - delay this until after input is initialized
    setTimeout(() => {
      setInterval(() => this.inputHandler.refocus(), 200);
    }, 1600);
  }
}

// Initialize the full application
document.addEventListener("DOMContentLoaded", () => {
  window.miniTerm = new MiniTerm();
});
