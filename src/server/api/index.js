import {Router} from 'express'
import products from './products'
 
const router = new Router()
router.use('/', products)


export default router
