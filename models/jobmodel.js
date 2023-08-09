const mongoose = require('mongoose');
const date = require('date-and-time');

const jobschema = new mongoose.Schema({
  searchIndex:String,
  companyName: {
    type: String,
    set: (v) => v.toLowerCase()
  },
  salary: {
    startAt: Number,
    endAt: Number,
    currency: String
  },
  salaryNumber: {
    type: Number,
    default: function () {
      return (this.salary.startAt + this.salary.endAt) / 2;
    }
  },
  category: {
    type: String,
    set: v => v.toLowerCase()
  },
  jobLevel: {
    type: String,
    set: v => v.toLowerCase()
  },
  employeeNo: Number,
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point'
    },
    coordinates: {
        type:[Number],
    },
    name:String
  },
  skills:[String],
  formDate:{
    startAt:{
      type:Number,
      set:(v)=>typeof v==='number'?v:Date.parse(v),
      default:Date.parse(new Date().toString())
    },
    endAt:{
      type:Number,
      set:(v)=>typeof v==='number'?v:Date.parse(v),
      required:[true,'please provide the enddate'],
      default:Date.parse(new Date().toString())
    },
    status:{  //it is for the automatic closed
      type:String,
      default:function (){
        const isit=this.formDate.startAt>Number(Date.parse(new Date().toString()))
        console.log(this.formDate.startAt)
        return isit?"pending":"open"
      }
    }
  },
  jobTime:{
    type:String
  },
  requirements:[String]
  
},{timestamps:true});

jobschema.index({ location: '2dsphere' }, function(err,noerr) {
  console.log(err,noerr);
});

const Job = mongoose.model('jobs', jobschema);
const deleteJob=mongoose.model('deletejobs', jobschema);
module.exports={
  Job,
  deleteJob
}



