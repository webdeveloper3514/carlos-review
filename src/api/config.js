import axios from "axios";

const api = axios.create({});

const handleApiError = (error) => {
	if (error.response) {
		throw new Error(error.response.data.message || "An error occurred");
	} else if (error.request) {
		throw new Error("No response received from the server");
	} else {
		throw new Error("An error occurred while setting up the request");
	}
};

const makeApiCall = async ({ method, endpoint, data = null, headers = {}, ...rest }) => {
	try {
		const res = await api({
			method,
			url: endpoint,
			data,
			headers,
			...rest,
		});

		if (res.data) {
			return res.data;
		}
	} catch (err) {
		handleApiError(err);
		throw err;
	}
};

export default makeApiCall;

