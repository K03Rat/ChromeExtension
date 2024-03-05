// Add a listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
  // When installed or updated, set an initial empty array for the 'shows' key in local storage
  chrome.storage.local.set({
    shows: [],
  });

  // Create a context menu item for searching TV shows
  chrome.contextMenus.create({
    title: "Search TV Show",
    id: "contextMenu1",
    contexts: ["page", "selection"], // Show this context menu item when selecting text on a page
  });

  // Create a context menu item for reading selected text
  chrome.contextMenus.create({
    title: "Read This Text",
    id: "contextMenu2",
    contexts: ["page", "selection"], // Show this context menu item when selecting text on a page
  });
});

// Add a listener for when a context menu item is clicked
chrome.contextMenus.onClicked.addListener((event) => {
  // Check which context menu item was clicked
  if (event.menuItemId === "contextMenu1") {
    console.log(event.selectionText);
    // If 'Search TV Show' context menu item was clicked
    // Fetch TV show data based on the selected text using TVMaze API
    fetch(`http://api.tvmaze.com/search/shows?q=${event.selectionText}`)
      .then((response) => response.json()) // Parse the JSON response
      .then((data) => {
        console.log(data); // Log the fetched data
        // Store the fetched data in local storage under the 'shows' key
        chrome.storage.local.set({
          shows: data,
        });
      });
  } else if (event.menuItemId === "contextMenu2") {
    // If 'Read This Text' context menu item was clicked
    // Use text-to-speech API to read the selected text
    chrome.tts.speak(event.selectionText, {
      rate: 0.5, // Set the rate of speech
    });
  }
});
