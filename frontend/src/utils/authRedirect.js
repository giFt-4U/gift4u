const AUTH_REDIRECT_KEY = 'auth_redirect';

export const buildAuthRedirectPath = (pathname, search = '') => {
    const path = `${pathname}${search}`;
    if (!path || path.startsWith('/login') || path.startsWith('/signup')) {
        return '/';
    }
    return path;
};

export const getRedirectFromSearch = (searchParams) => {
    const raw = searchParams?.get?.('redirect');
    if (!raw) return null;

    try {
        const decoded = decodeURIComponent(raw);
        if (decoded.startsWith('/') && !decoded.startsWith('//')) {
            return decoded;
        }
    } catch {
        return null;
    }
    return null;
};

export const getLoginPath = (redirectPath) => {
    if (!redirectPath || redirectPath === '/') {
        return '/login';
    }
    return `/login?redirect=${encodeURIComponent(redirectPath)}`;
};

export const stashAuthRedirect = (path) => {
    if (path && path !== '/') {
        sessionStorage.setItem(AUTH_REDIRECT_KEY, path);
    }
};

export const resolvePostAuthPath = (searchParams) => {
    return getRedirectFromSearch(searchParams) || sessionStorage.getItem(AUTH_REDIRECT_KEY) || '/';
};

export const clearAuthRedirect = () => {
    sessionStorage.removeItem(AUTH_REDIRECT_KEY);
};
