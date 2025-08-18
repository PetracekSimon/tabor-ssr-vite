export default [
    //! user: start
    {
        path: '/api/user/login',
        method: 'post',
        roles: ['Public'],
    },
    {
        path: '/api/user/updatePassword',
        method: 'patch',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/user/register',
        method: 'post',
        roles: ['SuperAdmin'],
    },
    {
        path: '/api/user/list',
        method: 'get',
        roles: ['SuperAdmin'],
    },
    {
        path: '/api/user/checkToken',
        method: 'get',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/user/',
        method: 'patch',
        roles: ['SuperAdmin'],
    },
    {
        path: '/api/user/',
        method: 'delete',
        roles: ['SuperAdmin'],
    },
    //! user: end
    //! folder: start
    {
        path: '/api/folder/',
        method: 'post',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/folder/',
        method: 'patch',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/folder/setVisibility',
        method: 'patch',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/folder/',
        method: 'delete',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/folder/list',
        method: 'get',
        roles: ['Public'],
    },
    {
        path: '/api/folder/getImagesForGalleryPage',
        method: 'get',
        roles: ['Public'],
    },
    {
        path: '/api/folder/',
        method: 'get',
        roles: ['Public'],
    },
    //! folder: end
    //! image: start
    {
        path: '/api/image/',
        method: 'post',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/image/',
        method: 'delete',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/image/list',
        method: 'get',
        roles: ['Public'],
    },
    {
        path: '/api/image/thumbnail/:id',
        method: 'get',
        roles: ['Public'],
    },
    {
        path: '/api/image/:id',
        method: 'get',
        roles: ['Public'],
    },
    {
        path: '/api/image/changeFolder',
        method: 'patch',
        roles: ['SuperAdmin', 'Admin'],
    },
    {
        path: '/api/image/updateDescription',
        method: 'patch',
        roles: ['SuperAdmin', 'Admin'],
    },
    //! image: end
];
