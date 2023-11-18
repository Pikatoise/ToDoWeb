import { useForm } from 'react-hook-form';
import Task from '@/models/Task';
import useAuth from '@/hooks/useAuth';

interface FormData {
	name: string;
	description: string | null;
	expiryDate: Date | null;
	folderId: number | null;
	status: number;
}

export const useUpdateTaskForm = (oldTask: Task | null) => {
	const {
		register,
		formState: { errors },
		setError,
		handleSubmit,
		reset,
		control,
	} = useForm<FormData>({ mode: 'onSubmit' });

	const auth = useAuth();

	const tryUpdateTask = (data: FormData) => {
		if (oldTask != null) {
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

			console.log('UPDATE TASK');

			console.log(task);

			reset();
		} else throw Error('Old task is null');
	};

	const tryAddTask = (data: FormData) => {
		const task: Task = {
			Name: data.name,
			Description: data.description,
			ExpiryDate: data.expiryDate,
			FolderId: data.folderId,
			Status: data.status,
			isNotificated: false,
			ProfileId: auth?.user?.ProfileId,
		};

		console.log('NEW TASK');

		console.log(task);

		reset();
	};

	const onSubmitUpdate = handleSubmit(tryUpdateTask);
	const onSubmitAdd = handleSubmit(tryAddTask);

	const registerName = register('name', {
		value: oldTask?.Name ?? '',
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
		value: oldTask?.Description ?? '',
		maxLength: {
			value: 150,
			message: 'Описание слишком длинное',
		},
	});

	const registerExpiryDate = register('expiryDate', {
		value: oldTask?.ExpiryDate ?? new Date(),
	});

	const registerFolderId = register('folderId', {
		value: oldTask?.FolderId ?? -1,
	});

	const registerStatus = register('status', {
		value: oldTask?.Status ?? 0,
	});

	return {
		registerName,
		registerDescription,
		registerExpiryDate,
		registerFolderId,
		registerStatus,
		onSubmitUpdate,
		onSubmitAdd,
		errors,
		control,
	};
};
