// Function to update the iframe with HTML, CSS, and JavaScript
function run() {
    let htmlCode = document.getElementById("html-code").value; // Get HTML content
    let cssCode = `<style>${document.getElementById("css-code").value}</style>`; // Get CSS wrapped in <style> tags
    let jsCode = document.getElementById("js-code").value; // Get JavaScript content

    let output = document.getElementById("output"); // Reference the iframe
    let errorMessage = document.getElementById("error-message"); // Reference error display area

    // Clear previous error messages
    errorMessage.textContent = "";

    try {
        // Inject HTML and CSS into the iframe
        output.contentDocument.body.innerHTML = htmlCode; // Update body with HTML
        output.contentDocument.head.innerHTML = cssCode; // Update head with CSS

        // Dynamically execute JavaScript
        output.contentWindow.eval(jsCode); // Evaluate JavaScript code in iframe context
    } catch (error) {
        // Catch errors, log to console, and display error on the page
        console.error("JavaScript Error: ", error.message);
        errorMessage.textContent = `Error: ${error.message}`; // Display error below the editor
    }
}

// Function to execute JavaScript with a delay (e.g., 1.75 seconds)
let timeoutId; // To track typing delay
function runAfterDelay() {
    const jsCode = document.getElementById("js-code").value; // Get JavaScript content
    const output = document.getElementById("output"); // Reference iframe
    const errorMessage = document.getElementById("error-message"); // Reference error display area

    // Clear previous error messages
    errorMessage.textContent = "";

    // Clear any previous timeout to restart the countdown
    clearTimeout(timeoutId);

    // Set a timeout to evaluate JavaScript after 1.75 seconds of typing inactivity
    timeoutId = setTimeout(() => {
        try {
            output.contentWindow.eval(jsCode); // Dynamically execute JavaScript code
        } catch (error) {
            // Handle and display errors
            errorMessage.textContent = `Error: ${error.message}`; // Display error after delay
        }
    }, 1750); // 1.75-second delay
}

// * BoilerPlate that i never used
// document.getElementById("html-code").value =
// `<!DOCTYPE html>
// <html>
//   <body>
//   </body>
// </html>`;