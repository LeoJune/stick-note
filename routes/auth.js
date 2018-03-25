var express = require('express');
var router = express.Router();

var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;

passport.serializeUser(function(user,done){
    console.log('---serializeUser---')
    console.log(user)
    done(null,user);
})

passport.deserializeUser(function(obj,done){
    console.log('---deserializeUser---')
    done(null,obj)
});

passport.use(new GitHubStrategy({
    clientID:'5652767b2a2d544ac658',
    clientSecret:'d620d16aacc6953a6f91034eb843b8fdaecd64a6',
    callbackURL:"http://localhost:3000/auth/github/callback"
 },
 function(accessToken,refreshToken,profile,done){
     //user.findOrCreate({githubId:profile.id},function(err,user){
     //})
     done(null,profile)
    }
));


router.get('/logout',function(req, res){
    req.session.destroy();
    res.redirect('/');
})

router.get('/github',
  passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github',{failureRedirect:'/login'}),
    function(req,res){
        req.session.user = {
            id: req.user.id,
            username: req.user.displayName || req.user.username,
            avatar: req.user._json.avatar_url,
            provider: req.user.provider 
        };
        res.redirect('/');
    }
)

module.exports = router;

