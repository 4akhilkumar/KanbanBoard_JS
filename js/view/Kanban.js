import Column from "./Column.js";

export default class Kanban {
    constructor(root) {
        this.root = root;

        Kanban.columns().forEach(column => {
            // TODO: Create an instance column class
            const columnView = new Column(column.id, column.title);
            this.root.appendChild(columnView.elements.root);
        });
    }

    static columns() {
        return [
            {
                id: 1,
                title: "TO DO"
            },
            {
                id: 2,
                title: "IN PROGRESS"
            },
            {
                id: 3,
                title: "DONE"
            }
        ]
    }
}