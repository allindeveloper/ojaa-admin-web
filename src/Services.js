export const Service = (baseUrl, Axios, token) => {
	//let tkEncrypt = JSON.parse(localStorage.getItem("OJAA_"))
    const instance = Axios.create({
		baseURL: baseUrl,
		headers: { 'Authorization': token }
		// you can add other headers here which has been passed from AuthorizedLayout as arguments
	});

	const getApiUrl = (controller, action) => {
		return `${controller}/${action}/`;
	}

	const getRestUrl = (controller, action) => {
		return `${controller}/${action}`;
	}

	const getApiv1Url = (controller) => {
		return `${controller}`;
	}

	const getAllItems = (controller, action, data) => {
		return instance.post(getApiUrl(controller, action), data);
	}

	const createProduct = (controller, data) => {
		return instance.post(getApiv1Url(controller), data);
	}
	const updateProduct = (controller,data,id) => {
		return instance.put(`${getApiv1Url(controller)}/${id}`,data);
	}
	const updateOrder = (controller,action,orderid,data) => {
		return instance.post(`${getRestUrl(controller,action)}/${orderid}`,data);
	}

	const confirmOrder  =(controller, data) => {
		return instance.post(getApiv1Url(controller), data);
	}

	const getCompletedOrders = (controller, action, pageNumber) => {
		return instance.get(`${getRestUrl(controller, action)}?page=${pageNumber}`);
	}

	const getActiveOrders = (controller, action, pageNumber) => {
		return instance.get(`${getRestUrl(controller, action)}?page=${pageNumber}`);
	}

	const getProducts = (controller, pageNumber) => {
		return instance.get(`${getApiv1Url(controller)}?page=${pageNumber}`);
	}

	const getUsers = (controller, pageNumber) => {
		return instance.get(`${getApiv1Url(controller)}?page=${pageNumber}`);
	}

	const getTopCustomers= (controller, action) => {
		return instance.get(`${getRestUrl(controller, action)}`);
	}
	const getItems = (controller, actoion) => {
		return instance.get(getApiUrl(controller,actoion));
	}

	const createItem = (data, controller, action) => {
		return instance.post(getApiUrl(controller, action), data);
	}
	const editItem = (controller,data,id) => {
		return instance.put(`${getApiv1Url(controller)}/${id}`,data);
	}

	const deleteProduct = (controller,action,data,id) => {
		return instance.delete(`${getApiUrl(controller,action)}${id}`,{data});
	}

	const updateRole = (data, controller, action) => {
		return instance.put(getApiUrl(controller, action), data);
	}

	const userLogin = (data, controller) => {
		return instance.post(getApiv1Url(controller), data);
	}

	const getUserById = (controller,id) => {
		return instance.get(`${getApiv1Url(controller)}/${id}`);
	}


	const createItemV1 = (data, controller) => {
		return instance.post(getApiv1Url(controller), data);
	}

	// all other api service functions can be created here which is then accessible to other routes and components in the Authorized Layout


	return {
		deleteProduct,
		updateProduct,
		getUsers,
		updateOrder,
		confirmOrder,
		updateRole,
		createProduct,
		getCompletedOrders,
		getProducts,
		getActiveOrders,
		getAllItems,
		createItem,
		userLogin,
		getTopCustomers,
		editItem,
		getItems,
		getUserById,
		createItemV1
	}

}

