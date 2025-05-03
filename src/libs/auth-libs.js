export const setTokenAction = (token) => {
    localStorage.setItem('token', token)
}

export const getTokenAction = () => {
    return localStorage.getItem('token') ?? null
}