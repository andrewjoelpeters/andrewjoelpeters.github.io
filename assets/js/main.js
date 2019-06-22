// This must be triggered by a user event.
function copyText (text) {
    // Create the textarea input to hold our text.
    const element = document.createElement('textarea');
    element.value = text;
    // Add it to the document so that it can be focused.
    document.body.appendChild(element);
    // Focus on the element so that it can be copied.
    element.focus();
    element.setSelectionRange(0, element.value.length);
    // Execute the copy command.
    document.execCommand('copy');
    // Remove the element to keep the document clear.
    document.body.removeChild(element);
    button_clicked();
  }

function button_clicked () {
  var txt = document.getElementsByClassName("tooltiptext");
  txt[0].innerHTML = "copied!";
}
