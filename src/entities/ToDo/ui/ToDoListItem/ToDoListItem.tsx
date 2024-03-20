import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { $api } from 'shared/api/api';
import cls from './ToDoListItem.module.scss';
import { ToDo } from '../../model/types/toDo';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { todosPageActions } from '../../../../pages/ToDoPage/model/slice/toDoPageSlice';

interface ToDoListItemProps {
    className?: string;
    toDo: ToDo;
}

export const ToDoListItem = memo(({
    className,
    toDo,
}: ToDoListItemProps) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const onDeleteToDoListItem = (id: string) => {
        const todoId = {
            todoId: id,
        };

        $api.delete<ToDo>('todo/', { data: todoId }).then((res) => {
            if (res.data) {
                dispatch(todosPageActions.deleteToDo(res.data._id));
            }
        });
    };

    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [className])}
        >
            <Card>
                <div className={cls.infoWrapper} />
                <Text text={toDo.name} className={cls.title} />
                <Button theme={ButtonTheme.OUTLINE_RED} onClick={() => onDeleteToDoListItem(toDo._id)}>{t('X')}</Button>
            </Card>
        </div>
    );
});
