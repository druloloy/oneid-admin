const setLocalUser = (id) => {
    const obj = {   
        id,
    }
    localStorage.setItem('_u', JSON.stringify(obj));
}

const getLocalUser = () => {
    const user = localStorage.getItem('_u');
    return user ? JSON.parse(user) : null;
}

const removeLocalUser = () => {
    localStorage.removeItem('_u');
}

const setLocalSession = (session) => {
    const user = getLocalUser();
    if(user) {
        const obj = {   
            ...user,
            session,
        }
        localStorage.setItem('_u', JSON.stringify(obj));
    }
}

const getLocalSession = () => {
    const user = getLocalUser();
    return user ? user.session : null;
}

const TokenService = {
    setLocalUser,
    getLocalUser,
    removeLocalUser,
    setLocalSession,
    getLocalSession,
};

export default TokenService; 