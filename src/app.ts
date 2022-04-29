class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    concreteFormElement: HTMLFormElement;

    constructor() {
        this.templateElement = document.querySelector('#project-input') as HTMLTemplateElement;
        this.hostElement = document.querySelector('#app') as HTMLDivElement;

        const importedFormNode = document.importNode(this.templateElement.content, true);

        this.concreteFormElement = importedFormNode.firstElementChild as HTMLFormElement;
        this.attach();
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.concreteFormElement);
    }
}

const mainInput = new ProjectInput();