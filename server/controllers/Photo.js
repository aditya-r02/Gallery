const Photo = require('../models/Photo');
const cloudinary = require('cloudinary').v2

exports.uploadPhoto = async(req, res) =>{
    try{
        const {title, description} = req.body;

        const {photo} = req.files;
        //console.log(photo);
        //console.log(title+" "+description)

        if (!title || !description || !photo){
            return res.status(400).json({
                success: false,
                message:"Enter complete details"
            })
        }

        let image;
        try{
            image = await cloudinary.uploader.upload(photo.tempFilePath, {folder:"gallery"})

        }catch(error){
            console.log(error)
            return res.status(500).json({
                success: false,
                message: "Photo Upload failed!"
            })
        }
        const url = image.secure_url;

        const result = await Photo.create({title, description, url});

        return res.status(200).json({
            success: true,
            message: "Photo uploaded successfully",
            result
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Some error ocurred"
        })
    }
}

exports.fetchPhotos = async(req, res) =>{
    try{
        const result = await Photo.find({}).sort({createdAt:'desc'});

        return res.status(200).json({
            success: true,
            message: "Images fetched successfully",
            result
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Some Error occured during fetching, try again later"
        })
    }
}

exports.fetchSinglePhoto = async(req, res) =>{
    try{
        const {id} = req.body;
        //console.log(id)
        const result = await Photo.findById(id);

        if (result==null){
            return res.status(400).json({
                success: false,
                message: "Photo does not exists"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Photo fetched successfully!",
            result
        })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}