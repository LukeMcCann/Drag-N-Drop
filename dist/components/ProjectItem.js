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
exports.ProjectItem = void 0;
const base_components_1 = __importDefault(require("./base-components"));
const autobind_1 = require("../utils/decorators/autobind");
class ProjectItem extends base_components_1.default {
    constructor(hosId, project) {
        super('single-project', hosId, false, project.id);
        this.project = project;
        this.configure();
        this.render();
    }
    get members() {
        if (+this.project.people === 1) {
            return '1 member';
        }
        return `${+this.project.people} members`;
    }
    dragStartHandler(event) {
        event.dataTransfer.setData('text/plain', this.project.id);
        event.dataTransfer.effectAllowed = 'move';
    }
    dragEndHandler(_event) {
        console.log({ this: this });
        console.log('End of drag');
    }
    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }
    render() {
        this.element.querySelector('h2').textContent = this.project.title;
        this.element.querySelector('h3').textContent = this.members + ' assigned';
        this.element.querySelector('p').textContent = this.project.description;
    }
}
__decorate([
    autobind_1.AutoBind
], ProjectItem.prototype, "dragStartHandler", null);
__decorate([
    autobind_1.AutoBind
], ProjectItem.prototype, "dragEndHandler", null);
exports.ProjectItem = ProjectItem;
//# sourceMappingURL=ProjectItem.js.map