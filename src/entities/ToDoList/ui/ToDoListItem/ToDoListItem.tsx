import React, { memo, useState } from 'react';
import { Text, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { DeleteToDoListById } from 'feautures/DeleteToDoListById';
import { CreateTask } from 'feautures/CreateTask';
import { UpdateToDoList } from 'feautures/UpdateToDoList';
import { updateToDoOrder } from 'feautures/UpdateToDoList/model/services/updateToDoOrder';
import { DraggableWrapper } from 'widgets/DraggableWrapper';
import cls from './ToDoListItem.module.scss';
import { ToDo } from '../../model/types/toDo';
import { Task, TaskItem } from '../../../Task';

interface ToDoListItemProps {
    className?: string;
    toDo: ToDo;
}

export const ToDoListItem = memo(({
    className,
    toDo,
}: ToDoListItemProps) => {
    const [isEditToDoList, setIsEditToDoList] = useState<boolean>(false);

    const setEditToDoListHandler = () => setIsEditToDoList((prev) => !prev);
    const renderTask = (task: Task) => (
        <TaskItem task={task} toDo={toDo} key={task._id} />
    );
    return (
        <DraggableWrapper draggableElementId={toDo._id} updateRequest={updateToDoOrder}>
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
                                <DeleteToDoListById toDoListIdForDelete={toDo._id} />
                            </>
                        )}

                    </div>
                    {toDo.tasks ? toDo.tasks.map(renderTask) : null}
                    <CreateTask toDoListId={toDo._id} />
                </Card>

            </div>

        </DraggableWrapper>

    );
});
