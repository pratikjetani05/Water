import User from "../models/User.js";
import JugFill from "../models/JugFill.js";
import { sendMail } from "../Utility/sendEmail.js";

export const userDetails = async (req, res) => {
  const userdetail = [
    { name: "Mahir", email: "mahir@gmail.com" },
    { name: "Ali", email: "datardimohsinali@gmail.com" },
    { name: "Preet", email: "preet@gmail.com" },
    { name: "Jetani", email: "pratik@gmail.com" }
  ];

  try {
    for (let obj of userdetail) {
      const existing = await User.findOne({ email: obj.email });
      if (!existing) {
        await User.create({ name: obj.name, email: obj.email });
      } else {
        console.log(`Skipping duplicate: ${obj.email}`);
      }
    }

    res.status(201).json({ message: "Users inserted successfully (duplicates skipped)" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};




export const fillJug = async(req,res)=>{
    const { name } = req.body;

  try {
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const log = new JugFill({ user: user._id });
    await log.save();


    const response = await sendMail({
 subject: "🎉 You Just Filled the Jug – Thank You!",
 html: `<div style="max-width: 600px; margin: auto; padding: 30px; background-color: #f4f4f4; font-family: Arial, sans-serif; border-radius: 10px; color: #333;">
  <div style="text-align: center;">
    <h2 style="color: #4CAF50;">Great Job, ${name}! 💧</h2>
    <p style="font-size: 16px;">You just filled the water jug, and we appreciate it! 🙌</p>
    <p style="font-size: 16px;">Your contribution keeps the team hydrated and happy. Thank you for stepping up!</p>
  </div>

  <div style="text-align: center; margin: 30px 0;">
    <img src="https://i.imgur.com/NzsM2iA.png" alt="Water Jug" style="width: 100px; height: auto;" />
  </div>

  <p style="font-size: 14px; text-align: center; color: #555;">
    Keep being awesome, ${name}. Every drop counts! 💦
  </p>

  <hr style="border: none; border-top: 1px solid #ccc; margin: 40px 0;">

  <p style="font-size: 12px; text-align: center; color: #888;">
    This is an automated message from <strong>HeheHydrate</strong>.<br>
    Stay cool. Stay hydrated. 😎
  </p>

  <div style="text-align: center; margin-top: 20px;">
    <a href="https://google.com" style="color: #4CAF50; text-decoration: none; font-weight: bold;">HeheHydrate Team</a>
  </div>
 </div>`
 ,
        });

        if (response.success) {
            return res.status(200).json({ message: "OTP sent successfully" });
        }

    res.status(201).json({ message: "Jug filled and logged!", log });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


export const ALLdata = async (req, res) => {
  try {
    const result = await JugFill.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          name: "$userInfo.name",
          date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          time: { $dateToString: { format: "%H:%M:%S", date: "$createdAt" } }
        }
      },
      { $sort: { date: -1, time: -1 } }
    ]);
    console.log(result)
    if(result){
      res.status(200).json(result);
    }

  } catch (error) {
    console.error("Error in ALLdata:", error);
    res.status(500).json({ error: "Failed to fetch jug fill data" });
  }
};



export const countFillJugName = async (req, res) => {
  try {

    const result = await JugFill.aggregate([
      {
        $lookup: {
          from: "users",           
          localField: "user",      
          foreignField: "_id",    
          as: "userInfo"
        }
      },
      { $unwind: "$userInfo" },
      {
        $group: {
          _id: "$userInfo.name",
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          name: "$_id",
          count: 1,
          _id: 0
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    res.status(200).json(result);
  } catch (error) {
    console.error("Error in countFillJugName:", error);
    res.status(500).json({ error: "Failed to count jug fills" });
  }
};

