import Folder from '@/models/Folder';
import Profile from '@/models/Profile';
import axios, { AxiosError } from 'axios';

export const GetFoldersByProfile = async (profileId: number): Promise<Array<Folder>> => {
	try {
		const { data } = await axios.get<Array<Folder>>(`http://localhost:5038/api/Folder/profileId=${profileId}`);

		return data;
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);

		return [];
	}
};

export const GetFoldersByProfileId = (profileId: number): Array<Folder> => {
	return Array<Folder>(
		{ Id: 1, Name: 'Работа', ProfileId: 1 },
		{ Id: 2, Name: 'Дом', ProfileId: 1 },
		{ Id: 3, Name: 'Хобби', ProfileId: 1 }
	);
};
