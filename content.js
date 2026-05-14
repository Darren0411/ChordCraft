function applyDarkMode(enabled) {

  document.body.setAttribute(
    "data-dark-mode",
    enabled ? "true" : "false"
  );

}


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
    settings.fontSize + "px"
  );

  applyDarkMode(settings.darkMode);

}


/* =========================================
   TOOLBAR
========================================= */

function createToolbar() {

  const existing =
    document.querySelector(
      ".mg-action-bar"
    );

  if (existing) return;

  const chordBlock =
    document.querySelector(
      'pre[class*="k_vI3"]'
    );

  if (!chordBlock) return;

  const parent =
    chordBlock.parentElement;

  const toolbar =
    document.createElement("section");

  toolbar.className =
    "mg-action-bar";

  toolbar.innerHTML = `

    <p class="mg-title">
      ChordCraft
    </p>

    <div class="mg-column-control">

      <span>Columns</span>

      <input
        type="range"
        min="1"
        max="4"
        value="1"
        class="mg-column-slider"
      />

    </div>

    <button class="mg-fullscreen-btn">
      ⛶ Fullscreen
    </button>

    <button class="mg-exit-btn">
      ✕ Exit Fullscreen
    </button>

  `;

  parent.insertBefore(
    toolbar,
    chordBlock
  );

  const slider =
    toolbar.querySelector(
      ".mg-column-slider"
    );

  const fullscreenBtn =
    toolbar.querySelector(
      ".mg-fullscreen-btn"
    );

  const exitBtn =
    toolbar.querySelector(
      ".mg-exit-btn"
    );

  chrome.storage.sync.get(
    "themeSettings",
    (data) => {

      const settings =
        data.themeSettings || {};

      slider.value =
        settings.columns || 1;

      chordBlock.style.columnCount =
        settings.columns || 1;

      applyDarkMode(
        settings.darkMode
      );

      updateToolbarTheme(
        settings.darkMode
      );

    }
  );

  slider.addEventListener(
    "input",
    () => {

      chordBlock.style.columnCount =
        slider.value;

      chrome.storage.sync.get(
        "themeSettings",
        (data) => {

          const settings =
            data.themeSettings || {};

          settings.columns =
            slider.value;

          chrome.storage.sync.set({
            themeSettings: settings
          });

        }
      );

    }
  );

  fullscreenBtn.addEventListener(
    "click",
    () => {

      const fullscreenContainer =
        chordBlock.parentElement;

      if (
        !document.fullscreenElement
      ) {

        fullscreenContainer.requestFullscreen();

      }

    }
  );

  exitBtn.addEventListener(
    "click",
    () => {

      if (
        document.fullscreenElement
      ) {

        document.exitFullscreen();

      }

    }
  );

}


function updateToolbarTheme(isDark) {

  const fullscreenBtn =
    document.querySelector(
      ".mg-fullscreen-btn"
    );

  const exitBtn =
    document.querySelector(
      ".mg-exit-btn"
    );

  const slider =
    document.querySelector(
      ".mg-column-slider"
    );

  if (isDark) {

    if (fullscreenBtn)
      fullscreenBtn.style.color =
        "white";

    if (exitBtn)
      exitBtn.style.color =
        "white";

    if (slider)
      slider.style.filter =
        "invert(1)";

  } else {

    if (fullscreenBtn)
      fullscreenBtn.style.color =
        "black";

    if (exitBtn)
      exitBtn.style.color =
        "black";

    if (slider)
      slider.style.filter =
        "invert(0)";

  }

}


/* =========================================
   FULLSCREEN EVENTS
========================================= */

document.addEventListener(
  "fullscreenchange",
  () => {

    const exitBtn =
      document.querySelector(
        ".mg-exit-btn"
      );

    const fullscreenBtn =
      document.querySelector(
        ".mg-fullscreen-btn"
      );

    if (
      document.fullscreenElement
    ) {

      if (exitBtn)
        exitBtn.style.display =
          "block";

      if (fullscreenBtn)
        fullscreenBtn.style.display =
          "none";

    } else {

      if (exitBtn)
        exitBtn.style.display =
          "none";

      if (fullscreenBtn)
        fullscreenBtn.style.display =
          "block";

    }

  }
);


/* =========================================
   LOAD SETTINGS
========================================= */

chrome.storage.sync.get(
  "themeSettings",
  (data) => {

    if (data.themeSettings) {

      applyTheme(
        data.themeSettings
      );

    } else {

      applyTheme({

        lyricsColor: "#000000",

        chordColor: "#000000",

        fontSize: 24,

        darkMode: false,

        columns: 1

      });

    }

  }
);


/* =========================================
   LIVE UPDATES
========================================= */

chrome.runtime.onMessage.addListener(
  (request) => {

    if (
      request.action ===
      "updateTheme"
    ) {

      applyTheme(
        request.settings
      );

      updateToolbarTheme(
        request.settings.darkMode
      );

    }

  }
);


/* =========================================
   ENSURE TOOLBAR
========================================= */

function ensureToolbarExists() {

  const existing =
    document.querySelector(
      ".mg-action-bar"
    );

  if (!existing) {

    createToolbar();

  }

}


setTimeout(() => {

  createToolbar();

}, 1500);


setInterval(() => {

  ensureToolbarExists();

}, 2000);