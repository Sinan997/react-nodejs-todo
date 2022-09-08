const User = require("../modal/user");
const mongoose = require("mongoose");

exports.addTask = async (req, res, next) => {
  const task = req.body.task;
  const isCompleted = req.body.isCompleted;
  const userId = req.userId;

  const user = await User.findById(userId);

  user.tasks.push({
    _id: mongoose.Types.ObjectId(),
    task: task,
    isCompleted: isCompleted,
  });

  await user.save();

  return res.status(200).json({ posts: user.tasks });
};

exports.getTasks = async (req, res, next) => {
  const userId = req.userId;
  const user = await User.findById(userId);

  const userPosts = user.tasks;

  res.status(200).json({ posts: userPosts });
};

exports.MakeTaskCompleted = async (req, res, next) => {
  const userId = req.userId;
  const taskId = req.body.taskId;

  const user = await User.findById(userId);

  const newTasks = user.tasks.map((task) => {
    if (task._id.toString() === taskId) {
      task.isCompleted = true;
    }
    return task;
  });

  await User.updateOne({ _id: userId }, { tasks: newTasks });
  res.status(200).json({ posts: user.tasks });
};
