import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
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
        <Button theme={ButtonTheme.OUTLINE_RED} onClick={onDeleteTask} size={ButtonSize.M}>{t('X')}</Button>
    );
};
