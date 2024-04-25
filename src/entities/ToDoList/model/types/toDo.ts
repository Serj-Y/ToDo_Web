import { Update } from '@reduxjs/toolkit';
import { Task } from '../../../Task';

export interface ToDo {
    _id: string
    name: string
    order:number
    tasks: Task[],

    // map(param: (todo: ToDo) => { changes: any; id: string }): Update<ToDo>[];
}
