import { memo } from 'react';
import { Text } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card } from 'shared/ui/Card/Card';
import { DeleteToDoListById } from 'feautures/DeleteToDoListById';
import cls from './ToDoListItem.module.scss';
import { ToDo } from '../../model/types/toDo';

interface ToDoListItemProps {
    className?: string;
    toDo: ToDo;
}

export const ToDoListItem = memo(({
    className,
    toDo,
}: ToDoListItemProps) => (
    <div
        className={classNames('', {}, [className])}
    >
        <Card>
            <Text text={toDo.name} className={cls.title} />
            <DeleteToDoListById toDoListIdForDelete={toDo._id} />
        </Card>
    </div>
));
