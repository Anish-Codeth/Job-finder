const createcode=(data)=>{
        data=data.split('.')[2].split('').filter(x=>!isNaN(Number(x))).join('')
        const Length=data.length
        if(Length>6){
        data=data.slice(0,6)
        }
        else if(Length<6)
        {
        for(let x=1;x<=6-Length;x++)
        {
            data=data+'0'
        }
        }

        return data
        }
module.exports=createcode