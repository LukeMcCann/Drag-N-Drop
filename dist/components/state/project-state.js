"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.projectState = exports.ProjectState = void 0;
const project_1 = require("../models/project");
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
        const newProject = new project_1.Project(Math.random().toString(), title, description, numPeople, project_1.ProjectStatus.Active);
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
exports.ProjectState = ProjectState;
exports.projectState = ProjectState.getInstance();
//# sourceMappingURL=project-state.js.map