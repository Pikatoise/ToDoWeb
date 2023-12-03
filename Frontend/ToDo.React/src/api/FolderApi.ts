import Folder from '@/models/Folder';
import Profile from '@/models/Profile';
import axios, { AxiosError } from 'axios';

export const GetFoldersByProfileId = async (profileId: number, callBack: (folders: Folder[]) => void) => {
	try {
		await axios
			.get<Array<Folder>>(`http://localhost:5038/api/Folder/profileId=${profileId}`)
			.then((v) => callBack(v.data));
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};

export const AddFolderToProfile = async (profileId: number, folderName: string, callBack: (status: number) => void) => {
	try {
		await axios
			.post<number>(`http://localhost:5038/api/Folder/Create/profileId=${profileId}&name=${folderName}`)
			.then((v) => callBack(v.status));
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};

export const RemoveFolderById = async (folderId: number, callBack: (status: number) => void) => {
	try {
		await axios
			.delete<number>(`http://localhost:5038/api/Folder/Delete/${folderId}`)
			.then((v) => callBack(v.status));
	} catch (_e: any) {
		const e: AxiosError = _e;

		console.log(e);
	}
};
