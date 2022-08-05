function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    Client.checkForName(formText)

    console.log("::: Form Submitted :::")
    let payload = {
        url: formText
    };
    fetch(" http://localhost:8080/sentiment", {
        method: 'POST',
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload), // body data type must match "Content-Type" header        
    })
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('irony').innerHTML = "Irony: "+ res.irony
        document.getElementById('subjectivity').innerHTML = "Subjectivity: "+ res.subjectivity
    })
    
}

export { handleSubmit }
