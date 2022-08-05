function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou"
    ]
    if (input == "") {
        alert("Name should not be empty")
        return
    }
    if (names.includes(inputText)) {
        alert("Welcome, Captain!")
    }
}

export { checkForName }