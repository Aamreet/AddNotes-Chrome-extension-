chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "saveText",
      title: "Save text to Notepad",
      contexts: ["selection"]
    });
  });
  
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "saveText") {
      chrome.storage.local.get({notepad: ""}, (result) => {
        let notepadContent = result.notepad + "\n" + info.selectionText;
        chrome.storage.local.set({notepad: notepadContent});
      });
    }
  });
  