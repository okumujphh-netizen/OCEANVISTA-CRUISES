
function showMessage(element, message, type = "info") {
    if (!element) return;

    element.textContent = message;
    element.className = `status-message status-${type}`;
}

function clearElement(element) {
    if (!element) return;

    element.replaceChildren();
}

function createTextElement(tagName, text, className = "") {
    const element = document.createElement(tagName);

    element.textContent = text;

    if (className) {
        element.className = className;
    }

    return element;
}

export {
    showMessage,
    clearElement,
    createTextElement
};
