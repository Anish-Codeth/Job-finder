const mongoose = require('mongoose');
const date = require('date-and-time');

const dataschema = new mongoose.Schema({
education:{
    type:[String],
    default: ['High School','Associate Degree',"Bachelor's Degree", "Master's Degree",'Doctorate Degree','Vocational Certificate','Diploma','Professional Degree','Technical Degree','Postdoctoral Degree','Non-Degree Education','Other']
},
experience:{
    type:[String],
    default:function (){
        const a=[]
       for (let x=0;x<70;x++){
          a.push(`${x}-${x+1}y`)
       }
       return a;
 },
},
skills:{
    type:[String],
    default:['js','python','node.js','teaching','bus driving','car driving','pilot','cleaning','linux','flutter','unity','c#','go']
}
},{timestamps:true})


module.exports=mongoose.model('Data',dataschema)