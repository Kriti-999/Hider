let mainButton = document.getElementById('mainButton');
let gmeet_messages = document.getElementById('gmeet_messages');
let gmeet_participants = document.getElementById('gmeet_participants');
let gmeet_video = document.getElementById('gmeet_video');
let general_messages = document.getElementById('general_messages');


// Get and set current version
let version = chrome.runtime.getManifest().version;
document.getElementById('version').innerText = version;

// Add or remove stylesheets
function refreshScript(url, file){
  //alert("Trying to refresh...")
  chrome.tabs.query({url}, function(tabs) {
    if (tabs.length !== 0)
      tabs.forEach(function(tab){chrome.tabs.executeScript(tab.id, {file})});
  });
}

const buttonNames = [
  'mainButton',
  'gmeet_messages',
  'gmeet_participants',
  'gmeet_video',
  'gmeet_badge',
'general_messages',

];
const gmeet_url = "https://meet.google.com/*";
const loadMeet_url = "/loadMeet.js";

const refreshMeet = () => {
  refreshScript(gmeet_url, loadMeet_url);
}
// Set current state in popup
chrome.storage.sync.get(buttonNames, function(data) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      mainButton.checked=data.mainButton;
      
      gmeet_messages.checked=data.gmeet_messages;
      gmeet_participants.checked=data.gmeet_participants;
      gmeet_video.checked=data.gmeet_video;
      gmeet_badge.checked=data.gmeet_badge;

      general_messages.checked=data.general_messages;
    });
});

mainButton.addEventListener('change', function() {
  //alert("We changing?");
  chrome.storage.sync.set({mainButton: this.checked});
  refreshMeet();
 // refreshZoom();
});
// Update settings values
gmeet_messages.addEventListener('change', function() {
  //alert("msg")
  chrome.storage.sync.set({gmeet_messages: this.checked});
  refreshMeet();
});
gmeet_participants.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_participants: this.checked});
  refreshMeet();
});
gmeet_badge.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_badge: this.checked});
  refreshMeet();
});
gmeet_video.addEventListener('change', function() {
  chrome.storage.sync.set({gmeet_video: this.checked});
  refreshMeet();
});
