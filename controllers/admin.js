const Product = require('../models/Product')


const getIndex = (req, res) =>{
   const titre ='admin'
  // const EspaceAdmin = 'Espace Admin'
  res.render('admin', {title: titre, admin: true})
  }
  const postIndex = (req, res) =>{
     const {name, description, image, prix} = req.body
     const newProduct = new Product(name, description, image, prix) 
          newProduct.save(() =>{
            res.redirect('/')
          })
    
  }
  module.exports ={
     getIndex: getIndex,
     postIndex: postIndex
   } 