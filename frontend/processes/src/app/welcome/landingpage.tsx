import React from 'react';
import { Bell, BarChart2, ClipboardList, DollarSign, LucideIcon, ArrowRight, Star, Users } from 'lucide-react';
import Link from "next/link";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700 hover:border-blue-500/50 transition-all duration-500 group overflow-hidden">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-300/20 blur-xl group-hover:opacity-100 opacity-0 transition-opacity duration-700 -z-10" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/5 rounded-full -ml-12 -mb-12" />
      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-500/20 transition-colors duration-500">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
      <div className="mt-4 flex items-center text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="text-sm">Learn more</span>
        <ArrowRight className="w-4 h-4 ml-2" />
      </div>
    </div>
  );
};

const StatsCard = ({ number, label }: { number: string; label: string }) => (
  <div className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700">
    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-full -mr-12 -mt-12" />
    <h4 className="text-3xl font-bold text-white mb-2">{number}</h4>
    <p className="text-gray-400">{label}</p>
  </div>
);

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: DollarSign,
      title: "Purchase Review",
      description: "Track and manage all your purchase activities efficiently with real-time updates and insights."
    },
    {
      icon: ClipboardList,
      title: "Task Management",
      description: "Organize and prioritize all your team's work in one place with intuitive workflows."
    },
    {
      icon: BarChart2,
      title: "Analytics Dashboard",
      description: "Get detailed insights into your team's performance with beautiful visualizations and reports."
    },
    {
      icon: Bell,
      title: "Task Notifications",
      description: "Stay updated with smart notifications and never miss important updates or deadlines."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Product Manager",
      company: "Tech Co",
      content: "This platform has transformed how our team collaborates and manages tasks."
    },
    {
      name: "Mark Chen",
      role: "Team Lead",
      company: "Innovation Labs",
      content: "The analytics features have helped us optimize our workflow significantly."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0F19] relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] opacity-30">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full blur-3xl animate-[pulse_8s_ease-in-out_infinite]" />
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20 animate-[moveLeft_15s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-3xl animate-[pulse_10s_ease-in-out_infinite]" />
        </div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20 animate-[moveRight_15s_ease-in-out_infinite]">
          <div className="absolute inset-0 bg-blue-500 rounded-full blur-3xl animate-[pulse_12s_ease-in-out_infinite]" />
        </div>
      </div>

      <nav className="fixed w-full top-0 z-50 bg-white/5 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-1 flex items-center space-x-8">
            </div>
            <div className="flex justify-center relative group">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <img src="/logo66.png" alt="Taskk Logo" className="h-12 w-auto relative" />
            </div>
            <div className="flex-1 flex justify-end space-x-4">
              <button className="px-6 py-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 relative group transition-all duration-500">
                <span className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Log in</span>
              </button>
              <button className="px-6 py-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 relative group transition-all duration-500">
                <span className="absolute inset-0 bg-blue-400/50 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative">Sign up</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative pt-48 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-300/5 rounded-full -ml-32 -mb-32" />
            <div className="relative">
              <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4">
                New Feature Release
              </span>
              <h1 className="text-4xl sm:text-6xl font-bold text-white mb-6 relative">
                <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 blur-3xl opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
                Manage Your Work Efficiently
              </h1>
              <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10">
                Keep track of tasks, management work, and stay productive with our intelligent workspace solution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard" passHref>
                <button className="px-8 py-4 rounded-full bg-blue-500 text-white hover:bg-blue-600 relative group transition-colors duration-500 w-48">
                  <span className="absolute inset-0 bg-blue-400 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
                  <span className="relative">Dashboard</span>
                </button>
                </Link>
                <button className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 relative group transition-all duration-500 w-48">
                  <span className="absolute inset-0 bg-blue-500/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <span className="relative">Explore task</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4">
              Features
            </span>
            <h2 className="text-3xl font-bold text-white relative">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 blur-3xl opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
              Powerful Features
            </h2>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your work efficiently and boost productivity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </div>

      <div className="relative py-20 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard number="10k+" label="Active Users" />
            <StatsCard number="1M+" label="Tasks Completed" />
            <StatsCard number="99.9%" label="Uptime" />
            <StatsCard number="24/7" label="Support" />
          </div>
        </div>
      </div>

      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 text-sm mb-4">
              Testimonials
            </span>
            <h2 className="text-3xl font-bold text-white relative">
              <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-300 blur-3xl opacity-20 animate-[pulse_8s_ease-in-out_infinite]" />
              What Our Users Say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-gray-700">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16" />
                <div className="relative">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                      <Users className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role} at {testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-gray-300">{testimonial.content}</p>
                  <div className="flex items-center mt-4 text-blue-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
