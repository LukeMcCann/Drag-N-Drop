"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectList = void 0;
const Project_1 = require("../models/Project");
const base_components_1 = __importDefault(require("./base-components"));
const autobind_1 = require("../utils/decorators/autobind");
const ProjectState_1 = require("./State/ProjectState");
const ProjectItem_1 = require("./ProjectItem");
class ProjectList extends base_components_1.default {
    constructor(status) {
        super('project-list', 'app', false, `${status}-projects`);
        this.status = status;
        this.assignedProjects = [];
        this.configure();
        this.render();
    }
    configure() {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);
        this.element.addEventListener('drop', this.dropHandler);
        ProjectState_1.projectState.addListener((projects) => {
            const relevantProjects = projects.filter(project => {
                if (this.status === 'active') {
                    return project.status === Project_1.ProjectStatus.Active;
                }
                ;
                return project.status === Project_1.ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }
    dragLeaveHandler(_event) {
        const listElement = this.element.querySelector('ul');
        listElement.classList.remove('droppable');
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();
            const listElement = this.element.querySelector('ul');
            listElement.classList.add('droppable');
        }
    }
    dropHandler(event) {
        const projectId = event.dataTransfer.getData('text/plain');
        ProjectState_1.projectState.moveProject(projectId, this.status === 'active' ? Project_1.ProjectStatus.Active : Project_1.ProjectStatus.Finished);
    }
    renderProjects() {
        const listElement = document.getElementById(`${this.status}-project-list`);
        listElement.innerHTML = '';
        for (const project of this.assignedProjects) {
            new ProjectItem_1.ProjectItem(this.element.querySelector('ul').id, project);
        }
    }
    render() {
        const listId = `${this.status}-project-list`;
        this.element.querySelector('ul').id = listId;
        this.element.querySelector('h2').textContent = this.status.toUpperCase() + ' PROJECTS';
    }
}
__decorate([
    autobind_1.AutoBind
], ProjectList.prototype, "dragLeaveHandler", null);
__decorate([
    autobind_1.AutoBind
], ProjectList.prototype, "dragOverHandler", null);
__decorate([
    autobind_1.AutoBind
], ProjectList.prototype, "dropHandler", null);
exports.ProjectList = ProjectList;
//# sourceMappingURL=ProjectList.js.map