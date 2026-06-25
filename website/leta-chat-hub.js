(function () {
  var hubOpen = false;
  var hubWrapper = null;
  var hubMenu = null;
  var hubButton = null;

  function setHubOpen(open) {
    hubOpen = open;
    if (hubMenu) {
      hubMenu.hidden = !open;
    }
    if (hubButton) {
      hubButton.setAttribute("aria-expanded", open ? "true" : "false");
      hubButton.classList.toggle("leta-hub-btn--open", open);
      
      var icon = hubButton.querySelector(".leta-hub-icon");
      if (icon) {
         // Change icon from chat bubble to an 'X' when open
         if (open) {
            icon.innerHTML = '<path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M18 6 6 18M6 6l12 12" />';
            icon.setAttribute("viewBox", "0 0 24 24");
         } else {
            icon.innerHTML = '<path fill="currentColor" d="M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />';
            icon.setAttribute("viewBox", "0 0 24 24");
         }
      }
    }
  }

  function buildHub() {
    hubWrapper = document.createElement("div");
    hubWrapper.className = "leta-chat-hub";

    // Build the popup menu
    hubMenu = document.createElement("div");
    hubMenu.className = "leta-hub-menu";
    hubMenu.hidden = true;

    var menuTitle = document.createElement("div");
    menuTitle.className = "leta-hub-menu__title";
    menuTitle.textContent = "How can we help?";
    hubMenu.appendChild(menuTitle);

    var aiBtn = document.createElement("button");
    aiBtn.className = "leta-hub-menu__option";
    aiBtn.innerHTML = '<span class="icon">✦</span> Ask Leta AI';
    aiBtn.addEventListener("click", function () {
      setHubOpen(false);
      if (typeof window.LetaOpenAiChat === "function") {
        window.LetaOpenAiChat();
      }
    });

    var humanBtn = document.createElement("button");
    humanBtn.className = "leta-hub-menu__option";
    humanBtn.innerHTML = '<span class="icon">👩‍💻</span> Talk to an Agent';
    humanBtn.addEventListener("click", function () {
      setHubOpen(false);
      if (typeof window.LetaOpenHumanChat === "function") {
        window.LetaOpenHumanChat();
      }
    });

    hubMenu.appendChild(aiBtn);
    hubMenu.appendChild(humanBtn);

    // Build the main launch button
    hubButton = document.createElement("button");
    hubButton.className = "btn btn-primary leta-hub-btn";
    hubButton.setAttribute("aria-expanded", "false");
    
    var iconSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    iconSvg.setAttribute("class", "leta-hub-icon");
    iconSvg.setAttribute("width", "18");
    iconSvg.setAttribute("height", "18");
    iconSvg.setAttribute("viewBox", "0 0 24 24");
    var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("fill", "currentColor");
    path.setAttribute("d", "M21 15a4 4 0 0 1-4 4H8l-5 4V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z");
    iconSvg.appendChild(path);

    var btnText = document.createElement("span");
    btnText.textContent = "Chat with Leta";

    hubButton.appendChild(iconSvg);
    hubButton.appendChild(btnText);

    hubButton.addEventListener("click", function () {
      setHubOpen(!hubOpen);
    });

    hubWrapper.appendChild(hubMenu);
    hubWrapper.appendChild(hubButton);
    document.body.appendChild(hubWrapper);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildHub);
  } else {
    buildHub();
  }
})();
