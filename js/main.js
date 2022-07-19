import kanban from "./view/Kanban.js";
import KanbanAPI from "./api/KanbanAPI.js"

new kanban(
    document.querySelector(".kanban")
);

const totalItemsInTODO = KanbanAPI.getItem(1);
const totalItemsInINPROG = KanbanAPI.getItem(2);
const totalItemsInDONE = KanbanAPI.getItem(3);
// console.log("TO DO:",totalItemsInTODO.length);
// console.log("IN PROGRESS:",totalItemsInINPROG.length);
// console.log("DONE:",totalItemsInDONE.length);

const totalItems = totalItemsInDONE.length + totalItemsInINPROG.length + totalItemsInTODO.length;

const todoPercentage = (totalItemsInTODO.length/totalItems)*100;
console.log(Number.parseFloat(todoPercentage).toFixed(2)+"% is pending.");

const inprogPercentage = (totalItemsInINPROG.length/totalItems)*100;
console.log(Number.parseFloat(inprogPercentage).toFixed(2)+"% is in progress.");

const completedPercentage = (totalItemsInDONE.length/totalItems)*100;
console.log(Number.parseFloat(completedPercentage).toFixed(2)+"% is done.");