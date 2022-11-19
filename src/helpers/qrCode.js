const qr = require("qrcode")
const ApiError = require("./ApiError");

const qrToImage = (data) => {
    const file = qr.toFile("qr.png", String(data), function (error) {
        if (error) {
            throw new ApiError(500, "error converting string to qr image")
        }
        const root = path.dirname(require.main.filename)
        const image_path = root + "/qr.png"

    })
}

module.exports = qrToImage