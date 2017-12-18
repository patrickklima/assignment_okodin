const Express = require('express');
const router = Express.Router();

var models = require('../models');
var sequelize = models.sequelize;
const {Sequelize: {Op}} = models;   //destructuring: Op = Sequelize.Op  ... makes query operators available

var User = models.User;
var Profile = models.Profile;
var Talent = models.Talent;
var Favorite = models.Favorite;

// VIEW AND FILTER ALL PROFILES

// const PROFILES_PER_ROW = 3;
const PROFILES_PER_PAGE = 12;
router.get('/index', (req, res) => {
  let pageLimit = {
    offset: ((req.params.page || 1) - 1)*PROFILES_PER_PAGE, //skips the profiles on previous pages
    limit: PROFILES_PER_PAGE,
  };
  
  // console.log(req.query.isSingle);
  
  // DEFAULTS
  // req.query.sortBy = req.query.sortBy || "age|asc";
  req.query.isSingle = req.query.isSingle || "both";
  if (req.query.isSingle === "both") req.query.isSingle = {[Op.or]: [true,false]};
  if (req.query.isSingle === "yes") req.query.isSingle = true;
  if (req.query.isSingle === "no") req.query.isSingle = false;
  // req.body.hasKids = req.body.hasKids || "[true,false]";
  
  req.query.hasKids = req.query.hasKids || "both";
  if (req.query.hasKids === "both") req.query.hasKids = {[Op.or]: [true,false]};
  if (req.query.hasKids === "yes") req.query.hasKids = true;
  if (req.query.hasKids === "no") req.query.hasKids = false;
  
  req.body.location = req.body.location || "";
  // req.body.gender = req.body.gender || "[male,female]";
  // req.body.ageMin = req.body.ageMin || 18;
  // req.body.ageMax = req.body.ageMax || 100;
  // req.body.heightMin = req.body.heightMin || 0;
  // req.body.heightMax = req.body.heightMax || 300;
  
  // var sortKey = req.query.sortBy.split('|')[0];
  // var sortDirec = req.query.sortBy.split('|')[1];
  // console.log(req.query.sortBy);
  // let sortOrder = [
  //   {model: Profile, as: 'Profile'},
  //   sortKey,   
  //   sortDirec.toUpperCase()    //sort direction: 'asc' or 'desc'
  // ];
  
  // console.log(sortOrder);
  
  let usersFilters = [];
  let profileFilters = [];
  let talentFilters = [];
  let favoriteFilters = [];
  
  profileFilters.push({
    isSingle: req.query.isSingle,
    hasKids: req.query.hasKids,
    location: req.body.location,  
  //   gender: {[Op.or]: req.body.gender}//,
    // age: {[Op.and]: [
    //   {[Op.gte]: Number(req.body.ageMin)},
    //   {[Op.lte]: Number(req.body.ageMax)} ]},
    // height: {[Op.and]: [
    //   {[Op.gte]: Number(req.body.heightMin)},
    //   {[Op.lte]: Number(req.body.heightMax)} ]},
  });
  
  var all = [];
  // var rows = [];
  User.findAll({
    pageLimit,
    // order: sortOrder,
    where: usersFilters,
    include: [{model: Profile,
      where: profileFilters,
      include: [{
        model: Talent, 
        where: talentFilters
        },{
        model: Favorite,
        where: favoriteFilters
        }
      ]
    }]
  }).then(allUsers => {
    console.log("allUsers");
    console.log(allUsers);
    allUsers.map(user => {
      user.data = user.dataValues;
      user.profile = user.Profile.dataValues;
    });  
    all = allUsers;

  }).then(() => {
    return Profile.findAll({
      attributes: ['location']
    });
  }).then(locations => {
    var locObj = {};
    locations.forEach(location => locObj[location] = "");  //de-duplicating locations
    return Object.keys(locObj);
  }).then(locations => {
    res.render('profiles/all-profiles.handlebars', {
      users: all,
      locations: locations
    });
  });
});

router.get('/', (req, res) => {
  res.redirect('profiles/index');
});


// View the Edit Profile Page
router.get('/edit', (req, res) => {
  User.find({
    where: {username: req.session.data.username},
    include: [
      {model: Profile,
        include: [
          {model: Talent},
          {model: Favorite}
        ]}
      ]
  }).then(userData => {
    // console.log("userData");
    // console.log(userData);
    // console.log("userData.Profile.dataValues");
    // console.log(userData.Profile.dataValues)
    res.render('profiles/edit-profile', {
      data: userData.dataValues,
      profile: userData.Profile.dataValues 
    });
  });
});

router.post('/edit', (req, res) => {
  sequelize.transaction(t => {
    return User.upsert({
      //values
      
    },{
      //options
      transaction: t
    });
  });
  
});

router.post('/delete', (req, res) => {});

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  User.find({
    where: {username: req.params.id},
    include: [
      {model: Profile,
        include: [
          {model: Talent},
          {model: Favorite}
        ]}
      ]
  }).then(userData => {
    // console.log("userData");
    // console.log(userData);
    // console.log("userData.Profile.Talents");
    // console.log(userData.Profile.Talents);
    // console.log("userData.Profile.Favorites");
    // console.log(userData.Profile.Favorites);
     res.render('profiles/user-profile', {
      user: userData.dataValues,
      profile: userData.Profile.dataValues,
      talents: userData.Profile.Talents,
      favorites: userData.Profile.Favorites
    });
  });
});


module.exports = router;