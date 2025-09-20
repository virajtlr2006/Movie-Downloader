const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        await mongoose.connect("mongodb+srv://virajtlr2006:virajtlr2006@viraj.g7haxve.mongodb.net/MonvieDownloader?retryWrites=true&w=majority&appName=viraj")

        console.log("MongoDB Connected Successfully")
    } catch (error) {
        console.log("COnnection Failed")
    }
}

module.exports = dbConnect