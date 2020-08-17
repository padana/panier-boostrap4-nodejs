const fs = require('fs');
const path = require('path')
const uuid = require('uuid');
const { v1: uuidv1 } = require('uuid')
const appDir = path.dirname(require.main.filename)

const p = path.join(appDir, 'data', 'product.json')

class Product{
   constructor(name, description, image, prix){
       this.name = name,
       this.description =  description,
       this.image = image,
       this.prix = prix
    }
   save(callback){
    this.id = uuidv1()
    fs.readFile(p, (err, fileContent) =>{
        let product = []
        if(!err){
         product = JSON.parse(fileContent)
        }
        product.push(this)
        fs.writeFile(p, JSON.stringify(product), err =>{
           if(err){
               console.log(err);
           }
           callback()
        })
       }) 
      }
   static findAll(callback){
        fs.readFile(p, (err, fileContent) =>{
            if(err){
                callback([])
            } else {
                callback(JSON.parse(fileContent))
            }
        })
    }
   static findById(id, callback){
    fs.readFile(p, (err, fileContent)=>{
       const product = JSON.parse(fileContent).find(prod => prod.id === id)
       callback(product);
       
    })
   }

   
}
module.exports = Product