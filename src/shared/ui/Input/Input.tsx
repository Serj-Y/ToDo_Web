import React, {
    forwardRef,
    ForwardRefRenderFunction,
    HTMLInputTypeAttribute,
    InputHTMLAttributes,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import cls from './Input.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import { Button, ButtonTheme } from '../Button/Button';

type HtmlInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>
interface InputProps extends HtmlInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void
    autofocus?: boolean
    readonly?: boolean
    customPlaceholder?: string
}

enum InputType {
    PASSWORD = 'password',
    TEXT = 'text'
}

const Input: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (props, ref) => {
    const {
        className,
        value,
        onChange,
        type = 'text',
        customPlaceholder,
        placeholder,
        autofocus,
        readonly,
        ...otherProps
    } = props;
    const [isFocused, setIsFocused] = useState(false);
    const [caretPosition, setCaretPosition] = useState(0);
    const [inputType, setInputType] = useState < InputType | HTMLInputTypeAttribute>(InputType.PASSWORD);
    const [isPasswordVisible, setIsPasswordVisible] = useState(type === 'text');

    useEffect(() => {
        if (autofocus) {
            setIsFocused(true);
        }
    }, [autofocus]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
        setCaretPosition(e.target.value.length);
    };

    const onBlur = () => {
        setIsFocused(false);
    };

    const onFocus = () => {
        setIsFocused(true);
    };

    const onSelect = (e:any) => {
        setCaretPosition(e?.target?.selectionStart || 0);
    };

    const mods: Mods = {
        [cls.readonly]: readonly,
    };

    const onPasswordShow = useCallback(() => {
        if (inputType === InputType.PASSWORD) {
            setInputType(InputType.TEXT);
            setIsPasswordVisible(true);
        } else if (inputType === InputType.TEXT) {
            setInputType(InputType.PASSWORD);
            setIsPasswordVisible(false);
        }
    }, [inputType]);

    return (
        <div
            className={classNames(cls.InputWrapper, mods, [className])}
            onDoubleClick={() => onPasswordShow()}
        >
            {customPlaceholder && (
                <div className={cls.placeholder}>
                    {`${customPlaceholder}`}
                </div>
            ) }
            <input
                ref={ref}
                type={type === InputType.PASSWORD ? inputType : type}
                value={value}
                onChange={onChangeHandler}
                className={classNames(cls.input, undefined, [className])}
                onFocus={onFocus}
                onBlur={onBlur}
                placeholder={placeholder}
                onSelect={onSelect}
                readOnly={readonly}
                {...otherProps}
            />
            {type === 'password' && (
                <Button
                    className={cls.passwordToggle}
                    onClick={onPasswordShow}
                    theme={ButtonTheme.CLEAR}
                >
                    {isPasswordVisible ? (
                        <FaEyeSlash />
                    ) : (
                        <FaEye />
                    )}
                </Button>

            )}
        </div>
    );
};

export default forwardRef(Input);
