const mongoose = require('mongoose');
const Photo = require('../models/photo.js');



const imageAlbumSchema = new mongoose.Schema(
    {
        photos: [{
          type: mongoose.Schema.Types.ObjectId, ref: 'Photo',
          required: true
        }],
          author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
          required: true
         }
      },
      { timestamps: true }
    )

    const ImageAlbum = mongoose.model('Photo', imageAlbumSchema);

    module.exports = ImageAlbum  