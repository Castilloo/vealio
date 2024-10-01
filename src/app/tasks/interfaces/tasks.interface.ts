export interface Task {
    id: number;
    taskName: string;
    deadline: Date;
    people: Person[];
    status: boolean;
}

export interface Person{
    name: string;
    age: number;
    skills: string[];
}