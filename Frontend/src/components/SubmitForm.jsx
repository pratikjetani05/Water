import React, { useState, useEffect } from 'react';
import { Droplets, Calendar, User, TrendingUp } from 'lucide-react';

const SubmitForm = () => {
  const [fillHistory, setFillHistory] = useState([]);
  const [selectedName, setSelectedName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [fillProgress, setFillProgress] = useState(0);
  const [dataLoading, setDataLoading] = useState(true);

  const friends = ['Mahir', 'Ali', 'Jetani', 'Preet'];


  const fetchFillHistory = async () => {
    try {
      setDataLoading(true);
      const response = await fetch('/api/v1/user/alldata',{
        method:'POST'
      });
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setFillHistory(data);
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setDataLoading(false);
    }
  };


  useEffect(() => {
    fetchFillHistory();
  }, []);

  const handleFill = async () => {
    if (!selectedName) {
      alert('Please select a name!');
      return;
    }

    setIsLoading(true);
    setFillProgress(0);

  
    const interval = setInterval(() => {
      setFillProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    try {
      
      const response = await fetch('/api/v1/user/filljug', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: selectedName }),
      });

      if (response.ok) {
        setTimeout(async () => {  
          setIsLoading(false);
          setFillProgress(0);
          setSelectedName('');
        }, 1000);
      } else {
        console.error('Failed to submit data');
        setIsLoading(false);
        setFillProgress(0);
        alert('Failed to submit data. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      setIsLoading(false);
      setFillProgress(0);
      alert('Error submitting data. Please try again.');
    }
  };

  const getNameColor = (name) => {
    const colors = {
      'Mahir': 'bg-blue-500',
      'Ali': 'bg-pink-500',
      'Sarah': 'bg-green-500',
      'Mike': 'bg-purple-500'
    };
    return colors[name] || 'bg-gray-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-100 p-4 relative overflow-hidden">
      {/* Animated Background Water Fill */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-blue-400 to-blue-300 transition-all duration-300 ease-out"
        style={{ 
          height: `${fillProgress}%`,
          opacity: 0.3,
          transform: 'translateY(100%)',
          transform: `translateY(${100 - fillProgress}%)`,
        }}
      >
        {/* Water Wave Effect on Background */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-50 animate-pulse"></div>
      </div>
              <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            💧 HeheHydrate Tracker
          </h1>
          <p className="text-blue-600">Track your daily water jug fills with friends!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - History Tracking (1 part) */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="text-blue-500" size={24} />
              <h2 className="text-2xl font-bold text-gray-800">Fill History</h2>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {dataLoading ? (
                <div className="flex items-center justify-center p-8">
                  <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                  <span className="ml-3 text-gray-600">Loading history...</span>
                </div>
              ) : fillHistory.length === 0 ? (
                <div className="text-center p-8 text-gray-500">
                  <Droplets className="mx-auto mb-2" size={32} />
                  <p>No fills recorded yet!</p>
                </div>
              ) : (
                fillHistory.map((entry) => (
                  <div 
                    key={entry._id}
                    className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-400 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-3 h-3 rounded-full ${getNameColor(entry.name)}`}></div>
                      <span className="font-semibold text-gray-800">{entry.name}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{entry.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>🕐</span>
                        <span>{entry.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right Section - Fill Form (2 parts) */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-2 mb-8">
              <Droplets className="text-blue-500" size={28} />
              <h2 className="text-3xl font-bold text-gray-800">Fill the Jug</h2>
            </div>

            <div className="space-y-8">
              {/* Name Selection */}
              <div>
                <label className="block text-lg font-semibold text-gray-700 mb-4">
                  Select Your Name:
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {friends.map((name) => (
                    <button
                      key={name}
                      onClick={() => setSelectedName(name)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                        selectedName === name
                          ? `${getNameColor(name)} text-white border-transparent shadow-lg transform scale-105`
                          : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <User size={20} />
                        <span className="font-semibold">{name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Beautiful Water Jug Animation */}
              <div className="flex flex-col items-center space-y-6">
                <div className="relative">
                  {/* Beautiful Water Jug */}
                  <div className="relative w-40 h-48 bg-gradient-to-b from-slate-200 to-slate-300 rounded-t-lg border-4 border-slate-400 overflow-hidden shadow-xl">
                    {/* Jug Neck */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-gradient-to-b from-slate-300 to-slate-400 rounded-t-lg border-2 border-slate-500"></div>
                    
                    {/* Jug Body */}
                    <div className="absolute top-4 left-0 right-0 bottom-0 bg-gradient-to-b from-slate-100 to-slate-200 rounded-b-3xl border-4 border-slate-400 overflow-hidden">
                      {/* Water Fill Animation */}
                      <div 
                        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 to-cyan-300 transition-all duration-100 ease-out rounded-b-3xl"
                        style={{ height: `${fillProgress}%` }}
                      >
                        {/* Water Wave Effect */}
                        <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 animate-pulse rounded-full"></div>
                        
                        {/* Water Bubbles */}
                        <div className="absolute top-2 left-4 w-1 h-1 bg-white rounded-full animate-ping"></div>
                        <div className="absolute top-6 right-6 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                        <div className="absolute top-10 left-8 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
                      </div>
                      
                      {/* Jug Handle - Beautiful Curved Design */}
                      <div className="absolute -right-2 top-8 w-8 h-16 border-4 border-slate-500 rounded-full bg-transparent shadow-lg"></div>
                      
                      {/* Fill Percentage */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold text-slate-700 drop-shadow-lg">
                          {fillProgress}%
                        </span>
                      </div>
                      
                      {/* Jug Base */}
                      <div className="absolute bottom-0 left-2 right-2 h-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full shadow-inner"></div>
                    </div>
                    
                    {/* Jug Rim */}
                    <div className="absolute top-4 left-0 right-0 h-2 bg-gradient-to-r from-slate-400 to-slate-500 rounded-full shadow-lg"></div>
                  </div>
                  
                  {/* Droplets Animation */}
                  {isLoading && (
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                      <Droplets className="text-cyan-500 animate-bounce" size={24} />
                    </div>
                  )}
                </div>

                {/* Fill Button */}
                <button
                  onClick={handleFill}
                  disabled={isLoading || !selectedName}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                    isLoading || !selectedName
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Filling...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Droplets size={20} />
                      Fill the Jug
                    </div>
                  )}
                </button>

                {/* Status Message */}
                {selectedName && !isLoading && (
                  <p className="text-center text-gray-600">
                    Ready to record <span className="font-semibold text-blue-600">{selectedName}</span>'s fill!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;