const cookie = require('cookie')

export function requireAuth(gssp) {
    return async (context) => {
        const { req, res } = context
        if(req.headers.cookie){
            const cookies = cookie.parse(req.headers.cookie)
            if (!cookies.__token__) {
                return {
                    redirect: {
                        destination: '/login',
                    }
                }
            }
        }else{
            return {
                redirect: {
                    destination: '/login',
                }
            }
        }
     
        return await gssp(context)
    }
}
