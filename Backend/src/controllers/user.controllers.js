import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { Todo } from "../models/todo.model.js";

const userSignup = async (req, res) => {
  const { fullname, email, password } = req.body;
  if (!(fullname || email || password))
    return res.status(401).json({
      error: true,
      message: "All fields are mandatory",
    });

  const isUser = await User.findOne({ email });
  if (isUser)
    return res.status(401).json({
      error: true,
      message: "User already exists.",
    });

  const newUser = await User.create({
    fullname,
    email,
    password,
  });
  await newUser.save();

  const token = jwt.sign(
    {
      userId: newUser._id,
    },
    process.env.SECRET_KEY
  );

  if (newUser)
    return res.status(200).json({
      error: false,
      User: newUser,
      token,
    });
  else
    return res.status(400).json({
      error: true,
      message: "Error in singing up user",
    });
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!(email || password))
    return res.status(401).json({
      error: true,
      message: "All fields are mandatory",
    });

  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).json({
      error: true,
      message: "User doesn't exists.",
    });

  const checkPassword = user.isPasswordCorrect(password);
  if (!checkPassword)
    return res.status(401).json({
      error: true,
      message: "Invalid Password.",
    });

  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.SECRET_KEY
  );

  return res.status(200).json({
    error: false,
    User: user,
    token,
  });
};

const getUser = async (req, res) => {
  const user = req.user;

  const verifyUser = await User.findById(user._id);
  if (!verifyUser)
    return res.status(401).json({
      error: true,
      message: "Error in fetching user.",
    });

  return res.status(200).json({
    error: false,
    User: verifyUser,
  });
};

const addTodo = async (req, res) => {
  try {
    const { title, content } = req.body;
    const user = req.user;

    if (!(title || content))
      return res.status(401).json({
        error: true,
        message: "All fields are mandatory",
      });

    const todo = await Todo.create({
      title,
      content,
      userId: user._id,
    });

    await todo.save();

    return res.status(200).json({
      error: false,
      Todo: todo,
    });
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Error in adding todo.",
    });
  }
};

const allTodo = async (req, res) => {
  try {
    const user = req.user;

    const todo = await Todo.find({ userId: user._id });

    return res.status(200).json({
      error: false,
      Todo: todo,
    });
  } catch (error) {
    return res.status(401).json({
      error: true,
      message: "Error in retriving todo's.",
    });
  }
};

const deleteTodo = async (req , res ) => {
 try {
  await Todo.findByIdAndDelete(req.params.id)
   return res.status(200).json({
     error:false,
     message:'Todo deleted successfully.'
   })
 } catch (error) {
  console.log(error)
 }
}

const userLogout = async (req , res) => {
  try {
    res.header("Authorization" , "").status(200).json({
      error:false,
      message:"User logged out successfully."
    })

  } catch (error) {
    console.log(error)
  }
} 

export { userSignup, userLogin, getUser, addTodo, allTodo , deleteTodo , userLogout };
