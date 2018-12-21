
import path from 'path'
import express from 'express'
import {urlencoded, json} from 'body-parser'
import router from './router'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import connectRedisStore from 'connect-redis'

import getRoutes from '../common/routes/config'
import api from './api'

const {
	REDIS_HOST = 'localhost',
	REDIS_PORT = '6500',
	SESSION_TIMEOUT = '500',
	SESSION_SECRET = 'some secured key'
} = process.env

const RedisStore = connectRedisStore(session)

// todo - fetch from service
async function getTranslations () {
	return {
		'en': {
			'MOSTG': 'MOSTG SHOPPING CART',
			'MOSTG.WELCOME': 'Welcome to MostG Cart',
			'NOT-FOUND': 'couldnt find it!'
		}
	}
}

export default async () => {
	const app = express()
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')
	app.use('/assets', express.static('dist/client'))
	app.use(urlencoded({extended: false}))
	app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
 });
	app.use(json())
	app.use(cookieParser())
	app.use(session({
		resave: true,
		saveUninitialized: false,
		secret: SESSION_SECRET,
		store: new RedisStore({
			host: REDIS_HOST,
			port: parseInt(REDIS_PORT, 10),
			ttl: parseInt(SESSION_TIMEOUT, 10)
		})
	}))

	app.locals.messages = await getTranslations()
	app.locals.routes = await getRoutes()

	app.use('/api', api)
	app.get('*', router)
	return app
}
