function hello() {
    const iframe = document.getElementById("reference");

    // Define the table structure
    const tableHTML = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Toggle Messages</title>
            <style>
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    oveflow: hidden;
                }
                body {
                    font-family: Arial, sans-serif;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    background-color: #f0f0f0;
                }
                .buttons {
                    margin-bottom: 20px;
                }
                button {
                    padding: 10px 20px;
                    margin: 5px;
                    border: none;
                    background-color: #007BFF;
                    color: white;
                    cursor: pointer;
                    font-size: 16px;
                    border-radius: 5px;
                }
                button:hover {
                    background-color: #0056b3;
                }
                .messages {
                    text-align: center;
                }
                .message {
                    display: none; /* Initially hidden */
                    margin-top: 10px;
                    font-size: 18px;
                    color: #333;
                }
            </style>
        </head>
        <body>
            <div class="buttons">
                <button id="html-btn">HTML</button>
                <button id="css-btn">CSS</button>
                <button id="js-btn">JavaScript</button>
            </div>
            
            <div class="messages">
                <div id="html-message" class="message">Hey, This is HTML!</div>
                <div id="css-message" class="message">Hey, This is CSS!</div>
                <div id="js-message" class="message">Hey, This is JavaScript!</div>
            </div>

            <script>
                document.addEventListener("DOMContentLoaded", () => {
                    const buttons = document.querySelectorAll(".buttons button");
                    const messages = document.querySelectorAll(".message");

                    buttons.forEach((button, index) => {
                        button.addEventListener("click", () => {
                            // Hide all messages
                            messages.forEach(message => {
                                message.style.display = "none";
                            });

                            // Toggle the corresponding message's visibility
                            const targetMessage = messages[index];
                            targetMessage.style.display = targetMessage.style.display === "block" ? "none" : "block";
                        });
                    });
                });
            </script>
        </body>
        </html>
    `;

    // Inject the table into the iframe
    iframe.contentDocument.open();
    iframe.contentDocument.write(tableHTML);
    iframe.contentDocument.close();
}
