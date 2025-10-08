export const unAuthUser = (navigate, message = "Ups, sesi kamu udah kedaluwarsa. Coba login ulang, yuk!") => {
    localStorage.removeItem('token')
    return navigate('/login', { 
        replace : true,
        state: {
            error: message
        }
    })
}