const fs = require('fs');
const path = require('path')
const appDir = path.dirname(require.main.filename)
const p = path.join(appDir, 'data', 'cart.json')


class Cart{
    static add(id, productPrix, callback){
       fs.readFile(p, (err, fileContent) =>{
        let cart = {product:[], totalPrix:0}
        if(!err){
            cart = JSON.parse(fileContent)
        }
    
            const existingProductIndex =  cart.product.findIndex(prod => prod.id === id)
            const existingProduct = cart.product[existingProductIndex]   
            
            if(existingProduct){
              // si le produit exist, on modifie sa quantite  
              cart.product[existingProductIndex].qty = cart.product[existingProductIndex].qty + 1;
            } else{
                // si il le produit n'exist pas, on l'ajoute au panier 
                cart.product.push({id: id, qty: 1})
            }

            cart.totalPrix = cart.totalPrix + +productPrix//(+productPrix permet de convertir une chaine en number)
     
            fs.writeFile(p, JSON.stringify(cart), err =>{
                if(err){
                    console.log(err);
                }
                callback()
             })
          }) 
         }

          static getCart(callback){
            fs.readFile(p, (err, fileContent)=>{
                let cart = {product: [], totalPrix: 0}
               if(!err){
                   cart = JSON.parse(fileContent)
               }
               callback(cart)
              })
            }
         }


module.exports = Cart
