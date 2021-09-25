const msg_notSupported = "Sorry web Storage is not supported!";

// reading and updating time every 2 seconds
if (typeof (Storage) == "undefined") {
    document.write(msg_notSupported);
    window.stop();
}

let count = 0;

// storing and updating time every 2 seconds
window.setInterval(function() {

    // displaying time it is updated
    let time = new Date();
    document.getElementById("timeW").innerHTML = "stored at: " + time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true});

    let textArray = []

    for (i = 0; i < count; i++) {
        let textBox = document.getElementById("text" + i);
        let text = textBox.value;
        textArray.push(text);
        localStorage.setItem("array", textArray);
    };

    console.log(storage);
    
}, 2000);

document.getElementById("add").onclick = function() {
    let notesDiv = document.getElementById("notes");

    let div = document.createElement("div");
    
    let textbox = document.createElement("input");
    textbox.setAttribute("type", "text");
    textbox.setAttribute("style", "background-color: blue; color: white;");
    textbox.setAttribute("id", "text" + count);
    div.appendChild(textbox);

    let removeButton = document.createElement("button");
    removeButton.innerHTML = "remove";
    removeButton.setAttribute("style", "background-color:orange; color: white;");
    removeButton.onclick = function() {
        div.removeChild(textbox);
        div.removeChild(removeButton);
    }

    div.appendChild(removeButton);

    notesDiv.appendChild(div);

    count++;
    console.log("yay!" + textbox.id);
};