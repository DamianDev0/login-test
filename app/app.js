import {Router} from './Router'
const cors = require('cors')



export function App(){
    const root = document.getElementById('root')

    if(!root){
        throw new Error('Cannot find root')
    }
    Router()
}


