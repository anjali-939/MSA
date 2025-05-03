export const getApiUrls = () => {
	const API_KEY = "edf96177";
	const apiPreFix = `https://www.omdbapi.com?apikey=${API_KEY}`;

	return {
		movieSearch: apiPreFix,
		movieDetail: apiPreFix
	};
};
