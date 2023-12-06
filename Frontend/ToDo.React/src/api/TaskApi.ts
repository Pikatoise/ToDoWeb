import Folder from '@/models/Folder';
import Profile from '@/models/Profile';
import Task from '@/models/Task';
import axios, { AxiosError } from 'axios';

export const GetTasksByProfileId = async (profileId: number, callBack: (tasks: Task[]) => void) => {
	try {
		await axios
			.get<Array<Task>>(`http://localhost:5038/api/Task/profileId=${profileId}`)
			.then((v) => callBack(v.data));
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};

export const RemoveTaskById = async (taskId: number, callBack: (status: number) => void) => {
	try {
		await axios.delete<number>(`http://localhost:5038/api/Task/Delete/${taskId}`).then((v) => callBack(v.status));
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};

export const RemoveTasksByFolderId = async (folderId: number, callBack: (count: number) => void) => {
	try {
		await axios
			.delete<number>(`http://localhost:5038/api/Task/Delete/folderId=${folderId}`)
			.then((v) => callBack(v.data));
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};

export const RemoveManyTasksById = async (tasksId: number[], callBack: () => void) => {
	try {
		await axios
			.delete(`http://localhost:5038/api/Task/Delete`, { data: { Tasks: tasksId } })
			.then(() => callBack());
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};

export const CreateNewTask = async (task: Task, callBack: () => void) => {
	try {
		await axios
			.post(
				`http://localhost:5038/api/Task/Create`,
				{
					Name: task.Name,
					Description: task.Description,
					ExpiryDate: task.ExpiryDate,
					ProfileId: task.ProfileId,
					FolderId: task.FolderId,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Accept: 'application/json',
					},
				}
			)
			.then(() => callBack());
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};
