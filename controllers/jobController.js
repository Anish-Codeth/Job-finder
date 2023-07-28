
const {StatusCodes}=require('http-status-codes') 
const Company=require('../models/companymodel')
const customError=require('../errors/classerror')
const compress=require('../props/compress')
const {Job,deleteJob}=require('../models/jobmodel')
const { set } = require('mongoose')

//to get all the jobs
const getAllJobs=async(req,res)=>{

  try{
   let job=await Job.find({})
   const company_job=await Promise.all(job.map(async (e)=>{
    let company=await Company.findOne({"companyName":e.companyName})
     const jobTimeLength={
      remote:0,
      fulltime:0,
      parttime:0
     }

     job.filter(e=>{
      if(e.jobTime){      
        if(e.jobTime=='remote')
      jobTimeLength.remote+=1;
      else if(e.jobTime=='fulltime')
      jobTimeLength.fulltime+=1
      else if(e.parttime=='parttime')
      jobTimeLength.parttime+=1
      }
     })

    companyDetail=company.toObject()
    jobDetail=e.toObject()
   console.log(companyDetail,jobDetail,jobTimeLength)
    return {companyDetail,jobDetail,jobTimeLength}
   })
   )
    res.status(StatusCodes.OK).json(company_job)
  }

  catch(err){
    res.status(StatusCodes.BAD_REQUEST).json(err)
  }
}

//to create the job
const createJobs=async(req,res)=>{


    try{
       const searchindex=(req.body.skills||'').join('')+(req.body.location.name||'')+(req.body.category||'')
       req.body.searchIndex=searchindex
       const job=await Job.create(req.body)
       res.status(StatusCodes.CREATED).json(job)
    }
    catch(err){
        res.json(err)
    }
}




//For the query
const jobQueries=async(req,res)=>{

    const {sort,category,jobLevel,location,recommendation,id,search}=req.query
    let makequery={}
    let queries  //for the sort
    const [longitude,latitude]=[70,89] //you will get this data from the userdata 
    const page=Number(req.query.page)||1
    const limit=Number(req.query.limit)||4

    if(id){
      makequery._id=id
    }

    if(search){
       makequery.searchIndex={
        $regex:search
       }
    }

    if(sort){
    queries=sort.split(',').join(' ')
    }

    if(category){
       makequery.category=category

    }
    if(jobLevel){
        makequery.jobLevel=jobLevel
    }
  //connect with user
    if(location){
             
             const locationNumber=Number(location)
             console.log(locationNumber)
             const job=await Job.aggregate( [
      {
         $geoNear: {
            near: { type: "Point", coordinates: [longitude,latitude ] },
            spherical: true,
            distanceField: "calcDistance",
            maxDistance:locationNumber*1000
         }
      }
   ] ).limit(limit).skip((page-1)*limit)

   return res.json(job)
    }
 //must connect with user
    if(recommendation){
      let a=['express','flask','bonjour','c++','api']
      let job=await Job.find({})//you need to filter the search by one of user skills for the data
  
      job=job.map((e)=>{
        let listjob=a.concat(e.skills)
        let setjob=new Set(listjob)
        e=e.toObject()//e=e._doc
        e.recommendationper=(listjob.length-setjob.size)/e.skills.length*100
        return e
      })
      job.sort(function(a,b){return -a.recommendationper+b.recommendationper}) //if(!(value))
      return res.json(job.slice((page-1)*limit,page*limit))

    } //think if it must be in seperate page or not because it needs its own query
    //pagination must be done
    
    
    
    try{
         const job=await Job.find(makequery).sort(queries).limit(limit).skip((page-1)*limit)
         res.status(StatusCodes.CREATED).json(job) 
    }
    catch(err){
        return res.json(err.message)
    }

}




module.exports={
getAllJobs,
createJobs,
jobQueries
}