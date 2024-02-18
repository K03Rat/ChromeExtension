chrome.runtime.onInstalled.addListener((details) => {
  chrome.contextMenus.create({
    title: "Test Contest Menu",
    id: "contexMenu1",
    contexts: ["page", "selection"],
  });
});
chrome.contextMenus.onClicked.addListener((event) => {
  chrome.tabs.create({
    url: `https://www.imdb.com/find/?q=${event.selectionText}&ref_=nv_sr_sm`,
  });
});

console.log("background scrioptt running");
