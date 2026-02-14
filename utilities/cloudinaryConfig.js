const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')
    // Configuration
    cloudinary.config({ 
        cloud_name: "doguuil48", 
        api_key: "835279789187353", 
        api_secret: "O_g_uwsr6YxG73lDqL9aLxGEcJw" // Click 'View API Keys' above to copy your API secret
    });
// upload image to cloudinary
      const uploadToCloudinary = (bufferImage) => {
      const base64 = bufferImage.toString('base64');
      const dataURI = `data:image/jpeg;base64,${base64}`;
      return cloudinary.uploader.upload(dataURI, {
        folder: 'bloggerdaily',
        resource_type: 'image',
        });
};




    module.exports = {uploadToCloudinary}