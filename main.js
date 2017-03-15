import request from './src/request';
import cache from './src/cache';

const requests = {};

// DEPRECATED: use the secure session, via getSessionId
const getCookie = () => {
	return (/FTSession=([^;]+)/.exec(document.cookie) || [null, ''])[1];
};

const getSessionId = () => {
	const [, sessionId] = /FTSession_s=([^;]+)/.exec(document.cookie) || [];
	return sessionId;
};

const getUuid = () => {
	const cachedUUID = cache('uuid');
	if (cachedUUID) {
		return Promise.resolve({ uuid: cachedUUID });
	}

	const sessionId = getSessionId();
	if (!sessionId) {
		return Promise.resolve({ uuid: undefined });
	}

	if (!requests.uuid) {
		// pull out the session id from the FTSession_s cookie
		requests.uuid = request(`/sessions/s/${sessionId}`)
			.then(({ uuid } = {}) => {
				delete requests.uuid;
				if (uuid) {
					cache('uuid', uuid);
				}
				return { uuid };
			});
	}

	return requests.uuid;
};

const getProducts = () => {
	const cachedProducts = cache('products');
	const cachedUUID = cache('uuid');
	if (cachedProducts && cachedUUID){
		return Promise.resolve({ products: cachedProducts, uuid: cachedUUID });
	}

	if (!requests.products) {
		requests.products = request('/products')
			.then(( { products, uuid } = {}) => {
				delete requests.products;
				if (products) {
					cache('uuid', uuid);
				}
				if (uuid) {
					cache('uuid', uuid);
				}
				return { products, uuid };
			});
	}

	return requests.products;
};

// DEPRECATED: use getUuid, will only return a uuid if session is valid
const validate = () => {
	return getUuid()
		.then(response => response ? true : false);
};

export {
	getUuid as uuid,
	getProducts as products,
	validate,
	cache,
	getCookie as cookie,
	getSessionId as sessionId
};
