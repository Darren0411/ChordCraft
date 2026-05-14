const chordColor =
  document.getElementById("chordColor");

const lyricsColor =
  document.getElementById("lyricsColor");

const fontSize =
  document.getElementById("fontSize");

const fontSizeValue =
  document.getElementById("fontSizeValue");

const darkMode =
  document.getElementById("darkMode");

const saveBtn =
  document.getElementById("saveBtn");

const fullscreenBtn =
  document.getElementById("fullscreenBtn");


fontSize.addEventListener(
  "input",
  () => {

    fontSizeValue.textContent =
      `${fontSize.value}px`;

  }
);


chrome.storage.sync.get(
  "themeSettings",
  (data) => {

    if (data.themeSettings) {

      chordColor.value =
        data.themeSettings.chordColor
        || "#000000";

      lyricsColor.value =
        data.themeSettings.lyricsColor
        || "#000000";

      fontSize.value =
        data.themeSettings.fontSize
        || 24;

      darkMode.checked =
        data.themeSettings.darkMode
        || false;

      fontSizeValue.textContent =
        `${fontSize.value}px`;

    }

  }
);


saveBtn.addEventListener(
  "click",
  async () => {

    const settings = {

      chordColor:
        chordColor.value,

      lyricsColor:
        lyricsColor.value,

      fontSize:
        fontSize.value,

      darkMode:
        darkMode.checked

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

            setTimeout(() => {

              window.close();

            }, 200);

          }
        );

      }
    );

  }
);


fullscreenBtn.addEventListener(
  "click",
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
            action:
              "toggleFullscreen"
          }
        );

      }
    );

  }
);