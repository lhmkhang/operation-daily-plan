import React from 'react';
import { useSelector } from 'react-redux';
import { usePathname } from 'next/navigation';

function WithPageAccessControl(WrappedComponent) {
    function WithAccessControl(props) {
        const userInfo = useSelector(state => state.auth.userInfo);
        const userRoles = userInfo ? userInfo.roles.apps : [];
        // const router = useRouter();
        const currentPath = usePathname();
        const canAccessPage = userRoles.some(app => currentPath.includes(app));

        // console.log("currentPath:", currentPath);
        // console.log("userRoles:", userRoles);
        // console.log("canAccessPage:", canAccessPage);

        if (currentPath !== '/login' && currentPath !== '/') {
            if (!canAccessPage) {
                return <>Bạn không có quyền truy cập vào trang này</>;
            }
        }
        return <WrappedComponent {...props} />;
    };
    return WithAccessControl;
};

export default WithPageAccessControl;
