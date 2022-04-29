function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        }
    };
    return adjDescriptor;
};

class ProjectInput {
    templateElement: HTMLTemplateElement;
    hostElement: HTMLDivElement;
    formElement: HTMLFormElement;
    titleInputElement: HTMLInputElement;
    descriptionTextAreaElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        this.templateElement = document.querySelector('#project-input') as HTMLTemplateElement;
        this.hostElement = document.querySelector('#app') as HTMLDivElement;

        const importedFormNode = document.importNode(this.templateElement.content, true);

        (this.formElement = importedFormNode.firstElementChild as HTMLFormElement).id = 'user-input';

        this.titleInputElement = this.formElement.querySelector('#title') as HTMLInputElement;
        this.descriptionTextAreaElement = this.formElement.querySelector('#description') as HTMLTextAreaElement;
        this.peopleInputElement = this.formElement.querySelector('#people') as HTMLInputElement;

        this.configure();
        this.attach();
    }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        console.log(this.titleInputElement.value);
    }

    private configure() {
        this.formElement.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.formElement);
    }
}

const mainInput = new ProjectInput();