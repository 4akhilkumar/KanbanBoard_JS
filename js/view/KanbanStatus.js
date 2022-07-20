import KanbanAPI from "../api/KanbanAPI.js";

export default class KanbanStatus {

    // render createKanbanStatus() in DOM using constructor
    constructor(root) {
        this.elements = {};
        this.elements.root = root;
        this.elements.root.appendChild(KanbanStatus.createKanbanStatus());
    }
        
    static createKanbanStatus() {
        const range = document.createRange();

        range.selectNode(document.body) ;

        const totalItemsInTODO = KanbanAPI.getItem(1);
        const totalItemsInINPROG = KanbanAPI.getItem(2);
        const totalItemsInDONE = KanbanAPI.getItem(3);

        const totalItems = totalItemsInDONE.length + totalItemsInINPROG.length + totalItemsInTODO.length;

        // const todoPercentage = Number.parseFloat((totalItemsInTODO.length/totalItems)*100).toFixed(2);
        // console.log(todoPercentage+"% is pending.");

        // const inprogPercentage = Number.parseFloat((totalItemsInINPROG.length/totalItems)*100).toFixed(2);
        // console.log(inprogPercentage+"% is in progress.");

        const completedPercentage = Number.parseFloat((totalItemsInDONE.length/totalItems)*100).toFixed(2);
        // console.log(completedPercentage+"% is done.");

        var work_status_msg = completedPercentage + "% of the work is done.";
        if(completedPercentage < 1) {
            work_status_msg = "Work is not done yet.";
        }

        const kanbanStatus =  range.createContextualFragment(`
            <div class="Kanban__work-progress">
                <div class="Kanban__work-done">
                    ${work_status_msg}
                </div>
            </div>
        `).children[0];

        return kanbanStatus;
    }
}
