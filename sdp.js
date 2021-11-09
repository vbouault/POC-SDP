var data = [
    // shapes
    { id: "1", text: "Projet 1" , open: false},
    { id: "2", text: "Plan d'action 1", parent: "1", open: false},
    { id: "5", parent: "1" , type:"toto" },
    { id: "3", text: "Action 1", parent: "2" },
    { id: "4", text: "Action 2", parent: "2"},
    { id: "6", parent: "2" , type: "toto"},
    { id: "7", parent: "3" , type: "toto"},
    { id: "8", parent: "4" , type: "toto"},
];

const template = ({ id, text }) => {
    return `
    <div class="container">
        <div class="top-container">
            <img src="avatar.png"/>
            <p>${text}</p>
        </div>
        <div class="btn-container">
            <button class="alert">Alert</button>
        </div>
    </div>
    `
}

const addTuile = () => {
    return `
    <div class="container add">
        +
    </div>
    `
}

const diagram = new dhx.Diagram("diagram", {
    type: "org",
    defaultShapeType: "flowView",
    
});

diagram.addShape("flowView", {
    template: template,
    defaults: {
        height: 65,
        width: 110
    },
    eventHandlers: {
        onclick: {
            "alert": (e, item) => alert(item.text),
        }
    }
});

diagram.addShape("toto", {
    template: addTuile,
    defaults: {
        height: 30,
        width: 30
    },
    eventHandlers: {
        onclick: {
            "add": (e, item) => {
                const newItemId = diagram.data.add({ text: "New Item", parent: item.parent });
                diagram.data.remove(item.id);
                diagram.data.add({ id: item.id, parent: item.parent , type: "toto" });
                diagram.data.add({  parent: newItemId , type: "toto" });
            },
        }
    }
});

diagram.data.parse(data);