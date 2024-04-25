import React, { memo } from 'react';
import { ToDoList } from 'entities/ToDoList';
import { PageWrapper } from 'widgets/PageWrapper/PageWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { CreateToDoList } from 'feautures/CreateToDoList/ui/CreateToDoList';
import { useFetchToDoQuery } from 'entities/ToDoList/model/services/toDoApiServices';
import cls from './ToDoPage.module.scss';

interface ToDoPageProps {
    className?: string;
}

const ToDoPage = ({ className }: ToDoPageProps) => {
    const { isLoading, data } = useFetchToDoQuery(); // Automatically fetch and we will get data
    return (
        <PageWrapper
            className={classNames(cls.ToDoPage, {}, [className])}
        >
            {data
                    && (
                        <>
                            <CreateToDoList />
                            <ToDoList
                                isLoading={isLoading}
                                className={cls.list}
                                toDos={data}
                            />
                        </>
                    )}
        </PageWrapper>
    );
};
export default memo(ToDoPage);
