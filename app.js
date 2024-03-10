let dragged;

/**
 * Registers event handlers for draggable elements.
 */
function initDraggableElements() {
    let draggableElements = document.querySelectorAll('[draggable="true"]');

    draggableElements.forEach(function (draggableElement) {
        
        draggableElement.addEventListener("dragstart", (event) => {
            event.dataTransfer.effectAllowed = "copy";
            event.dataTransfer.setData("text/html", draggableElement.outerHTML);
        });

        draggableElement.addEventListener("dragend", (event) => {
            if (event.dataTransfer.dropEffect == "none") {
                alert("Drop was not successful.");
            }
        });
    });
}

/**
 * Registers event handlers for drop zones.
 */
function initDropZones() {
    let dropTargets = document.querySelectorAll(".dropzone");

    dropTargets.forEach(function (dropTarget) {

        dropTarget.addEventListener("dragenter", (event) => {
            if (event.dataTransfer.types.includes("text/html")) {
                event.preventDefault();
                event.target.classList.add("dragover");
            }
        }); 

        dropTarget.addEventListener("dragleave", (event) => {
            if (event.dataTransfer.types.includes("text/html")) {
                event.target.classList.remove("dragover");
            }
        });
    
        dropTarget.addEventListener("dragover", (event) => {
            if (event.dataTransfer.types.includes("text/html")) {
                event.preventDefault();
            }
        });
    
        dropTarget.addEventListener("drop", (event) => {
            if (event.dataTransfer.types.includes("text/html")) {
                event.preventDefault();
                
                const data = event.dataTransfer.getData("text/html");
                console.log(data);
                event.target.innerHTML = data;
    
                event.target.classList.remove("dragover");
            }
        });
    });
}

window.onload = function () {
    initDraggableElements();
    initDropZones();
}