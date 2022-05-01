type Listener<T> = (items: T[]) => void;

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    templateElement: HTMLTemplateElement;
    hostElement: T;
    element: U;

    constructor(
        templateId: string,
        hostElementId: string,
        insertAtStart: boolean,
        newElementId?: string,
    ) {
        this.templateElement = document.getElementById(templateId) as HTMLTemplateElement;
        this.hostElement = document.getElementById(hostElementId) as T;

        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild as U;
        this.element.id = newElementId ?? '';

        this.attach(insertAtStart);
    }

    private attach(insertAtStart: boolean) {
        const insertLocation = insertAtStart ? 'afterbegin' : 'beforeend';
        this.hostElement.insertAdjacentElement(insertLocation, this.element);
    }

    abstract configure() : void;
    abstract render(): void;
}

class State<T> {
    protected listeners: Listener<T>[] = [];

    public addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

class ProjectState extends State<Project> {

    private projects : Project[] = [];
    private static instance : ProjectState;

    private constructor() {
        super();
    }

    public static getInstance() : ProjectState {
        if (!this.instance) {
            this.instance = new ProjectState();
        }
        return this.instance;
    }

    public addProject(title: string, description: string, numPeople: number) : void {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numPeople,
            ProjectStatus.Active,
        );
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

const globalState = ProjectState.getInstance();

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

interface Validatable {
    value: string | number;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
}

function validate(validatableInput: Validatable) {
    let isValid = true;
    if (validatableInput.required) {
      isValid = isValid && validatableInput.value.toString().trim().length !== 0;
    }
    if (
      validatableInput.minLength != null &&
      typeof validatableInput.value === 'string'
    ) {
      isValid =
        isValid && validatableInput.value.length >= validatableInput.minLength;
    }
    if (
      validatableInput.maxLength != null &&
      typeof validatableInput.value === 'string'
    ) {
      isValid =
        isValid && validatableInput.value.length <= validatableInput.maxLength;
    }
    if (
      validatableInput.min != null &&
      typeof validatableInput.value === 'number'
    ) {
      isValid = isValid && validatableInput.value >= validatableInput.min;
    }
    if (
      validatableInput.max != null &&
      typeof validatableInput.value === 'number'
    ) {
      isValid = isValid && validatableInput.value <= validatableInput.max;
    }
    return isValid;
  }

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputElement: HTMLInputElement;
    descriptionTextAreaElement: HTMLTextAreaElement;
    peopleInputElement: HTMLInputElement;


    constructor() {
        super('project-input', 'app', true, 'user-input')
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descriptionTextAreaElement = this.element.querySelector('#description') as HTMLTextAreaElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;


        this.configure();
    }

    public render(): void {
        throw new Error("Method not implemented.");
    }

    public configure() : void {
        this.element.addEventListener('submit', this.submitHandler);
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descriptionTextAreaElement.value = '';
        this.peopleInputElement.value = '';
      }

    private gatherUserInput() : [string, string, number] | void {
        const enteredTitle = this.titleInputElement.value;
        const enteredDescription = this.descriptionTextAreaElement.value;
        const enteredPeople = this.peopleInputElement.value;

        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true,
            minLength: 1,
            maxLength: 15,
        };

        const descriptionValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 1,
        };

        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5,
        };

        if (
            !validate(titleValidatable) ||
            !validate(descriptionValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input, please try again!');
            return;
        }
        return [enteredTitle, enteredDescription, +enteredPeople];
    }

    @AutoBind
    private submitHandler(event: Event) : void {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            globalState.addProject(title, desc, people);
            this.clearInputs();
        }
    }

}

enum ProjectStatus { Active, Finished };

class Project {
    constructor (
        public id: string,
        public title: string,
        public description: string,
        public people: number,
        public status: ProjectStatus,
    ) {

    }
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> {
    assignedProjects: Project[];

    constructor(
        private status: 'active' | 'finished'
    ) {
        super('project-list', 'app', false, `${status}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.render();
    }

    public configure() {
        globalState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => {
                if (this.status === 'active') {
                    return project.status === ProjectStatus.Active
                };
                return project.status === ProjectStatus.Finished
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        });
    }

    private renderProjects() {
        const listElement = document.getElementById(`${this.status}-project-list`) as HTMLUListElement;
        listElement.innerHTML = '';
        for (const project of this.assignedProjects) {
            const newListItem = document.createElement('li');
            newListItem.textContent = project.title;
            listElement.appendChild(newListItem);
        }
    }

    public render() {
        const listId = `${this.status}-project-list`;
        this.element.querySelector('ul')!.id = listId;
        this.element.querySelector('h2')!.textContent = this.status.toUpperCase() + ' PROJECTS';
    }
}


const mainInput = new ProjectInput();
const activeProjects = new ProjectList('active');
const completedProjects = new ProjectList('finished');