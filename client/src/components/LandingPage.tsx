import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import {
  Wallet,
  TrendingUp,
  PieChart,
  Shield,
  Sparkles,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  LayoutDashboard,
  Brain,
} from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const scaleIn = {
  initial: { opacity: 0, scale: 0.8 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.5 }
};

export function LandingPage() {
  const navigate = useNavigate();
  const { user } = useApp();

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description:
        "Get personalized financial health scores, spending analysis, and predictive recommendations powered by OpenAI.",
    },
    {
      icon: PieChart,
      title: "Smart Categorization",
      description:
        "Automatically categorize your expenses into Needs, Wants, and Neutral spending for better insights.",
    },
    {
      icon: TrendingUp,
      title: "Trend Analysis",
      description:
        "Track your financial progress over time with intuitive charts and carry-forward tracking.",
    },
    {
      icon: BarChart3,
      title: "Income vs Expense",
      description:
        "Visualize your monthly cash flow and understand where your money goes.",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your financial data is encrypted and stored securely. Your privacy is our priority.",
    },
  ];

  const benefits = [
    "AI-powered financial health scores",
    "Track unlimited income and expenses",
    "Beautiful charts and visualizations",
    "Personalized spending recommendations",
    "Monthly financial summaries",
    "Carry-forward balance tracking",
    "Need/Want/Neutral categorization",
    "Smart caching for instant insights",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Animated background pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptMCAwdi02aC02djZoNnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40" />

      {/* Navbar */}
      <motion.nav 
        className="relative z-10 border-b border-slate-800/50 backdrop-blur-sm"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <motion.div 
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ExpenseTracker
              </span>
            </motion.div>
            <div className="flex gap-3">
              {user ? (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => navigate("/dashboard")}
                    className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/20"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-2" />
                    Go to Dashboard
                  </Button>
                </motion.div>
              ) : (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      onClick={() => navigate("/login")}
                      className="text-slate-300 hover:text-white hover:bg-slate-800"
                    >
                      Sign In
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => navigate("/register")}
                      className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold shadow-lg shadow-emerald-500/20"
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32"
        initial="initial"
        animate="animate"
        variants={staggerContainer}
      >
        <div className="text-center space-y-8">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium"
            {...fadeInUp}
          >
            <Brain className="w-4 h-4" />
            AI-Powered Financial Management
          </motion.div>

          <motion.h1 
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
            {...fadeInUp}
          >
            <span className="text-white">Track Your Finances</span>
            <br />
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Effortlessly
            </span>
          </motion.h1>

          <motion.p 
            className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
            {...fadeInUp}
          >
            Take control of your money with AI-powered insights, intelligent expense tracking,
            beautiful visualizations, and personalized recommendations. Get your financial health score
            and know exactly where your money goes.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            {...fadeInUp}
          >
            {user ? (
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold text-lg px-8 py-6 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            ) : (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold text-lg px-8 py-6 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
                >
                  Get Started for Free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  onClick={() => navigate("/login")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg px-8 py-6 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
                >
                  View Demo
                </Button>
              </>
            )}
          </motion.div>

          <motion.p 
            className="text-sm text-slate-500"
            {...fadeInUp}
          >
            {user ? `Welcome back, ${user.name || user.username}!` : 'Free forever. No credit card required.'}
          </motion.p>
        </div>

        {/* Hero Image/Dashboard Preview */}
        <motion.div 
          className="mt-20 relative"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
          <div className="rounded-2xl overflow-hidden border border-slate-800 shadow-2xl shadow-emerald-500/10 backdrop-blur-sm bg-slate-900/50 p-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div 
                className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-xl p-6"
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <TrendingUp className="w-8 h-8 text-emerald-400 mb-3" />
                <p className="text-2xl font-bold text-white mb-1">$12,450</p>
                <p className="text-sm text-slate-400">Total Income</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 rounded-xl p-6"
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <BarChart3 className="w-8 h-8 text-red-400 mb-3" />
                <p className="text-2xl font-bold text-white mb-1">$8,320</p>
                <p className="text-sm text-slate-400">Total Expenses</p>
              </motion.div>
              <motion.div 
                className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-xl p-6"
                variants={scaleIn}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <Wallet className="w-8 h-8 text-blue-400 mb-3" />
                <p className="text-2xl font-bold text-white mb-1">$4,130</p>
                <p className="text-sm text-slate-400">Balance</p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div className="text-center mb-16" variants={fadeInUp}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Everything you need to manage your money
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Powerful features designed to give you complete control over your
            finances
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-6 hover:border-emerald-500/50 transition-all hover:shadow-lg hover:shadow-emerald-500/10"
              variants={scaleIn}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
      >
        <motion.div 
          className="bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-2xl p-12"
          variants={fadeInUp}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why choose ExpenseTracker?
              </h2>
              <p className="text-lg text-slate-400 mb-8">
                Join thousands of users who have taken control of their
                financial future with AI-powered insights and intuitive expense tracking.
              </p>
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                variants={staggerContainer}
              >
                {benefits.map((benefit, index) => (
                  <motion.div 
                    key={index} 
                    className="flex items-start gap-3"
                    variants={fadeInUp}
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-sm">{benefit}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative"
              variants={scaleIn}
            >
              <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-700 rounded-xl p-8 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700">
                  <span className="text-slate-400 text-sm">This Month</span>
                  <span className="text-emerald-400 text-sm font-medium">
                    December 2025
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Groceries", amount: "$450", color: "red" },
                    { label: "Rent", amount: "$1,200", color: "orange" },
                    { label: "Entertainment", amount: "$150", color: "purple" },
                    { label: "Utilities", amount: "$220", color: "blue" },
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full bg-${item.color}-400`}
                        />
                        <span className="text-slate-300">{item.label}</span>
                      </div>
                      <span className="text-white font-medium">
                        {item.amount}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* CTA Section */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="text-center space-y-8">
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold text-white"
            variants={fadeInUp}
          >
            Ready to take control?
          </motion.h2>
          <motion.p 
            className="text-xl text-slate-400 max-w-2xl mx-auto"
            variants={fadeInUp}
          >
            Join today and start making smarter financial decisions.
          </motion.p>
          <motion.div variants={fadeInUp}>
            {user ? (
              <Button
                size="lg"
                onClick={() => navigate("/dashboard")}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold text-lg px-12 py-6 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                <LayoutDashboard className="w-5 h-5 mr-2" />
                Go to Dashboard
              </Button>
            ) : (
              <Button
                size="lg"
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold text-lg px-12 py-6 shadow-2xl shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all"
              >
                Get Started for Free
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </motion.div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-semibold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                ExpenseTracker
              </span>
            </div>
            <p className="text-slate-500 text-sm">
              © 2025 ExpenseTracker. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

