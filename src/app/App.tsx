import React, { Suspense, useEffect, useState } from 'react';
import { useDispatch, useSelector, useStore } from 'react-redux';
import { Navbar } from '../widgets/Navbar';
import { classNames } from '../shared/lib/classNames/classNames';
import { useTheme } from './providers/ThemeProvider';
import { getUserInited, userActions } from '../entities/User';
import { Text } from '../shared/ui/Text/Text';
import { ToDoPage } from '../pages/ToDoPage';

function App() {
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const inited = useSelector(getUserInited);
    const state = useStore();

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    return (
        <div className={classNames('app', {}, [theme])}>
            <Suspense fallback="">
                <Navbar />
                <div className="content-page">
                    {inited
                      && (
                          <div>

                              <Text title={state.getState().name} />
                              <ToDoPage />
                          </div>
                      )}

                </div>
            </Suspense>
        </div>
    );
}

export default App;
