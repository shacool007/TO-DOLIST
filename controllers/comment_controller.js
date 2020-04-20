const Comment = require("../models/comment");
const Post = require("../models/post");

module.exports.create = function(req,res){
    Post.findById(req.body.postId,function(err,post){
        if(post){
            Comment.create({
                content:req.body.comment,
                post:req.body.postId,
                user:req.user._id

            },function(err,comment){
                post.comments.push(comment);
                post.save();
                
                return res.redirect('back');
            })
        }
    })
}
