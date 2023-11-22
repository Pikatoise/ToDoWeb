import Folder from '@/models/Folder';
import Profile from '@/models/Profile';
import Task from '@/models/Task';
import axios, { AxiosError } from 'axios';

// export const GetTasksByProfile = async (profile: Profile): Promise<Array<Task>> => {
// 	try {
//         const { data, status } = await axios.get<Array<Task>>(``)
// 	} catch (_e: any) {}
// };

export const GetTasksByProfile = (profile: Profile): Array<Task> => {
	var tasks = Array<Task>();

	for (let i = 0; i < 30; i++) {
		let task: Task = {
			Id: i,
			Name: `Task ${i + 1}`,
			FolderId: Math.floor(Math.random() * (4 - 1) + 1),
			Description: `Description of task dwdw fre wdwd${i + 1}`,
			ExpiryDate: new Date('2023-11-13'),
			Status: Math.floor(Math.random() * (2 - -1) + -1),
		};

		tasks.push(task);
	}

	return tasks;
};

export const GetTasksByProfileId = (profileId: number): Array<Folder> => {
	var tasks = Array<Task>();

	for (let i = 0; i < 30; i++) {
		let task: Task = {
			Id: i,
			Name: `Task ${i + 1}`,
			FolderId: Math.floor(Math.random() * (4 - 1) + 1),
			Description: `Description of task dwdw fre wdwd${i + 1}`,
			ExpiryDate: new Date('2023-11-13'),
			Status: Math.floor(Math.random() * (2 - -1) + -1),
			ProfileId: -1,
			isNotificated: Math.random() == 0,
		};

		tasks.push(task);
	}

	return tasks;
};
