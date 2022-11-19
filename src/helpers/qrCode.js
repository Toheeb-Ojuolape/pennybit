const qr = require("qrcode")
const cloudinary = require("cloudinary")
const ApiError = require("./ApiError");

const qrToImage = (data, userId) => {
    const url = qr.toDataURL(data)
    const file = qr.toFile(`${userId}_.png`, String(data), function (error) {
        if (error) {
            throw new ApiError(500, "error converting string to qr image")
        }
        const root = path.dirname(require.main.filename)
        const image_path = root + "/qr.png"

    })
}

const generateQrCodeUrl = async (text) => {
    const url = await qr.toDataURL(text)
    return url
}

const uploadBase64ToCloudinary = async (text) => {
    try {
        const qrcodeUrl = await generateQrCodeUrl(text)
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        const { uploader } = cloudinary
        const res = await uploader.upload(qrcodeUrl)
        return res.secure_url
    } catch (error) {
        throw new ApiError(error.code || 500, error.message || error)
    }
}

module.exports = {
    qrToImage,
    generateQrCodeUrl,
    uploadBase64ToCloudinary
}