export const unAuthUser = (navigate) => {
    localStorage.removeItem('token')
    return navigate('/', { replace : true })
}