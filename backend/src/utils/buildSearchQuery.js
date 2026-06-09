
const buildSearchQuery = ({keyword, category}) =>{
     const query = {};

     if(keyword && keyword.trim()){
        query.$or = ["name", "description", "brand", "category"].map((field) => ({
           [field]: {
            $regex: keyword.trim(),
            $options: "i",
           } ,
        }))
     }
      if (category && category.trim()) {
        query.category = {
        $regex: category.trim(),
        $options: "i",
        };
    }

     return query;

}

export default buildSearchQuery;