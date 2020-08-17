/********  RENDU DE LA PAGE D'ACCUEIL *********/

const express = require('express')
const router  = express.Router()
const shopController = require('../controllers/shop')

router.get('/', shopController.getIndex)
router.get('/panier', shopController.getCart)
router.get('/product/:id', shopController.getProductDetail)
router.post('/ajouter-au-panier', shopController.postCart)


module.exports = router