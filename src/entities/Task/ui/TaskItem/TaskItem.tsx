import React, { useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { UpdateTask } from 'feautures/UpdateTask';
import { DeleteTaskById } from 'feautures/DeleteTaskById';
import styles from './TaskItem.module.scss';
import cls from '../../../ToDoList/ui/ToDoListItem/ToDoListItem.module.scss';
import { ToDo } from '../../../ToDoList/model/types/toDo';
import { TaskStatusSelect } from '../TaskStatusSelect/TaskStatusSelect';
import { Task } from '../../module/types/task';

type TaskProps = {
    task: Task
    toDo: ToDo
}
export const TaskItem = ({ task, toDo }: TaskProps) => {
    const [isEditTask, setIsEditTask] = useState<boolean>(false);
    const setEditTaskHandler = () => setIsEditTask((prev) => !prev);
    return (
        <div className={styles.Task}>
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
        </div>
    );
};
