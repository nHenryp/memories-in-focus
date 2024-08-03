const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema(
    {
      content: {
        type: String,
        required: true
      },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
       }
    },
    { timestamps: true }
  );


const photoSchema = new mongoose.Schema(
    {
        title: {
          type: String,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        description: {
          type: String,
          required: true,
          
        },
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        comments: [commentSchema]
      },
      { timestamps: true }
    );

      const Photo = mongoose.model('Photo', photoSchema);

     module.exports = Photo;