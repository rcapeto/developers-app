export const apiRoutes = {
	account: {
		register: '/account/register',
		login: '/account/login'
	},
	developer: {
		me: '/developer/me',
		all: '/developers',
		findOne: (developerId: string) => `/developers/${developerId}`,
	},
	publication: {
		all: '/publications',
		findOne: (publicationId: string) => `/publications/${publicationId}`,
		create: '/publications/create',
	}
};