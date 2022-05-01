"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Component {
    constructor(templateId, hostElementId, insertAtStart, newElementId) {
        this.templateElement = document.getElementById(templateId);
        this.hostElement = document.getElementById(hostElementId);
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = newElementId !== null && newElementId !== void 0 ? newElementId : '';
        this.attach(insertAtStart);
    }
    attach(insertAtStart) {
        const insertLocation = insertAtStart ? 'afterbegin' : 'beforeend';
        this.hostElement.insertAdjacentElement(insertLocation, this.element);
    }
}
exports.default = Component;
//# sourceMappingURL=base-components.js.map