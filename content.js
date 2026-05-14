function applyTheme(settings) {

  const root =
    document.documentElement;

  root.style.setProperty(
    "--lyrics-color",
    settings.lyricsColor
  );

  root.style.setProperty(
    "--chord-color",
    settings.chordColor
  );

  root.style.setProperty(
    "--font-size",
    `${settings.fontSize}px`
  );

  root.style.setProperty(
    "--column-count",
    settings.columns || 1
  );

}


// LOAD SAVED SETTINGS
chrome.storage.sync.get(
  "themeSettings",
  (data) => {

    if (data.themeSettings) {

      applyTheme(data.themeSettings);

    } else {

      applyTheme({
        lyricsColor: "#000000",
        chordColor: "#000000",
        fontSize: 24,
        columns: 1
      });

    }

  }
);


// LIVE THEME UPDATE
chrome.runtime.onMessage.addListener(
  (message) => {

    if (message.action === "updateTheme") {

      applyTheme(message.settings);

    }

    if (message.action === "toggleFullscreen") {

      if (!document.fullscreenElement) {

        document.documentElement.requestFullscreen();

      } else {

        document.exitFullscreen();

      }

    }

  }
);