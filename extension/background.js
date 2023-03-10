const gmeet_url = "https://meet.google.com/*";
const loadMeet_url = "/loadMeet.js";


chrome.runtime.onInstalled.addListener(function (details) {
    chrome.storage.sync.get([
        'mainButton',
        'gmeet_video',
        'gmeet_badge',
        'gmeet_messages',
        'gmeet_participants',
        'general_messages',
        
    ], function (data) {
        data.mainButton == null && chrome.storage.sync.set({ mainButton: true });
        
        data.gmeet_messages == null && chrome.storage.sync.set({ gmeet_messages: true });
        data.gmeet_participants == null && chrome.storage.sync.set({ gmeet_participants: true });
        data.gmeet_video == null && chrome.storage.sync.set({ gmeet_video: false });
        data.gmeet_badge == null && chrome.storage.sync.set({ gmeet_badge: false });
        data.general_messages == null && chrome.storage.sync.set({ general_messages: false });
    });
});

chrome.commands.onCommand.addListener(function (command) {
    if (command == 'toggle') {
        chrome.storage.sync.get(['mainButton'], function (data) {
            //console.log("Setting the main button element to: ", !data.mainButton);
            chrome.storage.sync.set({ mainButton: !data.mainButton });
            chrome.tabs.query({ url: gmeet_url }, function (tabs) {
                if (tabs.length !== 0)
                    tabs.forEach(function (tab) { chrome.tabs.executeScript(tab.id, { file: loadMeet_url }) });
            });
            
        });
    }
});