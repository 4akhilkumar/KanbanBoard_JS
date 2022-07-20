import kanban from "./view/Kanban.js";
import KanbanStatus from "./view/KanbanStatus.js";

new kanban(
    document.querySelector(".kanban")
);

new KanbanStatus(
    document.querySelector(".Kanban__board-status")
);