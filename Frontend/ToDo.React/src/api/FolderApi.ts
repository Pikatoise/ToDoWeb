import Folder from '@/models/Folder';
import Profile from '@/models/Profile';
import axios, { AxiosError } from 'axios';

// export const GetFoldersByProfile = async (profile: Profile): Promise<Array<Folder>> => {
// 	try {
//         const { data, status } = await axios.get<Array<Folder>>(``)
// 	} catch (_e: any) {}
// };

export const GetFoldersByProfile = (profile: Profile): Array<Folder> => {
	return Array<Folder>(
		{ Id: 1, Name: 'Работа', ProfileId: 1 },
		{ Id: 2, Name: 'Дом', ProfileId: 1 },
		{ Id: 3, Name: 'Хобби', ProfileId: 1 }
	);
};

export const GetFoldersByProfileId = (profileId: number): Array<Folder> => {
	return Array<Folder>(
		{ Id: 1, Name: 'Работа', ProfileId: 1 },
		{ Id: 2, Name: 'Дом', ProfileId: 1 },
		{ Id: 3, Name: 'Хобби', ProfileId: 1 }
	);
};
