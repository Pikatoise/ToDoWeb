import User from '@/models/User';

const useSession = () => {
	const getSession = (): User | null => {
		if (localStorage.length == 0) return null;

		const localUser = {
			Id: Number.parseInt(localStorage.getItem('Id') ?? '-1'),
			Login: localStorage.getItem('Login'),
			Password: null,
			ProfileId: Number.parseInt(localStorage.getItem('ProfileId') ?? '-1'),
		};

		return localUser;
	};

	const createSession = (newUser: User) => {
		localStorage.setItem('Id', `${newUser.Id}`);
		localStorage.setItem('Login', newUser.Login ?? 'null');
		localStorage.setItem('ProfileId', `${newUser.ProfileId}`);
	};

	const clearSession = () => {
		localStorage.clear();
	};

	return { getSession, createSession, clearSession };
};

export default useSession;
