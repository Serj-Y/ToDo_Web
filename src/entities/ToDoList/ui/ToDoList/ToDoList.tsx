import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import React from 'react';
import { classicSort } from 'shared/lib/classicSort/classicSort';
import { ToDoListItemSkeleton } from '../ToDoListItem/ToDoListItemSkeleton';
import cls from './ToDoList.module.scss';
import { ToDo } from '../../model/types/toDo';
import { ToDoListItem } from '../ToDoListItem/ToDoListItem';

interface ToDoListProps {
    className?: string;
    toDos: ToDo[];
    isLoading?: boolean;
}

type HandlerType = {
    e: React.DragEvent<HTMLDivElement>
    toDo: ToDo
}

const getSkeletons = () => (
    new Array(12)
        .fill(0)
        .map((item, index) => (
            <ToDoListItemSkeleton className={cls.card} key={index} />
        ))
);

export const ToDoList = ({
    className,
    toDos,
    isLoading,
}: ToDoListProps) => {
    const { t } = useTranslation();

    const renderToDo = (toDo: ToDo) => (
        <ToDoListItem toDo={toDo} key={toDo._id} />
    );
    if (!isLoading && !toDos.length) {
        return (
            <div className={classNames('', {}, [className, cls.CARD])}>
                <Text
                    size={TextSize.L}
                    align={TextAlign.CENTER}
                    title={t('ToDoList not found')}
                />
            </div>
        );
    }
    return (
        <div className={classNames(cls.ToDoList, {}, [className, cls.CARD])}>
            {toDos.length > 0 ? toDos.sort(classicSort).map(renderToDo) : null}
            {isLoading && getSkeletons()}
        </div>
    );
};
