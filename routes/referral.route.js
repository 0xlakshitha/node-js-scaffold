import { Router } from 'express'
import validationMiddleware from '../middleware/validation.middleware.js'
// import BookValidation from '../validation/book.validate.js'

// import BookContoller from '../controllers/book.controller.js'

const router = Router()

const path = '/referral'

router.get(`${path}`, (req, res) => {
    res.status(200).send('it workes')
})
// router.post('/', validationMiddleware(BookValidation.createSchema), BookContoller.createBook)

// router.get('/:id', BookContoller.getBookById)

// router.post('/author', validationMiddleware(BookValidation.authorSchema), BookContoller.getBookByAuthor)

// router.get('/', BookContoller.getAll)

// router.patch('/:id', validationMiddleware(BookValidation.updateSchema), BookContoller.updateBook)

// router.delete('/:id', BookContoller.deleteBook)

// router.post('/search', validationMiddleware(BookValidation.searchSchema), BookContoller.searchBook)

export default router