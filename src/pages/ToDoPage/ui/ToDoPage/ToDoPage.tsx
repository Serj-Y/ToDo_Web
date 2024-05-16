import { useSelector } from 'react-redux';
import React, { memo, useEffect } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    DynamicModuleLoader,
    ReducersList,
} from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToDoList } from 'entities/ToDo';
import { PageWrapper } from 'widgets/PageWrapper/PageWrapper';
import { classNames } from 'shared/lib/classNames/classNames';
import { CreateToDo } from 'feautures/CreateToDo/ui/CreateToDo';
import { getToDo, toDoReducers } from 'entities/ToDo/model/slice/toDoSlice';
import {
    getToDoPageError,
    getToDoPageHasInited,
    getToDoPageIsLoading,
} from 'entities/ToDo/model/selectors/toDoSelectors';
import { userReducer } from 'entities/User';
import { fetchToDo } from 'entities/ToDo/model/services/fetchToDo/fetchToDo';
import useIsWindowFocused from 'shared/lib/hooks/useIsWindowFocused/useIsWindowFocused';
import cls from './ToDoPage.module.scss';
import { initToDoPage } from '../../model/services/initToDoPage/initToDoPage';

interface ToDoPageProps {
    className?: string;
}

const reducers: ReducersList = {
    toDo: toDoReducers,
    user: userReducer,
};

const ToDoPage = ({ className }: ToDoPageProps) => {
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getToDoPageIsLoading);
    const error = useSelector(getToDoPageError);
    const inited = useSelector(getToDoPageHasInited);
    const toDo = useSelector(getToDo.selectAll);
    const isFocus = useIsWindowFocused();

    useEffect(() => {
        if (isFocus && navigator.onLine) {
            setTimeout(() => { dispatch(fetchToDo({})); }, 2000);
        }
    }, [dispatch, isFocus]);

    useEffect(() => {
        dispatch(initToDoPage());
    });
    return (
        <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
            <PageWrapper
                className={classNames(cls.ToDoPage, {}, [className])}
            >
                {inited
                    && (
                        <>
                            <CreateToDo />
                            <ToDoList
                                isLoading={isLoading}
                                className={cls.list}
                                toDos={toDo}
                            />
                        </>
                    )}
            </PageWrapper>
        </DynamicModuleLoader>
    );
};
export default memo(ToDoPage);
