import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { TaskStatus } from '../../module/types/taskStatus';

interface currencySelectProps {
  className?: string;
  value?: TaskStatus;
  onChange?: (value: TaskStatus) => void
  readonly?: boolean
}

const options = [
    { value: TaskStatus.NOT_DONE, content: TaskStatus.NOT_DONE },
    { value: TaskStatus.DONE, content: TaskStatus.DONE },
    { value: TaskStatus.IN_PROGRESS, content: TaskStatus.IN_PROGRESS },
];

export const TaskStatusSelect = memo(({
    className, value, onChange, readonly,
}: currencySelectProps) => {
    const { t } = useTranslation();

    const onChangeHandler = useCallback((value: string) => onChange?.(value as TaskStatus), [onChange]);

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
