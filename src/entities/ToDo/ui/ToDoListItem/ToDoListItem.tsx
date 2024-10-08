import React, { memo, useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { DeleteToDo } from 'feautures/DeleteToDo';
import { CreateTask } from 'feautures/CreateTask';
import { UpdateToDoList } from 'feautures/UpdateToDoList';
import { changeToDoOrder } from 'feautures/UpdateToDoList/model/services/changeToDoOrder';
import { DraggableWrapper } from 'widgets/DraggableWrapper';
import { sortByOrder } from 'shared/lib/sortByOrder/sortByOrder';
import cls from './ToDoListItem.module.scss';
import { ToDo } from '../../model/types/toDo';
import { Task, TaskItem } from '../../../Task';

interface ToDoListItemProps {
    toDo: ToDo;
}

export const ToDoListItem = memo(({
    toDo,
}: ToDoListItemProps) => {
    const [isEditToDoList, setIsEditToDoList] = useState<boolean>(false);

    const setEditToDoListHandler = () => setIsEditToDoList((prev) => !prev);
    const renderTask = (task: Task) => (
        <TaskItem task={task} toDo={toDo} key={task._id} />
    );
    const sortedTasks = [...toDo.tasks].sort(sortByOrder);
    return (
        <DraggableWrapper draggableElementId={toDo._id} updateRequest={changeToDoOrder}>
            <div className={classNames(cls.ToDoItemWrapper)}>
                <Card>
                    <div
                        className={classNames(cls.toDoNameAndDelete)}
                        onDoubleClick={setEditToDoListHandler}
                    >
                        {isEditToDoList ? (
                            <UpdateToDoList
                                setIsEditToDoList={setIsEditToDoList}
                                toDoId={toDo._id}
                                currentToDoName={toDo.name}
                            />
                        ) : (
                            <>
                                <Text title={toDo.name} size={TextSize.M} />
                                <DeleteToDo toDoIdForDelete={toDo._id} />
                            </>
                        )}

                    </div>
                    {sortedTasks.length > 0 ? sortedTasks.map(renderTask) : null}
                    <CreateTask toDoId={toDo._id} />
                </Card>
            </div>
        </DraggableWrapper>
    );
});
