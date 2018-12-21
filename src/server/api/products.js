import {Router} from 'express'
import fetch from 'node-fetch'
import qs from 'querystring'
import {getToken} from '../lib/token' 
import {productsList} from './productList'

const router = new Router()


router.get('/products', async (req, res, next) => {
  try{
    res.status(200).json({
      "data":  await productsList()
    })
  }
  catch(error){
    res.json({error})
  }

})


export default router
