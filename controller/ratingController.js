const Rating = require('../model/ratingSchema')



exports.CreateRatings = async(req,res)=>{
try {
const rating = new Rating({
    value: req.body.value,
    description: req.body.description
})


 const savedRating = await rating.save();
res.status(200).json({ message: 'Rating created',savedRating });

    
} catch (error) {
    res.status(400).json({ error: 'Invalid input data' });
    console.log('error');
}
}


exports.getRatings = async(req,res)=>{
try {

    const ratings = await Rating.find()
    
    const savedRating = ratings

    res.status(200).json(savedRating)

} catch (error) {
    console.error('Error retrieving ratings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
}




}

exports.filterRatingsByValue = async(req,res)=>{

    console.log(`vall`,req.params);
try {
    
    const {value} = req.params;
    const intValue = parseInt(value,10)

    if(isNaN(intValue) || intValue <1 || intValue > 5 ){
        return res.status(400).json({ error: 'Invalid rating value' });
    }

    const filteredRatings = await Rating.find({ value: intValue });
    res.status(200).json(filteredRatings);
    console.log(filteredRatings);

} catch (error) {
    console.error('Error retrieving filtered ratings:', error);
    res.status(500).json({ error: 'Internal Server Error' });    
}





}