const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Data=require('../models/datamodel')

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'please provide the email'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'please provide the password']
  },
  fullName:{
      type:String,
  },
  completed: {
    type: Number,
  },
  userName:{
    type:String
  },
  DOB:{
    type:String,
  },
  coverLetter:{
    data:Buffer,
    contentType:String
  },
  photo:{
    data:Buffer,
    contentType:String
  },
  cv:{
    data:Buffer,
    contentType:String
  },
  skills:[String],//chip
  location: {
    type:[Number,Number] 
  },
  education:{
    type:String  //dropdown
  }, 
  experience:{
    type:String, //dropdown 
  }
}, { timestamps: true });

// Move the counting function inside the userSchema.statics object
userSchema.statics.counting = function (dict) {
    let count = 0;
    for (x in dict) {
      if (dict[x] instanceof Object)
          {
            if(typeof dict[x].contentType==='string')
            count++;
            else
        count = count + this.counting(dict[x]);

           } // Use "this.counting" to call the static method
      else
        count += 1;
    }
    return count;
  }
  userSchema.post('findOneAndUpdate', function (docs) {
    docs.completed=(docs.constructor.counting(docs.toObject())-1)/10
  });



userSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  this.completed = this.constructor.counting(this.toObject())/ 13; // Use "this.constructor.counting" to call the static method
});


//to comapare the data if it exists
userSchema.pre('save',async function()
{
const x=['education','experience','skills']

for (let y in x){
const data=await Data.find({})
if(data.length==0 && !data[y].includes(this[y]))
{
  const dataedu=data[y]
  dataedu.push(this[y])
  let a={
    y:dataedu
  }
  await Data.findOneAndUpdate({y},{y:dataedu})

}
}
})

module.exports = mongoose.model('User', userSchema);
