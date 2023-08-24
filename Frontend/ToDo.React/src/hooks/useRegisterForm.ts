import { useForm } from 'react-hook-form';
import { useAuth } from './useAuth';
import { useNavigate } from 'react-router-dom';
import ErrorType from '@/models/errorTypes';
import User from '@/models/User';

interface FormData {
	login: string;
	password: string;
	confirmPassword: string;
}

export const useRegisterForm = (changeSign: Function) => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
	} = useForm<FormData>({ mode: 'onSubmit' });

	const auth = useAuth();
	const navigate = useNavigate();

	const tryRegister = (data: FormData) => {
		if (data.confirmPassword != data.password) {
			setError('confirmPassword', { type: 'custom', message: 'Пароли не совпадают' });
			return;
		}

		const user: User = { Login: data.login, Password: data.password };

		const successful = () => {
			changeSign();
		};

		const throwError = (type: ErrorType, message: string) => {
			switch (type) {
				case ErrorType.login: {
					setError('login', { type: 'custom', message: message });
					return;
				}
				case ErrorType.password:
					setError('password', { type: 'custom', message: message });
					return;
			}
		};

		auth?.signUp(user, successful, throwError);

		reset();
	};

	const onSubmit = handleSubmit(tryRegister);

	const registerLogin = register('login', {
		required: 'Введите логин',
		minLength: {
			value: 2,
			message: 'Логин слишком короткий',
		},
	});

	const registerPassword = register('password', {
		required: 'Введите пароль',
		minLength: {
			value: 2,
			message: 'Пароль слишком короткий',
		},
	});

	const registerConfirmPassword = register('confirmPassword', {
		required: 'Введите пароль повторно',
	});

	return { registerLogin, registerPassword, registerConfirmPassword, onSubmit, errors };
};
