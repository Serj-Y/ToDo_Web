import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import {
    ToDo,
} from '../../model/types/toDo';
import cls from './ToDoListItem.module.scss';
import { Text } from '../../../../shared/ui/Text/Text';
import { classNames } from '../../../../shared/lib/classNames/classNames';
import { Card } from '../../../../shared/ui/Card/Card';

interface ToDoListItemProps {
    className?: string;
    toDo: ToDo;
}

export const ToDoListItem = memo(({
    className,
    toDo,
}: ToDoListItemProps) => {
    const { t } = useTranslation();
    return (
        <div
            className={classNames(cls.ArticleListItem, {}, [className])}
        >
            <Card>
                <div className={cls.imageWrapper}>
                    <Text text={toDo.createdAt} className={cls.date} />
                </div>
                <div className={cls.infoWrapper} />
                <Text text={toDo.name} className={cls.title} />
            </Card>
        </div>
    );
});
