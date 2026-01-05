import React, { useState } from 'react';
import { Clock, Star } from 'lucide-react';
import CourseRecommender from './CourseRecommender';
import BookingForm from './BookingForm';

const Courses = () => {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const courses = [
    {
      title: "Open Water Diver",
      level: "Beginner",
      duration: "3-4 days",
      maxDepth: "18m",
      price: "฿9,500",
      description: "Your first step into the underwater world. Learn basic diving skills and theory.",
      includes: ["4 open water dives", "Theory & pool sessions", "PADI certification", "Equipment rental"],
      icon: "🤿"
    },
    {
      title: "Advanced Open Water",
      level: "Intermediate", 
      duration: "2 days",
      maxDepth: "30m",
      price: "฿8,500",
      description: "Expand your diving skills with 5 adventure dives including deep and navigation.",
      includes: ["5 adventure dives", "Deep dive training", "Navigation skills", "Specialty previews"],
      icon: "🌊"
    },
    {
      title: "Rescue Diver",
      level: "Advanced",
      duration: "2-3 days", 
      maxDepth: "30m",
      price: "฿9,500",
      description: "Learn to prevent and manage problems in the water, and become a more confident diver.",
      includes: ["Rescue scenarios", "Emergency training", "Problem solving", "Leadership skills"],
      icon: "🚨"
    },
    {
      title: "Divemaster",
      level: "Professional",
      duration: "4-6 weeks",
      maxDepth: "40m", 
      price: "฿32,000",
      description: "Become a diving professional and start your career in the diving industry.",
      includes: ["Leadership training", "Teaching assistance", "Dive guide skills", "Professional certification"],
      icon: "👨‍🏫"
    }
  ];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800 border-green-200';
      case 'Intermediate': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Advanced': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Professional': return 'bg-purple-100 text-purple-800 border-purple-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section id="courses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            PADI Dive Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From beginner to professional, we offer comprehensive PADI certification courses with experienced instructors in small groups
          </p>
        </div>

        <CourseRecommender />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {courses.map((course, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <span className="text-3xl mr-3">{course.icon}</span>
                    <h3 className="text-2xl font-bold text-gray-900">{course.title}</h3>
                  </div>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">{course.price}</div>
                  <div className="text-sm text-gray-500">per person</div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{course.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                <div className="flex items-center text-gray-600">
                  <Clock className="h-4 w-4 mr-2 text-blue-600" />
                  Duration: {course.duration}
                </div>
                <div className="flex items-center text-gray-600">
                  <div className="h-4 w-4 mr-2 text-blue-600 font-bold">📏</div>
                  Max depth: {course.maxDepth}
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Course includes:</h4>
                <ul className="space-y-2">
                  {course.includes.map((item, idx) => (
                    <li key={idx} className="flex items-center text-gray-600">
                      <Star className="h-4 w-4 mr-2 text-blue-600" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <button 
                onClick={() => setSelectedCourse(course.title)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-semibold"
              >
                Book This Course
              </button>
            </div>
          ))}
        </div>

        <div className="bg-blue-600 rounded-xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Special Offers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="bg-blue-700 rounded-lg p-6">
              <h4 className="font-bold text-xl mb-2">Open Water + Advanced</h4>
              <p className="text-blue-200 mb-3">Complete both courses and save!</p>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">฿16,500</span>
                <span className="text-blue-300 line-through">฿18,000</span>
              </div>
            </div>
            <div className="bg-blue-700 rounded-lg p-6">
              <h4 className="font-bold text-xl mb-2">Group Discounts</h4>
              <p className="text-blue-200 mb-3">Groups of 4+ save 10% on all courses</p>
              <div className="text-2xl font-bold">10% OFF</div>
            </div>
          </div>
        </div>
      </div>

      <BookingForm
        isOpen={!!selectedCourse}
        onClose={() => setSelectedCourse(null)}
        itemType="course"
        itemTitle={selectedCourse || ''}
      />
    </section>
  );
};

export default Courses;
