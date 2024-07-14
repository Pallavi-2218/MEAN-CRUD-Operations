var express = require('express');
var router = express.Router();
var product = require('../modals/product');
const mongoose = require('mongoose');

//get method
router.get('/',(req,res)=>{
  product.find({})
  .then((data)=>res.json(data))
  .catch((err)=>console.log(err))
})

//add product
router.post('/add',(req,res)=>{
  var newProduct = new product(req.body);
  newProduct.save()
  .then(()=>res.end("Data added"))
  .catch((err)=>console.log(err))
  
})

//delete user
router.delete('/delete/:id',(req,res)=>{
  var productId = req.params.id;
  product.deleteOne({_id:productId})
  .then((re)=>{
    if(re.deletedCount>0){
      res.end("Data deleted")
    }
    else{
      res.end("Data not deleted")
    }
  })
  .catch((err)=>console.log(err))
})

//product update

router.put('/update/:id',(req,res)=>{
  productId = req.params.id;
  var updatedUser = req.body;
  product.updateOne({_id:productId},updatedUser)
  .then((re)=>{
    if(re.modifiedCount>0)
    {
      res.end("data updated")
    }
    else{
      res.end("data not saved")
    }
  })
  .catch((err)=>console.log(err))
})


//dynamic del

router.delete('/api/products', async (req, res) => {
  const ids = req.body.ids;
  try {
    await product.deleteMany({ _id: { $in: ids } });
    res.status(200).send({ message: 'Items deleted successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error deleting items', error });
  }
});

router.delete('/products', async (req, res) => {
  try {
      const ids = req.body.ids; // Assuming ids is an array of product IDs as strings
      console.log('Received IDs:', ids); // Log received IDs for debugging
      
      // Validate ids as array of valid ObjectId strings
      if (!Array.isArray(ids) || ids.some(id => !mongoose.Types.ObjectId.isValid(id))) {
          return res.status(400).json({ error: 'Invalid input: ids should be an array of valid ObjectId strings' });
      }

      await product.deleteMany({ _id: { $in: ids } });
      res.status(200).json({ message: 'Products deleted successfully' });
  } catch (error) {
      console.error('Error deleting products:', error); // Log error details for debugging
      res.status(500).json({ error: 'An error occurred while deleting products' });
  }
});

module.exports = router;
