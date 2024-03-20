import React, { Suspense, useEffect } from 'react';
import { useSelector, useStore } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '../widgets/Navbar';
import { useTheme } from './providers/ThemeProvider';
import { getUserInited, userActions } from '../entities/User';
import { ToDoPage } from '../pages/ToDoPage';

function App() {
    const { theme } = useTheme();
    const dispatch = useAppDispatch();
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
                              <ToDoPage />
                          </div>
                      )}

                </div>
            </Suspense>
        </div>
    );
}

export default App;
