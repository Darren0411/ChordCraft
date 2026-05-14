const chordColor = document.getElementById("chordColor");

const lyricsColor = document.getElementById("lyricsColor");

const fontSize = document.getElementById("fontSize");

const fontSizeValue = document.getElementById("fontSizeValue");

const darkMode = document.getElementById("darkMode");

const saveBtn = document.getElementById("saveBtn");

const fullscreenBtn = document.getElementById("fullscreenBtn");

// LIVE FONT SIZE UPDATE
fontSize.addEventListener("input", () => {
  fontSizeValue.textContent = `${fontSize.value}px`;
});

// LOAD SAVED SETTINGS
chrome.storage.sync.get("themeSettings", (data) => {
  if (data.themeSettings) {
    const settings = data.themeSettings;

    chordColor.value = settings.chordColor || "#000000";

    lyricsColor.value = settings.lyricsColor || "#000000";

    fontSize.value = settings.fontSize || 24;

    darkMode.checked = settings.darkMode || false;

    fontSizeValue.textContent = `${fontSize.value}px`;
  } else {
    // DEFAULT VALUES
    chordColor.value = "#000000";

    lyricsColor.value = "#000000";

    fontSize.value = 24;

    darkMode.checked = false;

    fontSizeValue.textContent = "24px";
  }
});

// SAVE SETTINGS
saveBtn.addEventListener("click", () => {
  chrome.storage.sync.get("themeSettings", (data) => {
    const oldSettings = data.themeSettings || {};

    const settings = {
      chordColor: chordColor.value,

      lyricsColor: lyricsColor.value,

      fontSize: fontSize.value,

      darkMode: darkMode.checked,

      // PRESERVE COLUMNS
      columns: oldSettings.columns || 1,
    };

    chrome.storage.sync.set(
      {
        themeSettings: settings,
      },

      () => {
        chrome.tabs.query(
          {
            active: true,
            currentWindow: true,
          },

          (tabs) => {
            chrome.tabs.sendMessage(
              tabs[0].id,
              {
                action: "updateTheme",

                settings: settings,
              },

              () => {
                window.close();
              },
            );
          },
        );
      },
    );
  });
});

// FULLSCREEN BUTTON
fullscreenBtn.addEventListener("click", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },

    (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "toggleFullscreen",
      });
    },
  );
});
