const Comment = require("../models/Comment");

module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        user: req.user._id,
        comment: req.body.comment,
        likes: 0,
        post: req.params.id,
      });
      console.log("Comment has been added!");
      res.redirect("/post/" + req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      // Find comment by id
      let comment = await Comment.findById(req.params.id);
      // Delete post from db
      await Comment.findOneAndDelete({ _id: req.params.id });
      console.log("Deleted comment");
      res.redirect(`/post/${comment.post}`);
    } catch (err) {
      res.redirect(`/post/${comment.post}`);
    }
  },
};
