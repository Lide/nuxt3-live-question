export default defineNuxtRouteMiddleware(async (to, from) => {
	const nuxtApp = useNuxtApp();
	if (process.client && nuxtApp.isHydrating && nuxtApp.payload.serverRendered) {
		return;
	}
	
	// 檢查 token 是否有值
	const token = useCookie("auth");
	if (!token.value) return navigateTo("/login");

	console.log("auth token ok.");

	const userInfo = await $fetch(
		"https://nuxr3.zeabur.app/api/v1/user/check",
		{
			method: "GET",
			headers: {
				authorization: `${token.value}`
			}
		}
	).catch((err) => {
		console.log(err);
		return navigateTo("/login");
	});

	console.log("auth user info:", userInfo);

	if (userInfo?.status !== undefined){
		return null;
	}

	return navigateTo("/login");

})