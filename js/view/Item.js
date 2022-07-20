import KanbanAPI from "../api/KanbanAPI.js";
import DropZone from "./DropZone.js";
import kanban from "./Kanban.js";

export default class Item {
    constructor(id, content) {

        const bottomDropZone = DropZone.createDropZone();

        this.elements = {};
        this.elements.root = Item.createRoot();
        this.elements.input = this.elements.root.querySelector(".kanban__item-input");

        this.elements.root.dataset.id = id;
        this.elements.input.textContent = content;
        this.content = content;

        this.elements.root.appendChild(bottomDropZone);

        const onBlur = () => {
            const newContent = this.elements.input.textContent.trim();

            if(newContent == this.content) {
                return;
            }

            this.content = newContent;
            KanbanAPI.updateItem(id, {
                content: this.content
            });
        };

        this.elements.input.addEventListener("blur", onBlur);

        this.elements.root.querySelector(".item__more-options").dataset.itemid = id;
        this.elements.root.querySelector(".item__more-options-delete").dataset.itemid = id;

        this.elements.root.querySelector(".item__more-options").addEventListener("click", (e) => {            
            const btnTheParent = e.target.parentElement;
            if(e.target.dataset.itemmoreoptions == "moreoptions") {
                if(btnTheParent.parentElement.classList.contains("show")) {
                    btnTheParent.parentElement.classList.remove("show");
                    return;
                }
                btnTheParent.parentElement.classList.toggle("show");
                // if any other div with class="kanban__item-options" contains show class then fetch all those divs and remove show class
                const allOptions = document.querySelectorAll(".kanban__item-options");
                allOptions.forEach(option => {
                    if(option.classList.contains("show")) {
                        // If options contains child element button with data-itemid then get its value
                        const itemId = option.querySelector("button[data-itemid]").dataset.itemid;

                        // If itemId is equal to id of clicked button then remove show class from options
                        if(itemId != e.target.parentElement.dataset.itemid) {
                            option.classList.remove("show");
                            return;
                        }
                    }
                });
            }
        });

        this.elements.root.querySelector(".item__more-options-delete").addEventListener("click", () => {
            const check = confirm("Are you sure you want to delete the item?");

            if(check) {
                KanbanAPI.deleteItem(id);
                this.elements.input.removeEventListener("blur", onBlur);
                this.elements.root.parentElement.removeChild(this.elements.root);
            }

            // show class will be removed from .kanban__item-options if delete is false
            if(this.elements.root.querySelector(".kanban__item-options").classList.contains("show")) {
                this.elements.root.querySelector(".kanban__item-options").classList.remove("show");
            }
        });

        this.elements.root.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", id);
        });

        function removeAllChildNodes(parent) {
            while (parent.firstChild) {
                parent.removeChild(parent.firstChild);
            }
        }

        this.elements.root.addEventListener("drop", e => {
            // Here update the coulmns count
            const container = document.querySelector('.kanban');
            removeAllChildNodes(container);
            new kanban(
                document.querySelector(".kanban")
            );
            
        });

        this.elements.input.addEventListener("drop", e => {
            e.preventDefault();
        });
    }

    static createRoot() {
        const range = document.createRange();

        range.selectNode(document.body);

        return range.createContextualFragment(`
        <div class="kanban__item" draggable="true">
            <div class="kanban__item-input-options">
                <div class="kanban__item-input" contenteditable></div>
                <div class="kanban__item-options">
                    <button class="item__more-options">
                        <span class="material-symbols-outlined" 
                            data-itemmoreoptions="moreoptions"
                        > more_vert </span>
                    </button>
                    <ul class="more-options">
                        <li class="item__more-options-delete">Delete</li>
                    </ul>
                </div>
            </div>
        </div>
        `).children[0];
    }
}