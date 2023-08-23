import User from '@/models/User';

export const useSession = () => {
	const userSession: User | null = {};

	const createSession = (newUser: User) => {};

	const clearSession = () => {};

	return { userSession, createSession, clearSession };
};
