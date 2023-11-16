import { useForm } from 'react-hook-form';
import Task from '@/models/Task';

interface FormData {
	name: string;
	description: string | null;
	expiryDate: Date | null;
	folderId: number | null;
	status: number;
}

export const useUpdateTaskForm = (oldTask: Task) => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
		control,
	} = useForm<FormData>({ mode: 'onSubmit' });

	const tryUpdateTask = (data: FormData) => {
		const task: Task = {
			Id: oldTask.Id,
			Name: data.name,
			Description: data.description,
			ExpiryDate: data.expiryDate,
			FolderId: data.folderId,
			Status: data.status,
			isNotificated: oldTask.isNotificated,
			ProfileId: oldTask.ProfileId,
		};

		console.log(task);

		reset();
	};

	const onSubmit = handleSubmit(tryUpdateTask);

	const registerName = register('name', {
		value: oldTask.Name!,
		required: 'Введите имя',
		minLength: {
			value: 2,
			message: 'Имя слишком короткое',
		},
		maxLength: {
			value: 15,
			message: 'Имя слишком длинное',
		},
	});

	const registerDescription = register('description', {
		value: oldTask.Description ?? '',
		maxLength: {
			value: 150,
			message: 'Описание слишком длинное',
		},
	});

	const registerExpiryDate = register('expiryDate', {
		value: oldTask.ExpiryDate,
	});

	const registerFolderId = register('folderId', {
		value: oldTask.FolderId,
	});

	const registerStatus = register('status', {
		value: oldTask.Status ?? 0,
	});

	return {
		registerName,
		registerDescription,
		registerExpiryDate,
		registerFolderId,
		registerStatus,
		onSubmit,
		errors,
		control,
	};
};
