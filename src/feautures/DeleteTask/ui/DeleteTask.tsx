import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { FaTrash } from 'react-icons/fa';
import { useDeleteTaskMutation } from 'entities/ToDoList';

type DeleteTaskProps = {
    toDoListId: string
    taskIdForDelete: string
}

export const DeleteTask = ({ taskIdForDelete, toDoListId }: DeleteTaskProps) => {
    const [deleteTask] = useDeleteTaskMutation();

    const onDeleteTask = useCallback(async () => {
        deleteTask({ taskId: taskIdForDelete, todoId: toDoListId });
    }, [deleteTask, taskIdForDelete, toDoListId]);

    return (
        <Button theme={ButtonTheme.CLEAR_RED} onClick={onDeleteTask} size={ButtonSize.M}><FaTrash /></Button>
    );
};
