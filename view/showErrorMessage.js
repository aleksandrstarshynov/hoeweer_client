export function showErrorMessage(message) {
    const oldError = document.getElementById("error-message");
    if (oldError) oldError.remove();
  
    const errorDiv = document.createElement("div");
    errorDiv.id = "error-message";
    errorDiv.textContent = message;
    const contentDiv = document.getElementById('content-transparent');
    if (contentDiv) {
      contentDiv.appendChild(errorDiv);
    }
  }
  