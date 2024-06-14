import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FaTrash } from 'react-icons/fa';
import { deleteToDo } from '../model/services/deleteToDo';

type DeleteToDoProps = {
    toDoIdForDelete: string
}

export const DeleteToDo = ({ toDoIdForDelete }: DeleteToDoProps) => {
    const dispatch = useAppDispatch();

    const onDeleteToDoListItem = useCallback(() => {
        dispatch(deleteToDo({ toDoId: toDoIdForDelete }));
    }, [dispatch, toDoIdForDelete]);

    return (
        <Button theme={ButtonTheme.CLEAR_RED} onClick={onDeleteToDoListItem} size={ButtonSize.M}><FaTrash /></Button>
    );
};
