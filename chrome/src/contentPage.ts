


chrome.runtime.onMessage.addListener((request, sender, respond) => {
  const handler = new Promise((resolve, reject) => {
    if (request) {

      resolve(scanPage());
    } else {
      reject('request is empty.');
    }
  });

  handler.then(message => respond(message)).catch(error => respond(error));

  return true;
});

function scanPage() {

  var page = document.body.innerHTML.toString();
  var mls = page.match(/[A-Z]\d{7}\b/);
  if (mls) {
    return mls
  } else {
    return 'no mls found';
  }


}
function scanPage2() {

  var page = document.body.innerHTML.toString();
  var mls = page.match(/[A-Z]\d{7}\b/);
  if (mls) {

    chrome.runtime.sendMessage(mls, function (response) {
      if (chrome.runtime.lastError) {
        setTimeout(scanPage2, 500);
      }
    });
  } else {
    chrome.runtime.sendMessage([''], function (response) {
      if (chrome.runtime.lastError) {
        setTimeout(scanPage2, 500);
      }
     });

  }

}
scanPage2();
