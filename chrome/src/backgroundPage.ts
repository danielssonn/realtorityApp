chrome.runtime.onMessage.addListener(function(message, callback) {

    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    chrome.browserAction.setBadgeText({ text: message+'' });
        
    return true;
   
  });





