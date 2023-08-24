import User from '@/models/User';
import { useEffect, useState } from 'react';

export const useSession = () => {
	const getSession = (): User | null => {
		if (localStorage.length == 0) return null;

		const localUser = {
			Id: Number.parseInt(localStorage.getItem('Id') ?? '-1'),
			Login: localStorage.getItem('Login'),
			Password: localStorage.getItem('Password'),
			ProfileId: Number.parseInt(localStorage.getItem('ProfileId') ?? '-1'),
		};

		console.log(localUser);

		return localUser;
	};

	const createSession = (newUser: User) => {
		localStorage.setItem('Id', `${newUser.Id}`);
		localStorage.setItem('Login', newUser.Login ?? 'null');
		localStorage.setItem('Password', newUser.Password ?? 'null');
		localStorage.setItem('ProfileId', `${newUser.ProfileId}`);
	};

	const clearSession = () => {
		localStorage.clear();
	};

	return { getSession, createSession, clearSession };
};
