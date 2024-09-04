const columns = document.querySelectorAll(".column_cards");
const cards = document.querySelectorAll(".card");

let draggedCard;

const dragStart = (event) => {
  draggedCard = event.target;
  event.dataTransfer.effectAllowed = "move";
};

const dragOver = (event) => {
  event.preventDefault();
};

const dragEnter = ({ target }) => {
  if (target.classList.contains("column_cards")) {
    target.classList.add("column_highlight");
  }
};

const dragLeave = ({ target }) => {
  target.classList.remove("column_highlight");
};

const Drop = ({ target }) => {
  if (target.classList.contains("column_cards")) {
    target.classList.remove("column_highlight");
    target.append(draggedCard);
  }
};

const createCard = ({ target }) => {
  if (!target.classList.contains("column_cards")) return;

  const card = document.createElement("section");

  card.className = "card";
  card.draggable = "true";
  card.contentEditable = "true";

  card.addEventListener("focusout", () => {
    card.contentEditable = "false";

    if (!card.textContent) card.remove();
  });

  card.addEventListener("dragstart", dragStart);

  target.append(card);
  card.focus();
};

columns.forEach((column) => {
  column.addEventListener("dragover", dragOver);
  column.addEventListener("dragenter", dragEnter);
  column.addEventListener("dragleave", dragLeave);
  column.addEventListener("dblclick", createCard);
  column.addEventListener("drop", Drop);
});

cards.forEach((card) => {
  card.addEventListener("dragstart", dragStart);
});
