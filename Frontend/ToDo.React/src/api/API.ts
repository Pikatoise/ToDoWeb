import axios from 'axios';

export const GetApiStatus = async (): Promise<boolean> => {
	try {
		await axios.get('http://localhost:5038/api/Status');

		return true;
	} catch (error) {
		console.log(error);

		return false;
	}
};
