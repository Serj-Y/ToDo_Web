import { useTranslation } from 'react-i18next';
import { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAuthData, userActions } from 'entities/User';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextSize, TextTheme } from 'shared/ui/Text/Text';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { LoginModal } from 'feautures/AuthByEmail';
import { SignUpModal } from 'feautures/SignUpByEmail';
import cls from './Navbar.module.scss';
import { useAppDispatch } from '../../../shared/lib/hooks/useAppDispatch/useAppDispatch';
import { EditUserModal } from '../../../feautures/EditUser';

interface NavbarProps {
    className?: string;
}

enum MODAL_TYPE {
    SIGN_IN= 'SignIn',
    SIGN_UP = 'SignUp',
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const { t } = useTranslation();
    const [isAuthModal, setIsAuthModal] = useState(false);
    const [isSignUpModal, setIsSignUpModal] = useState(false);
    const [isEditUserModal, setIsEditUserModal] = useState(false);
    const authData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();

    const onCloseModal = useCallback(() => {
        setIsSignUpModal(false);
        setIsAuthModal(false);
    }, []);

    const onShowModal = useCallback((modalType: MODAL_TYPE) => {
        if (modalType === MODAL_TYPE.SIGN_IN) {
            setIsAuthModal(true);
        } else {
            setIsSignUpModal(true);
        }
    }, []);

    const onLogout = useCallback(() => {
        dispatch(userActions.logout());
    }, [dispatch]);

    if (authData) {
        return (
            <div className={classNames(cls.Navbar, {}, [className])}>
                <Text
                    title={t('To_Do')}
                    theme={TextTheme.SECONDARY}
                    className={cls.appName}
                />
                <Button
                    theme={ButtonTheme.CLEAR_INVERTED}
                    className={cls.links}
                    onClick={onLogout}
                >
                    {t('Sign Out')}
                </Button>
                <Button onDoubleClick={() => setIsEditUserModal((prev) => !prev)}>
                    <Text
                        title={authData.user?.name}
                        className={cls.AuthUserName}
                        theme={TextTheme.SECONDARY}
                        size={TextSize.S}
                    />
                </Button>
                {isEditUserModal && (
                    <EditUserModal
                        isOpen={isEditUserModal}
                        onClose={() => setIsEditUserModal((prev) => !prev)}
                        currentName={authData.user?.name}
                    />
                ) }

            </div>
        );
    }

    return (
        <div className={classNames(cls.Navbar, {}, [className])}>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={() => onShowModal(MODAL_TYPE.SIGN_IN)}
            >
                {t('Sign in')}
            </Button>
            <Button
                theme={ButtonTheme.CLEAR_INVERTED}
                className={cls.links}
                onClick={() => onShowModal(MODAL_TYPE.SIGN_UP)}
            >
                {t('Sign up')}
            </Button>
            { isAuthModal && (
                <LoginModal
                    isOpen={isAuthModal}
                    onClose={onCloseModal}
                />
            )}
            { isSignUpModal && (
                <SignUpModal
                    isOpen={isSignUpModal}
                    onClose={onCloseModal}
                />
            )}
        </div>
    );
});
