import axios, { AxiosError } from 'axios';
import { error } from 'console';
import { useState } from 'react';

type AuthResponse = {
	id: number;
	error: string | null;
	status: number;
};

export const AuthUser = async (login: string, password: string): Promise<AuthResponse> => {
	try {
		const { data, status } = await axios.get<number>(`http://localhost:5038/api/Account/${login}&${password}`);

		return { id: data, error: null, status: 200 };
	} catch (e) {
		if (axios.isAxiosError(e)) {
			console.log('error message: ', e.message);
			return { id: -1, error: e.message, status: e.status ?? 404 };
		} else {
			console.log('unexpected error: ', e);
			return { id: -1, error: e as string, status: 999 };
		}
	}
};
