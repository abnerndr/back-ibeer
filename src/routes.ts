import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

// user
routes.post('/user', new UserController().create)
routes.post('/login', new UserController().login)
routes.get('/profile/:id', new UserController().getProfileById)
routes.get('/profile', new UserController().getProfile)
routes.put('/profile/:id', new UserController().updateProfile)
routes.delete('/profile/:id', new UserController().deleteProfile)
// user(reset_password)

routes.use(authMiddleware)



export default routes
