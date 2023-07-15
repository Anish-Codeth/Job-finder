const cron=require('node-cron')
const {Job,deleteJob}=require('../models/jobmodel')

//for pending to open
var task_p2o=cron.schedule('*/10 * * * * *',async ()=>{
const dates=Date.parse(new Date().toString())
try{
    const job=await Job.find({"formDate.status":"pending","formDate.startAt":{$lt:dates}
})

console.log('hi')
    job.forEach(async (element) => {
        await Job.findByIdAndUpdate({"_id":element._id},{"formDate.status":"open"})
    });
}
catch(err){
    console.log(err)
}
},{
    scheduled: false
  })

const task_delete=cron.schedule('*/10 * * * * *',async ()=>{
    const dates=Date.parse(new Date().toString())
    try{
        const job=await Job.find({"formDate.endAt":{$lt:dates}
    })
    
    job.forEach(async (element) => {
        await Job.findByIdAndDelete({"_id":element._id})
        const jobinfo=element.toObject()
        jobinfo.formDate.status="closed"
        await deleteJob.create(jobinfo)
    });
    console.log(job)
    }
    catch(err){
        console.log(err)
    }
    },{
        scheduled: false
      })


module.exports={
    task_p2o,
    task_delete
}