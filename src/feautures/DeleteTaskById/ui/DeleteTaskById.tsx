import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { FaTrash } from 'react-icons/fa';
import { deleteTaskById } from '../model/services/deleteTaskById';

type DeleteTaskProps = {
    toDoListId: string
    taskIdForDelete: string
}

export const DeleteTaskById = ({ taskIdForDelete, toDoListId }: DeleteTaskProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onDeleteTask = useCallback(async () => {
        await dispatch(deleteTaskById({ taskId: taskIdForDelete, toDoId: toDoListId }));
    }, [dispatch, taskIdForDelete, toDoListId]);

    return (
        <Button theme={ButtonTheme.CLEAR_RED} onClick={onDeleteTask} size={ButtonSize.M}><FaTrash /></Button>
    );
};
