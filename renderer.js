// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

// mainWindow = new BrowserWindow({
//   width: 500,
//   height: 500,
//   icon: "./public/logo.png",
//   backgroundColor: "white",
//   webPreferences: { nodeIntegration: true, contextIsolation: false },
// });

const container = document.querySelector("object");

let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Read initial position from settings.json
fetch("./settings.json", {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    const widget = data.widget1[0];
    // Set initial position based on data from settings.json
    initialX = widget["position-x"];
    initialY = widget["position-y"];
    // Apply initial position to object element
    container.style.left = initialX + "px";
    container.style.top = initialY + "px";
  });

container.addEventListener("mousedown", (event) => {
  // Set initial position based on initialX and initialY variables
  initialX = event.clientX - initialX;
  initialY = event.clientY - initialY;

  isDragging = true;
});

container.addEventListener("mousemove", (event) => {
  if (isDragging) {
    currentX = event.clientX - initialX;
    currentY = event.clientY - initialY;

    xOffset = currentX;
    yOffset = currentY;

    container.style.top = currentY + "px";
    container.style.left = currentX + "px";
  }
});

container.addEventListener("mouseup", (event) => {
  isDragging = false;
  // Update position in settings.json
  fetch("./settings.json", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      widget1: [
        {
          number: 1,
          content: "content",
          font: "font",
          color: "color",
          "position-x": currentX,
          "position-y": currentY,
          "size-x": 200,
          "size-y": 300,
        },
      ],
    }),
  });
});
