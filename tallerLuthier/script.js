const launcherButton = document.querySelector("#launcherButton");
const launcherMenu = document.querySelector("#launcherMenu");
const dialog = document.querySelector("#contentDialog");
const dialogClose = document.querySelector("#dialogClose");
const dialogTitle = document.querySelector("#dialogTitle");
const dialogBody = document.querySelector("#dialogBody");
const dialogLink = document.querySelector("#dialogLink");

const fallbackConfig = {
  items: [
    {
      id: "about",
      label: "About the workshop",
      summary: "Cita previa, formación oficial y promoción temporal.",
      action: "panel",
      href: "content/about.html",
      enabled: true,
      content: [
        "Tu instrumento merece estar a punto.",
        "Mantenimiento, ajuste, calibración y reparación de instrumentos de música de viento madera, con atención personalizada y trabajo supervisado.",
        "Durante la etapa de formación oficial, la promoción temporal contempla descuentos del 20 % al 40 %, según servicio y caso.",
        "Atención exclusivamente con cita previa por email: txellenne.taller@gmail.com"
      ]
    }
  ]
};

let launcherConfig = fallbackConfig;

async function loadLauncherConfig() {
  try {
    const response = await fetch("content/launcher.json", { cache: "no-cache" });
    if (!response.ok) {
      throw new Error("Launcher configuration not found");
    }
    launcherConfig = await response.json();
  } catch {
    launcherConfig = fallbackConfig;
  }
  renderLauncher();
}

function renderLauncher() {
  const items = launcherConfig.items || [];
  const list = document.createElement("ul");
  list.className = "launcher-list";

  items.forEach((item) => {
    const row = document.createElement("li");
    const control = document.createElement("button");
    control.className = "launcher-item";
    control.type = "button";
    control.role = "menuitem";
    control.disabled = item.enabled === false;
    control.dataset.launcherId = item.id;
    control.innerHTML = `<strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.summary || "")}</small>`;
    control.addEventListener("click", () => activateLauncherItem(item));
    row.append(control);
    list.append(row);
  });

  launcherMenu.replaceChildren(list);
}

function activateLauncherItem(item) {
  closeLauncher();

  if (item.action === "redirect" && item.href) {
    window.location.href = item.href;
    return;
  }

  if (item.action === "link" && item.href) {
    window.location.assign(item.href);
    return;
  }

  openContentDialog(item);
}

function openContentDialog(item) {
  dialogTitle.textContent = item.label;
  dialogBody.replaceChildren(...(item.content || []).map((text) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    return paragraph;
  }));
  dialogLink.href = item.href || "content/about.html";
  dialogLink.hidden = !item.href;

  if (typeof dialog.showModal === "function") {
    dialog.showModal();
  } else if (item.href) {
    window.location.assign(item.href);
  }
}

function toggleLauncher() {
  const shouldOpen = launcherMenu.hidden;
  launcherMenu.hidden = !shouldOpen;
  launcherButton.setAttribute("aria-expanded", String(shouldOpen));
  document.body.classList.toggle("menu-open", shouldOpen);

  if (shouldOpen) {
    launcherMenu.querySelector(".launcher-item:not([disabled])")?.focus();
  }
}

function closeLauncher() {
  launcherMenu.hidden = true;
  launcherButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

launcherButton.addEventListener("click", toggleLauncher);
dialogClose.addEventListener("click", () => dialog.close());

document.addEventListener("click", (event) => {
  if (
    launcherMenu.hidden ||
    launcherMenu.contains(event.target) ||
    launcherButton.contains(event.target)
  ) {
    return;
  }
  closeLauncher();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeLauncher();
  }
});

loadLauncherConfig();
