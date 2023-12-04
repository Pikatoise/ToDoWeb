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
