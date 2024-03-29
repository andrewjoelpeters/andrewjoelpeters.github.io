// This must be triggered by a user event.
function copyText (text) {
    event.preventDefault();
    // Create the textarea input to hold our text.
    const element = document.createElement('textarea');
    element.value = text;
    // Add it to the document so that it can be focused.
    document.body.appendChild(element);
    // Focus on the element so that it can be copied.
    element.focus({preventScroll:true});
    element.setSelectionRange(0, element.value.length);
    // Execute the copy command.
    document.execCommand('copy');
    // Remove the element to keep the document clear.
    document.body.removeChild(element);
    change_text("copied!");
    setTimeout(success, 3000);
  }

function change_text (tooltip) {
  var txt = document.getElementsByClassName("tooltiptext");
  txt[0].innerHTML = tooltip;
}

function success() {
  change_text("copy to clipboard");
}
