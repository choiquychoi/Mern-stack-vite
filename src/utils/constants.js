let apiRoot = ''
if (import.meta.env.VITE_BUILD_MODE === 'dev') {
    apiRoot = 'http://localhost:8017'
}
if (import.meta.env.VITE_BUILD_MODE === 'production') {
    apiRoot = 'https://trello-api-jhwf.onrender.com'
}

export const API_ROOT = apiRoot
