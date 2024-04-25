import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { FaTrash } from 'react-icons/fa';
import { useDeleteToDoMutation } from 'entities/ToDoList/model/services/toDoApiServices';

type DeleteToDoListProps = {
    toDoListIdForDelete: string
}

export const DeleteToDoList = ({ toDoListIdForDelete }: DeleteToDoListProps) => {
    const { t } = useTranslation();
    const [deleteToDo] = useDeleteToDoMutation();

    const onDeleteToDoListItem = useCallback(() => {
        deleteToDo({ todoId: toDoListIdForDelete });
    }, [deleteToDo, toDoListIdForDelete]);

    return (
        <Button theme={ButtonTheme.CLEAR_RED} onClick={onDeleteToDoListItem} size={ButtonSize.M}><FaTrash /></Button>
    );
};
