import { useSelector } from 'react-redux';
import React, { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToDoList } from 'entities/ToDoList';
import { PageWrapper } from 'widgets/PageWrapper/PageWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { CreateToDoList } from 'feautures/CreateToDoList/ui/CreateToDoList';
import { getToDo, todosPageReducer } from 'entities/ToDoList/model/slice/toDoListSlice';
import {
    getToDoPageError,
    getToDoPageHasInited,
    getToDoPageIsLoading,
} from 'entities/ToDoList/model/selectors/toDoPageSelectors';
import { userReducer } from 'entities/User';
import cls from './ToDoPage.module.scss';
import { initToDoPage } from '../../model/services/initToDoPage/initToDoPage';

interface ToDoPageProps {
    className?: string;
}

const reducers: ReducersList = {
    toDoList: todosPageReducer,
    user: userReducer,
};

const ToDoPage = ({ className }: ToDoPageProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getToDoPageIsLoading);
    const error = useSelector(getToDoPageError);
    const inited = useSelector(getToDoPageHasInited);
    const toDo = useSelector(getToDo.selectAll);

    useEffect(() => {
        dispatch(initToDoPage());
    });
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
            <PageWrapper
                className={classNames(cls.ToDoPage, {}, [className])}
            >
                {inited
                    && (
                        <>
                            <CreateToDoList />
                            <ToDoList
                                isLoading={isLoading}
                                className={cls.list}
                                toDo={toDo}
                            />
                        </>
                    )}

            </PageWrapper>
        </DynamicModuleLoader>
    );
};
export default memo(ToDoPage);
