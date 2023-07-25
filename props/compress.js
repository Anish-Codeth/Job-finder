const sharp=require('sharp')
const path=require('path')

async function resizeImage(bufferdata){
    // const originalpath=path.resolve(__dirname,surl)
    // const destpath=path.resolve(__dirname,durl)
    return new Promise(async (resolve,reject)=>{
    
        try{
       const {width,height}=await sharp(bufferdata).metadata()
      const data= await sharp(bufferdata)
      .resize({
        width:Math.floor(width/2),
        height:Math.floor(height/2)
      }).
      toFormat('jpeg').
      jpeg({ mozjpeg: true })
      // .toFile(path.resolve(__dirname,'../','./logo/upload.Jpg'))
      resolve( data.toBuffer())
    }
    catch(err){
      reject('wrong commands ')
    }
  }
  )}

module.exports=resizeImage