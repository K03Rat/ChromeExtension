chrome.storage.local.get(["shows"], (res) => {
  console.log(res);
  if (res.shows && res.shows.length === 0) {
    const errorMes = document.createElement("h2");
    errorMes.textContent = "No results have been found. Try a different name.";
    // Append the error message to the DOM to display it
    document.body.appendChild(errorMes);
  } else {
    for (const show of res.shows) {
      renderShow(show);
    }
  }
});

function renderShow(show) {
  const showDiv = document.createElement("div");
  showDiv.classList.add("showDiv");

  const title = document.createElement("h3");
  if (show && show.show && show.show.name) {
    title.textContent = show.show.name;
  } else {
    title.textContent = "Unknown Title";
  }

  const summary = document.createElement("h4");
  const tempElement = document.createElement("div"); // Create a temporary element

  // Set the innerHTML of the temporary element to the summary content
  tempElement.innerHTML = show.show.summary;

  // Find the <p> tag within the temporary element and get its content
  let paragraphContent = null;
  const paragraphElement = tempElement.querySelector("p");

  if (paragraphElement) {
    paragraphContent = paragraphElement.textContent;
  } else {
    paragraphContent = "No summary found";
  }

  // Set the textContent of the summary element to the content of the <p> tag
  summary.textContent = paragraphContent;
  const image = document.createElement("img");
  image.src = show.show.image ? show.show.image.medium : "fileNotFound.png";
  image.style.width = "210px"; // Set width to 210 pixels
  image.style.height = "295px"; // Set height to 295 pixels

  showDiv.appendChild(title);
  showDiv.appendChild(summary);
  showDiv.appendChild(image);

  document.body.appendChild(showDiv);
}
