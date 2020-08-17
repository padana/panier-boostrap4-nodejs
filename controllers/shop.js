const Product = require('../models/Product')
const  Cart = require('../models/Cart')


const getIndex = (req, res) =>{
  Product.findAll(product =>{
    const titre = 'accueil'
    res.render('index',  { title: titre, admin: false, product: product})
   
    
  })
}

const getProductDetail = (req, res) =>{
 Product.findById(req.params.id, product =>{
   console.log(product);
   
   res.render('product-detail', {
     title: product.name,
     product: product,
     admin: false
   })
 })  
}


const getCart = (req, res) =>{
  Cart.getCart(cart =>{
   if(cart.product.length > 0){
    Product.findAll(product =>{
      let cartProduct = []
      
      product.forEach(product => {
        const productData = cart.product.find(prod => prod.id === product.id)
        if(productData){
          cartProduct.push({product: product, qty: productData.qty})
        }
      });
  
      console.log(cartProduct);
    
      const Panier = 'panier'
      res.render('cart', {
        title: Panier, 
        admin: false,
         cartProduct: cartProduct,
         totalPrix: cart.totalPrix,
         hasProduct: true
        })
     })
   } else {

    const Panier = 'panier'
    res.render('cart', {
      title: Panier, 
      admin: false,
     hasProduct: false
      })

   }


  })
  
}

const postCart = (req, res) =>{
    Product.findById(req.body.productId, product =>{
    Cart.add(req.body.productId,  product.prix, () =>{
        res.redirect('/panier')
    })
  })
  
}
module.exports ={getIndex: getIndex, getCart: getCart,  getProductDetail: getProductDetail, postCart: postCart} 