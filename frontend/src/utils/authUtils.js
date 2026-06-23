/** JWT payload에서 role 추출 (getMe 응답 보조용) */
export const getRoleFromToken = (token) => {
    if (!token) return null;
    try {
        const base64 = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
        if (!base64) return null;
        const payload = JSON.parse(atob(base64));
        return payload.role ?? null;
    } catch {
        return null;
    }
};

export const getEmailFromToken = (token) => {
    if (!token) return null;
    try {
        const base64 = token.split('.')[1]?.replace(/-/g, '+').replace(/_/g, '/');
        if (!base64) return null;
        const payload = JSON.parse(atob(base64));
        return payload.email ?? null;
    } catch {
        return null;
    }
};

/** getMe(DB) 우선, JWT는 보조 */
export const resolveUserRole = (user, token) => {
    const dbRole = user?.role;
    if (dbRole != null && String(dbRole).trim() !== '') {
        return String(dbRole).trim();
    }
    return getRoleFromToken(token);
};

export const isAdminRole = (role) => String(role || '').trim() === 'ADMIN';
