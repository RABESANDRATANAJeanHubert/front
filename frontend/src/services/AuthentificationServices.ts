// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Api from './Api';

export default({
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        register(credentials: any){
        return Api().post('register', credentials)
    }
})