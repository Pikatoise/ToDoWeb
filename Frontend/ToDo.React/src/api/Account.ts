import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { error } from 'console';
import { useState } from 'react';

type AuthResponse = {
	id: number;
	status: number;
};

export const AuthUser = async (login: string, password: string): Promise<AuthResponse> => {
	try {
		const { data, status } = await axios.get<number>(`http://localhost:5038/api/Account/${login}&${password}`);

		return { id: data, status: status };
	} catch (_e: any) {
		const e: AxiosError = _e;

		return { id: -1, status: e.response?.status ?? 404 };
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
