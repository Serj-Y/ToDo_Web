export interface Task {
    _id: string
    name: string
    status: string
    order: number
    createdAt: string
    updatedAt: string
}

export interface ToDo {
    _id: string
    name: string
    order:number
    tasks: Array<Task>,
    createdAt: string
    updatedAt: string
}
