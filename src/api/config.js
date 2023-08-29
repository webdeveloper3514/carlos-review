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

const makeApiCall = async ({method, endpoint, data = null, headers = {}, ...rest }) => {
	return new Promise((resolve, reject) => {
		api({
			method,
			url: endpoint,
			data,
			headers,
			...rest,
		}).then((res) => {
            if (res.data) {
                resolve(res.data);
            }
        }).catch((err) => {
            handleApiError(err);
            reject(err);
        });
	});
};

export default makeApiCall;

//example to how to make this api call
// useEffect(() => {
//   makeApiCall({
//     method: 'GET',
//     endpoint: '/data',
//   })
//     .then(responseData => {
//       setData(responseData);
//     })
//     .catch(error => {
//       setError(error.message);
//     });
// }, []);
