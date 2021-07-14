const useToken = () => {
    if (!localStorage.getItem('token')) {
        window.location('/login')
    }
}

export default useToken;