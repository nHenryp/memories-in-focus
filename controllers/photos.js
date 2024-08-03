const express = require('express');
const verifyToken = require('../middleware/verify-token.js');
const Photo = require('../models/photo.js');
const router = express.Router();

// ========== Public Routes ===========

// ========= Protected Routes =========
router.use(verifyToken);




// create

router.post('/', async (req, res) => {
  try {
    req.body.author = req.user._id;
    const photo = await Photo.create(req.body);
    photo._doc.author = req.user;
    res.status(201).json(photo);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});


// index

router.get('/', async (req, res) => {
    try {
      const photos = await Photo.find({})
        .populate('author')
        .sort({ createdAt: 'desc' });
      res.status(200).json(photos);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  
  
  // show
  
  router.get('/:photoId', async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.photoId)
        .populate(['author', 'comments.author']);
      res.status(200).json(photo);
    } catch (error) {
      res.status(500).json(error);
    }
  });


// update

router.put('/:photoId', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId)

    if (!photo.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const updatedPhoto = await Photo.findByIdAndUpdate(
      req.params.photoId,
      req.body,
      { new: true }
    )

    updatedPhoto._doc.author = req.user;

    res.status(200).json(updatedPhoto);
  } catch (error) {
    res.status(500).json(error);
  }
});



// delete

router.delete('/:photoId', async (req, res) => {
  try {
    const photo = await Photo.findById(req.params.photoId);

    if (!photo.author.equals(req.user._id)) {
      return res.status(403).send("You're not allowed to do that!");
    };

    const deletedPhoto = await Photo.findByIdAndDelete(req.params.photoId);
    res.status(200).json(deletedPhoto);
  } catch (error) {
    res.status(500).json(error);
  }
});


// comments create


router.post('/:photoId/comments', async (req, res) => {
  try {
    req.body.author = req.user._id;
    const photo = await Photo.findById(req.params.photoId);
    photo.comments.push(req.body);
    await photo.save();

    // Find the newly created comment:
    const newComment = photo.comments[photo.comments.length - 1];

    newComment._doc.author = req.user;

    // Respond with the newComment:
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json(error);
  }
});


//comments update

router.put('/:photoId/comments/:commentId', async (req, res) => {

  try {
    const photo = await Photo.findById(req.params.photoId)
    const comment = photo.comments.id(req.params.commentId)
    comment.text = req.body.text
    await photo.save()
    res.status(200).json({ message: 'Ok' })
  } catch (err) {
    res.status(500).json(err)
  }
});



router.delete('/:photoId/comments/:commentId', async (req, res) => {

   try {
    const photo = await Photo.findById(req.params.photoId)
    photo.comments.remove({ _id: req.params.commentId })
    await photo.save()
    res.status(200).json({ message: 'Ok' })
  } catch (err) {
    res.status(500).json(err)
  }
});


module.exports = router;