const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_NAME, 
        api_key: process.env.CLOUDINARY_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });
// upload image to cloudinary
const uploadToCloudinary = (bufferImage) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { resource_type: "image" }, // Optional: specify resource type and other options
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    // streamifier.createReadStream(bufferImage).pipe(stream);
  });
};




    module.exports = {uploadToCloudinary}