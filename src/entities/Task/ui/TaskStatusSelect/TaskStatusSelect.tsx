import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { TaskStatus } from '../../module/types/taskStatus';

interface currencySelectProps {
  className?: string;
  value?: TaskStatus;
  onChange?: (value: TaskStatus) => void
  readonly?: boolean
}

export const TaskStatusSelect = memo(({
    className, value, onChange, readonly,
}: currencySelectProps) => {
    const { t } = useTranslation();
    const options = [
        { value: TaskStatus.NOT_DONE, content: t(TaskStatus.NOT_DONE) },
        { value: TaskStatus.DONE, content: t(TaskStatus.DONE) },
        { value: TaskStatus.IN_PROGRESS, content: t(TaskStatus.IN_PROGRESS) },
    ];

    return (
        <Select
            options={options}
            className={classNames('', {}, [className])}
            value={value}
            onChange={onChange}
            readonly={readonly}
        />
    );
});
