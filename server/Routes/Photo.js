const express = require('express');
const { uploadPhoto, fetchPhotos, fetchSinglePhoto } = require('../controllers/Photo');
const router  =express.Router();

router.get("/getPhoto",fetchPhotos); 
router.post("/putPhoto",uploadPhoto);
router.post("/singlePhoto", fetchSinglePhoto);  

module.exports = router;