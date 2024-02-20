const text = [];
const nextLink = document.getElementsByTagName("li");
for (const li of nextLink) {
  text.push(li.textContent);
}
console.log(text);

console.log("Hello bitch");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log(message);
  console.log(sender);
});
