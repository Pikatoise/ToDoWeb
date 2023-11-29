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
