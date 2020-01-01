var express = require('express');
var router = express.Router();
const CategoryModel = require('../models/Category')
const ProductModel = require('../models/Product')

const API = {}

async function createCategory(req, res, next){
    try {
        const postData = req.body  
        const resu = {status:false,message:'Failed to create category.'}
        const categoryData = {
            categoryName: postData.categoryName
        }
        const result = await CategoryModel.create(categoryData)
        if(result){
            resu.status = true
            resu.message = 'Created Successfuly.'
        }
        res.send(resu)
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message:'Failed to create category.'
        })
    }
}

async function getCategories(req, res, next){
    try {
        const resu = {status:false,message:'Failed to create category.', data:[]}

        const result = await CategoryModel.find({})

        if(result.length > 0){
            resu.status = true
            resu.message = ''
            resu.data = result
        }
        res.send(resu)
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message:'Failed to get category.',
            data:[]
        })
    }
}

async function deleteCategory(req, res, next){
    try {
        const postData = req.body  
        const resu = {status:false,message:'Failed to remove category.'}
        const mongoose = require('mongoose');
        const id = mongoose.Types.ObjectId(postData._id)
        
        const result = await CategoryModel.remove({_id:id})
        if(result){
            const result1 = await ProductModel.remove({categoryId:id})
            resu.status = true
            resu.message = result1.deletedCount+ ' records removed successfuly.'
            resu.deletedCount = result1.deletedCount
        }
        res.send(resu)
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message:'Failed to create category.'
        })
    }
}

async function countNoOfProducts(req, res, next){
    try {
        const resu = {status:false,message:'Failed to create category.', data:[]}

        const result = await ProductModel.aggregate([
            {$group:{
                _id:"$categoryName", count:{ $sum:1 }
            }}
        ])
        if(result.length > 0){
            resu.status = true
            resu.message = ''
            resu.data = result
        }
        res.send(resu)
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message:'Failed to get category.',
            data:[]
        })
    }
}


async function createProduct(req, res, next){
    try {
        const postData = req.body 
        const resu = {status:false,message:'Failed to create product.'}
        const mongoose = require('mongoose');
        postData.categoryName = postData.categoryName.split('##')
        
        const id = mongoose.Types.ObjectId(postData.categoryName[0].toString())
        const productData = {
            categoryId: id,
            categoryName: postData.categoryName[1],
            product:postData.productName
        }
        const result = await ProductModel.create(productData)
        if(result){
            resu.status = true
            resu.message = 'Created Successfuly.'
        }
        res.send(resu)
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message:'Failed to create category.'
        })
    }
}

async function getProducts(req, res, next){
    try {
        const resu = {status:true,message:'', data:[]}

        const result = await ProductModel.find({})

        if(result.length > 0){
            resu.status = true
            resu.message = ''
            resu.data = result
        }
        res.send(resu)
    } catch (error) {
        console.log(error)
        res.send({
            status: false,
            message:'Failed to get category.',
            data:[]
        })
    }
}

router.post('/categories',  createCategory)
router.delete('/categories',  deleteCategory)
router.get('/categories',  getCategories)
router.get('/no-of-products', countNoOfProducts)

// product APIs
router.post('/create',  createProduct)
router.get('/select',  getProducts)


module.exports = router;