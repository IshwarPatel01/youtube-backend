import mongoose , {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // plugin ki tarag inject hota hai // 2 hii phase hai
const videoScehema = new Schema(
    {
        videoFile: {
            type : String,
            required : true
        },
        thumbnail : {
            type : String , 
            required : true
        }
        ,
        title : {
            type : String , 
            required : true
        }
        ,
        description : {
            type : String , 
            required : true
        }
        ,
        duration : {
            type : Number ,  // duration aapko cloudinary se hi milega , cn jaise hi koi file upload karleta hai vaise hai hii appko info bhej deta hai, url behejga, fir hum url extract karege wahi se time bhejta hai ki video ka duration kitna hai, duration nikalege hum cloudinary se   
            required : true
        }
        , 
        views : {
            type : Number,
            default : 0
        },
        isPublished : {
            type : Boolean,
            default : true
        },
        owner : {
            type : Schema.Types.ObjectId,
            ref : "User"
        }


    }, {
        timestamps : true
    }
    //watch history field humare project complex bhi banata hai aur next level bhi banata hai
)
 
videoScehema.plugin(mongooseAggregatePaginate)                //aggrigation query // yehi humare project ko advance level pe lke jayega

export const Video = mongoose.model("Video", videoScehema)