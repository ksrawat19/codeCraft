// Function to update the iframe with HTML, CSS, and JavaScript
let timeoutId; // For delaying error messages
function run() {
    const htmlCode = document.getElementById("html-code").value;
    const cssCode = `<style>${document.getElementById("css-code").value}</style>`;
    const jsCode = document.getElementById("js-code").value;

    const preview = document.getElementById("preview");
    const errorMessage = document.getElementById("error-message");

    // Clear previous messages
    errorMessage.textContent = "";
    clearTimeout(timeoutId);

    // Combine all code and include error handler
    const combinedCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            ${cssCode}
        </head>
        <body>
            ${htmlCode}

            <script>
                // Handle runtime JS errors
                window.onerror = function(message, source, lineno, colno, error) {
                    parent.postMessage({ type: "iframeError", message: message }, "*");
                };

                try {
                    ${jsCode}
                } catch (err) {
                    window.onerror(err.message);
                }
            <\/script>
        </body>
        </html>
    `;

    // Validate JavaScript code before injecting it into iframe
    try {
        new Function(jsCode); // Check for syntax errors
    } catch (error) {
        // Show syntax error message
        timeoutId = setTimeout(() => {
            // errorMessage.textContent = `Error: ${error.message}`;
            errorMessage.textContent = `Error: Invalid identifier detected`;
            errorMessage.style.color = "red";
        }, 1000);
        return; // Stop execution if there's a syntax error
    }

    // Message event listener to catch errors from iframe
    window.addEventListener(
        "message",
        function handleErrorEvent(event) {
            if (event.data.type === "iframeError") {
                timeoutId = setTimeout(() => {
                    // errorMessage.textContent = `Error: ${event.data.message}`;
                    errorMessage.textContent = `Error: Invalid identifier detected`;
                    errorMessage.style.color = "red";
                }, 1000);

                // Remove listener after one use to avoid duplicates
                window.removeEventListener("message", handleErrorEvent);
            }
        },
        { once: true } // Ensure the listener is automatically removed after first use
    );

    // Inject code into iframe
    preview.contentDocument.open();
    preview.contentDocument.write(combinedCode);
    preview.contentDocument.close();
}

function showTextarea(language) {
    // Hide all textareas
    document.getElementById('html-code').style.display = 'none';
    document.getElementById('css-code').style.display = 'none';
    document.getElementById('js-code').style.display = 'none';

    // Remove 'active' class from all labels
    const labels = document.querySelectorAll('#task-bar label');
    labels.forEach(label => label.classList.remove('active'));

    // Show the selected textarea and mark the corresponding label as active
    if (language === 'html') {
        document.getElementById('html-code').style.display = 'block';
        labels[0].classList.add('active'); // Assuming the first label corresponds to HTML
    } else if (language === 'css') {
        document.getElementById('css-code').style.display = 'block';
        labels[1].classList.add('active'); // Assuming the second label corresponds to CSS
    } else if (language === 'js') {
        document.getElementById('js-code').style.display = 'block';
        labels[2].classList.add('active'); // Assuming the third label corresponds to JS
    }
}

window.onload = function() {
    // Set the HTML textarea's display style to make sure it's visible
    document.getElementById('html-code').style.display = "block";
    // Focus on the HTML textarea
    document.getElementById('html-code').focus();
};