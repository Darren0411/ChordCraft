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


// CREATE ACTION BAR ON PAGE
function injectActionBar() {

  // Prevent duplicates
  if (
    document.querySelector(
      ".mg-action-bar"
    )
  ) {
    return;
  }

  // Find tuning section
  const tuningSection =
    document.querySelector(
      'section.s-juq'
    );

  if (!tuningSection) return;

  // Create bar
  const bar =
    document.createElement("section");

  bar.className =
    "mg-action-bar";

  // Left title
  const title =
    document.createElement("p");

  title.textContent =
    "ChordCraft";

  // Columns control
  const columnWrapper =
    document.createElement("div");

  columnWrapper.className =
    "mg-column-control";

  const label =
    document.createElement("label");

  label.textContent =
    "Columns";

  const slider =
    document.createElement("input");

  slider.type = "range";

  slider.min = 1;

  slider.max = 4;

  slider.value =
    getComputedStyle(
      document.documentElement
    ).getPropertyValue(
      "--column-count"
    ) || 1;

  slider.addEventListener(
    "input",
    () => {

      document.documentElement
        .style.setProperty(
          "--column-count",
          slider.value
        );

      chrome.storage.sync.get(
        "themeSettings",
        (data) => {

          const updated =
            {
              ...data.themeSettings,
              columns:
                slider.value
            };

          chrome.storage.sync.set(
            {
              themeSettings:
                updated
            }
          );

        }
      );

    }
  );

  columnWrapper.appendChild(
    label
  );

  columnWrapper.appendChild(
    slider
  );

  // Fullscreen button
  const fullscreenBtn =
    document.createElement("div");

  fullscreenBtn.className =
    "mg-enter-fullscreen";

  fullscreenBtn.innerHTML =
    "↗ Fullscreen";

  fullscreenBtn.addEventListener(
    "click",
    () => {

      openPerformanceMode();

    }
  );

  // Append
  bar.appendChild(title);

  bar.appendChild(columnWrapper);

  bar.appendChild(
    fullscreenBtn
  );

  tuningSection.prepend(bar);

}


// PERFORMANCE MODE
function openPerformanceMode() {

  if (
    document.getElementById(
      "chordcraft-overlay"
    )
  ) {
    return;
  }

  const chordSheet =
    document.querySelector(
      "pre.k_vI3"
    );

  if (!chordSheet) return;

  chrome.storage.sync.get(
    "themeSettings",
    (data) => {

      const settings =
        data.themeSettings || {};

      const overlay =
        document.createElement("div");

      overlay.id =
        "chordcraft-overlay";

      // DARK MODE ONLY FOR FULLSCREEN
      if (settings.darkMode) {

        overlay.classList.add(
          "cc-dark-overlay"
        );

      }

      // TOOLBAR
      const toolbar =
        document.createElement("div");

      toolbar.id =
        "chordcraft-toolbar";

      const logo =
        document.createElement("div");

      logo.textContent =
        "ChordCraft";

      const controls =
        document.createElement("div");

      controls.className =
        "cc-controls";

      // COLUMN LABEL
      const columnLabel =
        document.createElement("span");

      columnLabel.textContent =
        "Columns";

      // COLUMN SLIDER
      const slider =
        document.createElement("input");

      slider.type = "range";

      slider.min = 1;

      slider.max = 4;

      slider.value =
        settings.columns || 1;

      // EXIT BUTTON
      const exitBtn =
        document.createElement("button");

      exitBtn.id =
        "cc-exit-btn";

      exitBtn.innerHTML =
        "↗ Exit fullscreen";

      // CONTENT
      const chordContainer =
        document.createElement("div");

      chordContainer.id =
        "cc-content";

      chordContainer.innerHTML =
        chordSheet.innerHTML;

      chordContainer.style.color =
        settings.lyricsColor;

      chordContainer.style.fontSize =
        `${settings.fontSize}px`;

      chordContainer.style.columnCount =
        settings.columns || 1;

      chordContainer.style.columnGap =
        "80px";

      // CHORD STYLING
      chordContainer
        .querySelectorAll(
          "span[data-name]"
        )
        .forEach((el) => {

          el.style.color =
            settings.chordColor;

          el.style.fontWeight =
            "bold";

        });

      // LIVE COLUMN CHANGE
      slider.addEventListener(
        "input",
        () => {

          chordContainer.style.columnCount =
            slider.value;

        }
      );

      // EXIT
      exitBtn.addEventListener(
        "click",
        () => {

          overlay.remove();

          document.body.style.overflow =
            "";

        }
      );

      // BUILD UI
      controls.appendChild(
        columnLabel
      );

      controls.appendChild(
        slider
      );

      controls.appendChild(
        exitBtn
      );

      toolbar.appendChild(
        logo
      );

      toolbar.appendChild(
        controls
      );

      overlay.appendChild(
        toolbar
      );

      overlay.appendChild(
        chordContainer
      );

      document.body.appendChild(
        overlay
      );

      document.body.style.overflow =
        "hidden";

    }
  );

}


// LOAD SETTINGS
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
        columns: 1
      });

    }

    // Inject UI
    setTimeout(() => {

      injectActionBar();

    }, 1500);

  }
);


// MESSAGE LISTENER
chrome.runtime.onMessage.addListener(
  (message) => {

    if (
      message.action ===
      "updateTheme"
    ) {

      applyTheme(
        message.settings
      );

    }

    if (
      message.action ===
      "toggleFullscreen"
    ) {

      openPerformanceMode();

    }

  }
);