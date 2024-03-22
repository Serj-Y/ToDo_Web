import React, { memo, useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { DeleteToDoListById } from 'feautures/DeleteToDoListById';
import { CreateTask } from 'feautures/CreateTask';
import { DeleteTaskById } from 'feautures/DeleteTaskById';
import { UpdateToDoList } from 'feautures/UpdateToDoList';
import { UpdateTask } from 'feautures/UpdateTask';
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
    const [isEditToDoList, setIsEditToDoList] = useState<boolean>(false);
    const [isEditTask, setIsEditTask] = useState<boolean>(false);

    const setEditTaskHandler = () => setIsEditTask((prev) => !prev);
    const setEditToDoListHandler = () => setIsEditToDoList((prev) => !prev);
    const renderTask = (task: Task) => (
        <div key={task._id} className={cls.TaskWrapper} onDoubleClick={setEditTaskHandler}>
            { !isEditTask && <Text text={task.name} size={TextSize.M} />}
            <div className={cls.taskStatusAnDelete}>
                { isEditTask ? (
                    <UpdateTask
                        currentTaskName={task.name}
                        setIsEditTask={setIsEditTask}
                        taskId={task._id}
                        taskStatus={task.status}
                        toDoId={toDo._id}
                    />
                )
                    : (
                        <>
                            <TaskStatusSelect
                                value={task.status}
                                readonly={!isEditTask}
                            />
                            <DeleteTaskById taskIdForDelete={task._id} toDoListId={toDo._id} />
                        </>
                    )}

            </div>
        </div>
    );
    return (
        <div className={classNames(cls.ToDoItemWrapper)}>
            <Card>
                <div className={classNames(cls.toDoNameAndDelete)} onDoubleClick={setEditToDoListHandler}>
                    {isEditToDoList ? (
                        <UpdateToDoList
                            setIsEditToDoList={setIsEditToDoList}
                            toDoId={toDo._id}
                            currentToDoName={toDo.name}
                        />
                    ) : (
                        <>
                            <Text title={toDo.name} size={TextSize.M} />
                            <DeleteToDoListById toDoListIdForDelete={toDo._id} />
                        </>
                    )}

                </div>
                {toDo.tasks ? toDo.tasks.map(renderTask) : null}
                <CreateTask toDoListId={toDo._id} />
            </Card>

        </div>

    );
});
