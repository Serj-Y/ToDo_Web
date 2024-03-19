import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import cls from './Name.module.scss';
import { classNames } from '../../../../lib/classNames/classNames';

interface NameProps {
    className?: string;
}

const Name = ({ className }: NameProps) => {
    const { t } = useTranslation();
    return (
        <div className={classNames(cls.Name, {}, [className])}>
            {t('Name')}
        </div>
    );
};
export default memo(Name);
