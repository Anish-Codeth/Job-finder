const sharp=require('sharp')
const path=require('path')


    const originalpath=path.resolve(__dirname,'./uncompressphoto/upload.Jpg')
    // const destpath=path.resolve(__dirname,durl)
    async function a(){
        try{
            console.log(originalpath)
       const {width,height}=await sharp(originalpath).metadata()
      const data= await sharp(originalpath)
      .resize({
        width:Math.floor(width/2),
        height:Math.floor(height/2)
      }).
      toFormat('jpeg').
      jpeg({ mozjpeg: true })
      .toFile(path.resolve(__dirname,'./logo/upload.Jpg'))
      console.log('hi')
    }
    catch(err){
        console.log(err)
    }
}
a()


