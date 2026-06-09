
const buildSearchQuery = (keyword, fields=[]) =>{
     const query = {};

     if(keyword && keyword.trim()){
        query.$or = fields.map((field) => ({
           [field]: {
            $regex: keyword.trim(),
            $options: "i",
           } ,
        }))
     }


     return query;

}

export default buildSearchQuery;