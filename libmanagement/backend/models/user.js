const mongoose = require('mongoose');

const BookBorrowedSchema = new mongoose.Schema({
  name: { type: String, required: true },
  borrow_date: { type: Date, required: true },
  due_date: { type: Date, required: true },
  returned_date: { type: Date, default: null }, 
  status: { type: String, enum: ['paid', 'not paid'], required: true }
});

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  membership_id: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  member_since: { type: Date, required: true },
  books_borrowed: [BookBorrowedSchema],
  wishlist: [{ type: String }],
  pending_fine: { type: String },       
  password: { type: String, required: true } 
});

module.exports = mongoose.model('User', UserSchema);
