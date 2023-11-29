import User from '@/models/User';
import axios, { AxiosError } from 'axios';

type AuthResponse = {
	user: User;
	status: number;
};

export const AuthUser = async (login: string, password: string, callBack: (user: User, status: number) => void) => {
	try {
		await axios
			.get<User>(`http://localhost:5038/api/Account/${login}&${password}`)
			.then((v) => callBack(v.data, v.status));
	} catch (error) {
		console.log(error);
	}
};

export const RegUser = async (login: string, password: string): Promise<number> => {
	try {
		const { status } = await axios.post(
			`http://localhost:5038/api/Account/Create`,
			{
				Login: login,
				Password: password,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					Accept: 'application/json',
				},
			}
		);

		return status;
	} catch (_e: any) {
		const e: AxiosError = _e;

		return e.response?.status ?? 409;
	}
};
