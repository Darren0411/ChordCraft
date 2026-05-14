const chordColor =
  document.getElementById("chordColor");

const lyricsColor =
  document.getElementById("lyricsColor");

const fontSize =
  document.getElementById("fontSize");

const fontSizeValue =
  document.getElementById("fontSizeValue");

const columns =
  document.getElementById("columns");

const columnValue =
  document.getElementById("columnValue");

const saveBtn =
  document.getElementById("saveBtn");

const fullscreenBtn =
  document.getElementById("fullscreenBtn");


// LIVE FONT SIZE UPDATE
fontSize.addEventListener("input", () => {

  fontSizeValue.textContent =
    `${fontSize.value}px`;

});


// LIVE COLUMN UPDATE
columns.addEventListener("input", () => {

  columnValue.textContent =
    columns.value;

});


// LOAD SAVED SETTINGS
chrome.storage.sync.get(
  "themeSettings",
  (data) => {

    if (data.themeSettings) {

      chordColor.value =
        data.themeSettings.chordColor || "#000000";

      lyricsColor.value =
        data.themeSettings.lyricsColor || "#000000";

      fontSize.value =
        data.themeSettings.fontSize || 24;

      columns.value =
        data.themeSettings.columns || 1;

      fontSizeValue.textContent =
        `${fontSize.value}px`;

      columnValue.textContent =
        columns.value;

    } else {

      // DEFAULT VALUES
      chordColor.value = "#000000";

      lyricsColor.value = "#000000";

      fontSize.value = 24;

      columns.value = 1;

      fontSizeValue.textContent = "24px";

      columnValue.textContent = "1";

    }

  }
);


// SAVE SETTINGS
saveBtn.addEventListener("click", () => {

  const settings = {

    chordColor: chordColor.value,

    lyricsColor: lyricsColor.value,

    fontSize: fontSize.value,

    columns: columns.value

  };

  chrome.storage.sync.set(
    {
      themeSettings: settings
    },

    () => {

      chrome.tabs.query(
        {
          active: true,
          currentWindow: true
        },

        (tabs) => {

          chrome.tabs.sendMessage(
            tabs[0].id,
            {
              action: "updateTheme",
              settings: settings
            }
          );

        }
      );

    }
  );

});


// FULLSCREEN BUTTON
fullscreenBtn.addEventListener("click", () => {

  chrome.tabs.query(
    {
      active: true,
      currentWindow: true
    },

    (tabs) => {

      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          action: "toggleFullscreen"
        }
      );

    }
  );

});