import { memo } from 'react';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { DeleteToDoListById } from 'feautures/DeleteToDoListById';
import { CreateTask } from 'feautures/CreateTask';
import { DeleteTaskById } from 'feautures/DeleteTaskById';
import cls from './ToDoListItem.module.scss';
import { Task, ToDo } from '../../model/types/toDo';
import { TaskStatusSelect } from '../../../TaskStatus';

interface ToDoListItemProps {
    className?: string;
    toDo: ToDo;
}

export const ToDoListItem = memo(({
    className,
    toDo,
}: ToDoListItemProps) => {
    const renderTask = (task: Task) => (
        <div key={task._id} className={cls.TaskWrapper}>
            <Text text={task.name} size={TextSize.M} />
            <div className={cls.taskStatusAnDelete}>
                <TaskStatusSelect value={task.status} />
                <DeleteTaskById taskIdForDelete={task._id} toDoListId={toDo._id} />
            </div>

        </div>
    );
    return (
        <div className={classNames(cls.ToDoItemWrapper)}>
            <Card>
                <div className={classNames(cls.toDoNameAndDelete)}>
                    <Text title={toDo.name} size={TextSize.M} />
                    <DeleteToDoListById toDoListIdForDelete={toDo._id} />
                </div>
                {toDo.tasks ? toDo.tasks.map(renderTask) : null}
                <CreateTask toDoListId={toDo._id} />
            </Card>

        </div>

    );
});
