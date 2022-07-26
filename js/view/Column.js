import KanbanAPI from '../api/KanbanAPI.js';
import Item from './Item.js';
import DropZone from './DropZone.js';
import KanbanStatus from "./KanbanStatus.js";
import kanban from './Kanban.js';

export default class Column {
    constructor(id, title) {
        const topDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Column.createRoot();
        this.elements.title = this.elements.root.querySelector(".kanban__column-title");
        this.elements.items = this.elements.root.querySelector(".kanban__column-items");
        this.elements.addItem = this.elements.root.querySelector(".kanban__add-item");
        this.elements.countItems = this.elements.root.querySelector(".kanban__column-items-count");

        this.elements.root.dataset.id = id;
        this.elements.title.textContent = title;
        this.elements.items.appendChild(topDropZone);

        this.elements.addItem.addEventListener("click", () => {
            // TODO: add item
            const newItem = KanbanAPI.insertItem(id, "")
            this.renderItem(newItem);

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
        })

        // Count of each column
        this.elements.countItems.textContent = KanbanAPI.getItem(id).length;

        KanbanAPI.getItem(id).forEach(item => {
            this.renderItem(item);
        })
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body) ;

        return range.createContextualFragment(`
        <div class="kanban__column">
            <div class="kanban__column-tic">
                <div class="kanban__column-title"></div>
                <span class="kanban__column-items-count"></span>
            </div>
            <div class="kanban__column-items"></div>
            <div class="kanban__column-button-area">
                <button type="button" class="kanban__add-item">
                    <span class="material-symbols-outlined"> add_task </span>
                </button>
            </div>
        </div>
        `).children[0];
    }

    renderItem(data) {
        // TODO: create Item instance
        const item = new Item(data.id, data.content);

        this.elements.items.appendChild(item.elements.root);
    }
}