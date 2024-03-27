import { Suspense } from 'react';
import { Modal } from 'shared/ui/Modal/Modal';
import { classNames } from 'shared/lib/classNames/classNames';
import { Loader } from 'shared/ui/Loader/Loader';
import { SignInFormAsync } from '../SignInForm/SignInForm.async';

interface SignInModalProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}
export const SignInModal = ({ className, onClose, isOpen }: SignInModalProps) => (
    <Modal
        className={classNames('', {}, [className])}
        isOpen={isOpen}
        onClose={onClose}
        lazy
    >
        <Suspense fallback={<Loader />}>
            <SignInFormAsync onSuccess={onClose} />
        </Suspense>
    </Modal>
);
