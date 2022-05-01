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
exports.ProjectInput = void 0;
const base_component_1 = __importDefault(require("./base-component"));
const validation_1 = require("../utils/validation");
const autobind_1 = require("../utils/descorators/autobind");
const project_state_1 = require("./state/project-state");
class ProjectInput extends base_component_1.default {
    constructor() {
        super('project-input', 'app', true, 'user-input');
        this.titleInputElement = this.element.querySelector('#title');
        this.descriptionTextAreaElement = this.element.querySelector('#description');
        this.peopleInputElement = this.element.querySelector('#people');
        this.configure();
    }
    render() {
        throw new Error("Method not implemented.");
    }
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }
    clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionTextAreaElement.value = '';
        this.peopleInputElement.value = '';
    }
    gatherUserInput() {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionTextAreaElement.value;
        const enteredPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: enteredTitle,
            required: true,
            minLength: 1,
            maxLength: 15,
        };
        const descriptionValidatable = {
            value: enteredDescription,
            required: true,
            minLength: 1,
        };
        const peopleValidatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };
        if (!(0, validation_1.validate)(titleValidatable) ||
            !(0, validation_1.validate)(descriptionValidatable) ||
            !(0, validation_1.validate)(peopleValidatable)) {
            alert('Invalid input, please try again!');
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            project_state_1.projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}
__decorate([
    autobind_1.AutoBind
], ProjectInput.prototype, "submitHandler", null);
exports.ProjectInput = ProjectInput;
//# sourceMappingURL=project-input.js.map