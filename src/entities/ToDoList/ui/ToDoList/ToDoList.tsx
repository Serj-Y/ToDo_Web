import { useTranslation } from 'react-i18next';
import { Text, TextAlign, TextSize } from 'shared/ui/Text/Text';
import { classNames } from 'shared/lib/classNames/classNames';
import React, { useState } from 'react';
import { ToDoListItemSkeleton } from '../ToDoListItem/ToDoListItemSkeleton';
import cls from './ToDoList.module.scss';
import { ToDo } from '../../model/types/toDo';
import { ToDoListItem } from '../ToDoListItem/ToDoListItem';
import { useAppDispatch } from '../../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { updateToDoName } from '../../../../feautures/UpdateToDoList/model/services/updateToDoName';
import { updateToDoOrder } from '../../../../feautures/UpdateToDoList/model/services/updateToDoOrder';

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
    const dispatch = useAppDispatch();
    const [firstTodoId, setFirstTodoId] = useState('');
    const [secondTodoId, setSecondTodoId] = useState('');
    const onDragStartHandler = ({ e, toDo }: HandlerType) => {
        setFirstTodoId(toDo._id);
    };
    const onDragOverHandler = ({ e, toDo } : HandlerType) => {
        e.preventDefault();
        setSecondTodoId(toDo._id);
        e.currentTarget.style.opacity = '0.5';
    };
    const onDragEndHandler = (e:React.DragEvent<HTMLDivElement>) => {
        e.currentTarget.style.opacity = '1';
    };

    const onDragDropHandler = ({ e, toDo }: HandlerType) => {
        setSecondTodoId(toDo._id);
        e.preventDefault();
        if (firstTodoId && secondTodoId) {
            dispatch(updateToDoOrder({ firstTodoId, secondTodoId }));
        }
        e.currentTarget.style.opacity = '1';
    };

    const sortCards = (a: { order: number; }, b: { order: number; }) => {
        if (a.order > b.order) {
            return 1;
        }
        return -1;
    };

    const renderToDo = (toDo: ToDo) => (
        <div
            key={toDo._id}
            draggable
            onDragStart={(e) => onDragStartHandler({ e, toDo })}
            onDragLeave={(e) => onDragEndHandler(e)}
            onDragOver={(e) => onDragOverHandler({ e, toDo })}
            onDragEnd={(e) => onDragEndHandler(e)}
            onDrop={(e) => onDragDropHandler({ e, toDo })}
        >
            <ToDoListItem toDo={toDo} />
        </div>

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
            {toDos.length > 0 ? toDos.sort(sortCards).map(renderToDo) : null}
            {isLoading && getSkeletons()}
        </div>
    );
};
