
import React, { useEffect,useState } from "react";
// Sample team data with image URLs and names
const teamMembers = [
  {
    name: "Ali",
    image: "Ali.jpg",
    count:0
  },
    
  {
    name: "Jetani",
    image: "pratik.jpg",
    count:0,
  },
  
  {
    name: "Preet",
    image: "preet.jpg",
    count:0
  },
  {
    name: "Mahir",
    image: "mahir.jpg",
    count:0
  },
];

const NameBadges = () => {
    const [userdata, setUserdata] = useState([]);
    const fetchUser = async()=>{
        const res = await fetch('/api/v1/user/count',{
            method:"POST"
        });
        const data = await res.json();

        console.log(data)
        if(res.ok){
            setUserdata(data)
        }
    }

    useEffect(()=>{
        fetchUser();
    },[])

        

    for (let i = 0; i < userdata.length; i++) {
      for (let j = 0; j < teamMembers.length; j++) {
        if (userdata[i].name === teamMembers[j].name) {
          teamMembers[j].count = userdata[i].count;
        }
      }
    }
    console.log(teamMembers);
    

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-10">Team Members</h1>

      <div className="flex flex-wrap gap-8 justify-center max-w-6xl">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="relative w-44 h-44 rounded-full shadow-xl overflow-hidden group"
          >
            {/* Background Image */}
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover transition-all duration-300 group-hover:blur-sm"
            />

            {/* Hover Counter */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
              <span className="text-white text-4xl font-bold bg-black/50 rounded-full w-16 h-16 flex items-center justify-center">
                {member.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NameBadges;
