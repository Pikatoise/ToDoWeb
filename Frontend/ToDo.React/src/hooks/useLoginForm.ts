import { useForm } from 'react-hook-form';
import useAuth from './useAuth';
import User from '@/models/User';
import { useNavigate } from 'react-router-dom';
import ErrorType from '@/models/errorTypes';

interface FormData {
	login: string;
	password: string;
	isRemember: boolean;
}

const useLoginForm = () => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
	} = useForm<FormData>({ mode: 'onSubmit' });

	const auth = useAuth();
	const navigate = useNavigate();

	const tryLogin = (data: FormData) => {
		const user: User = { Login: data.login, Password: data.password };

		const successful = () => {
			navigate('/', { replace: true });
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

		auth?.signIn({
			User: user,
			IsRemember: data.isRemember,
			CallbackSuccess: successful,
			CallbackError: throwError,
		});

		reset();
	};

	const onSubmit = handleSubmit(tryLogin);

	const registerLogin = register('login', {
		required: 'Введите логин',
		minLength: {
			value: 2,
			message: 'Неверный логин',
		},
		maxLength: {
			value: 30,
			message: 'Неверный логин',
		},
	});

	const registerPassword = register('password', {
		required: 'Введите пароль',
		minLength: {
			value: 2,
			message: 'Неверный пароль',
		},
		maxLength: {
			value: 30,
			message: 'Неверный логин',
		},
	});

	const registerRemember = register('isRemember');

	return { registerLogin, registerPassword, registerRemember, onSubmit, errors };
};

export default useLoginForm;
