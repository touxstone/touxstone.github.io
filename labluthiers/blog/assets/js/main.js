const searchInput = document.querySelector("[data-search-input]");
const tagButtons = [...document.querySelectorAll("[data-tag-filter]")];
const cards = [...document.querySelectorAll("[data-post-card]")];
const emptyState = document.querySelector("[data-empty-state]");
const resultCount = document.querySelector("[data-result-count]");

let activeTag = "all";

function normalize(value) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function applyFilters() {
  const query = normalize(searchInput?.value || "");
  let visibleCount = 0;

  for (const card of cards) {
    const haystack = normalize(card.dataset.searchText || "");
    const tags = (card.dataset.tags || "").split(",");
    const matchesTag = activeTag === "all" || tags.includes(activeTag);
    const matchesQuery = !query || haystack.includes(query);
    const isVisible = matchesTag && matchesQuery;

    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  }

  if (emptyState) {
    emptyState.hidden = visibleCount > 0;
  }

  if (resultCount) {
    const postLabel = visibleCount === 1 ? "post" : "posts";
    resultCount.textContent = `${visibleCount} ${postLabel}`;
  }
}

for (const button of tagButtons) {
  button.addEventListener("click", () => {
    activeTag = button.dataset.tagFilter || "all";
    for (const item of tagButtons) {
      item.setAttribute("aria-pressed", String(item === button));
    }
    applyFilters();
  });
}

searchInput?.addEventListener("input", applyFilters);
