export default {
    Api: {
        apiUrl: 'http://erpnext.techlift.in',
    },
    showStatusBar: false,
    menu: {
        isMultiChild: true,
        listMenuUnlogged: [{
            text: 'Login',
            routeName: 'LoginScreen',
            params: {
                isLogout: false
            },
        }],
        // user logged in
        listMenuLogged: [{
            text: 'Logout',
            routeName: 'Custompage',
            params: {
                isLogout: true
            },
        }],
        // Default List
        listMenu: [{
            text: 'Projects ',
            routeName: 'Projects',
        },
        {
            text: 'Tasks ',
            routeName: 'Tasks',
        }
        ],
    },
}