import { useTranslation } from 'react-i18next';
import cls from './ErrorPage.module.scss';
import { classNames } from '../../../shared/lib/classNames/classNames';
import { Button } from '../../../shared/ui/Button/Button';

interface ErrorPageProps {
    className?: string;
}

export const ErrorPage = ({ className }: ErrorPageProps) => {
    const { t } = useTranslation();

    const reloadPage = () => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
    };

    return (
        <div className={classNames(cls.ErrorPage, {}, [className])}>
            <p>{t('Something went wrong')}</p>
            <Button onClick={reloadPage}>
                {t('Refresh Page')}
            </Button>
        </div>
    );
};
