"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectState = void 0;
const Project_1 = require("../../models/Project");
class State {
    constructor() {
        this.listeners = [];
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
}
class ProjectState extends State {
    constructor() {
        super();
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }
    addProject(title, description, numPeople) {
        const newProject = new Project_1.Project(Math.random().toString(), title, description, numPeople, Project_1.ProjectStatus.Active);
        this.projects.push(newProject);
        this.updateListeners();
    }
    moveProject(idToMove, newStatus) {
        const projectToMove = this.projects.find(project => project.id === idToMove);
        if (projectToMove && projectToMove.status !== newStatus) {
            projectToMove.status = newStatus;
            this.updateListeners();
        }
    }
    updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
exports.default = ProjectState;
exports.projectState = ProjectState.getInstance();
//# sourceMappingURL=ProjectState.js.map