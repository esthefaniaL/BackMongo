const Repository = require('../models/Repository');


//add a repository to favorites
exports.AddFavorites= async(req,res)=>{

    const {name}=req.body;

    try {
        let repo = await Repository.findOne({ name });

        if(repo) {
            return res.status(400).json({ msg: 'Repository already exists' });
        }
        repo = new Repository(req.body);

        // save repositoy
        await repo.save();

        res.status(200).send('Repository created successfully')

    } catch (error) {
        console.log(error);
        res.status(400).send('there was an error adding to favorites')
    }
}

//remove a repository to favorites
exports.RemoveFavorites= async(req,res)=>{

    const {name}=req.query;

    try {
        let repo = await Repository.findOne({ name });

        if(!repo) {
            return res.status(400).json({ msg: 'Repository not exists' });
        }
        repo = new Repository(req.body);
        
        //Remove
        await Repository.findOneAndRemove({name});

        res.status(200).send('Repository Remove')

    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error removing the favorites repository')
    }
}

//get favorites
exports.getFavorites= async(req,res)=>{


  const {userId}=req.body

  try {
    const repos = await Repository.find({ userId })
    res.json({ repos });
      
  } catch (error) {
    res.status(400).send('There was an error getting the list of repositories')
  }
}