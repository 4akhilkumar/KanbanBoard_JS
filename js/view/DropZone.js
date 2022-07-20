import KanbanAPI from "../api/KanbanAPI.js";
import kanban from "./Kanban.js";
import KanbanStatus from "./KanbanStatus.js";

export default class DropZone {
    static createDropZone() {
        const range = document.createRange();

        range.selectNode(document.body) ;

        const dropZone =  range.createContextualFragment(`
        <div class="kanban__dropzone"></div>
        `).children[0];

        dropZone.addEventListener("dragover", e => {
            e.preventDefault();
            dropZone.classList.add("kanban__dropzone--active");
        });

        dropZone.addEventListener("dragleave", () => {
            dropZone.classList.remove("kanban__dropzone--active");
        });

        dropZone.addEventListener("drop", e => {
            e.preventDefault();
            dropZone.classList.remove("kanban__dropzone--active");

            const columnElement = dropZone.closest(".kanban__column");
            const columnId = Number(columnElement.dataset.id);
            const dropZoneInColumn = Array.from(columnElement.querySelectorAll(".kanban__dropzone"));
            const droppedIndex = dropZoneInColumn.indexOf(dropZone);
            const itemId = Number(e.dataTransfer.getData("text/plain"));
            const droppedItemElement = document.querySelector(`[data-id="${itemId}"]`);
            const insertAfter = dropZone.parentElement.classList.contains("kanban__item") ? dropZone.parentElement : dropZone;

            if(droppedItemElement.contains(dropZone)) {
                return;
            }

            insertAfter.after(droppedItemElement);

            KanbanAPI.updateItem(itemId, {
                columnId,
                position: droppedIndex
            });

            function removeAllChildNodes(parent) {
                while (parent.firstChild) {
                    parent.removeChild(parent.firstChild);
                }
            }
            // Here update the coulmns count
            const kanban_container = document.querySelector('.kanban');
            removeAllChildNodes(kanban_container);
            new kanban(
                document.querySelector(".kanban")
            );
    
            // Update status
            const status_container = document.querySelector('.Kanban__board-status');
            removeAllChildNodes(status_container);
            new KanbanStatus(
                document.querySelector(".Kanban__board-status")
            );
        });

        return dropZone;
    }
}
