import { useTranslation } from 'react-i18next';
import React, { useCallback } from 'react';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { deleteToDoListById } from '../model/services/deleteToDoListById';

type DeleteToDoListProps = {
    toDoListIdForDelete: string
}

export const DeleteToDoListById = ({ toDoListIdForDelete }: DeleteToDoListProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const onDeleteToDoListItem = useCallback(() => {
        dispatch(deleteToDoListById({ toDoId: toDoListIdForDelete }));
    }, [dispatch, toDoListIdForDelete]);

    return (
        <Button theme={ButtonTheme.OUTLINE_RED} onClick={onDeleteToDoListItem} size={ButtonSize.M}>{t('X')}</Button>
    );
};
