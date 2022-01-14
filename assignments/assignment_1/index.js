const process = require("process");
function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const argArray = process.argv;
    lengthOfArray = argArray.length;
    return argArray[lengthOfArray-1]
}

function getNameFromEnv() {
    // Write your code here
    const envVariable = process.env.name;
    return envVariable;
}

function getNameFromReadLine() {
    // Write your code here
    const readLine = require("readline");
    const Interface = readLine.createInterface(process.stdin, process.stdout);
    Interface.setPrompt("taking input")
    Interface.prompt()
    Interface.on("line",(input)=>{
        inputvalue = input;
        Interface.close();
    })
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}