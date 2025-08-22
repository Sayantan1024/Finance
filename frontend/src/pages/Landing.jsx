import React, { useEffect, useRef } from 'react'
import Typed from "typed.js"
import {BanknoteArrowDown, WalletCards, LayoutDashboard, Bell, History, Brain, Users, IndianRupee, Scale, HandCoins, ArrowBigRight} from "lucide-react"

function Landing() {
  const el = useRef(null)

  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ["Track group expenses", "Settle debts", "Simplify finances"],
      typeSpeed: 80,
      backSpeed: 40,
      showCursor: false,
      loop: true
    })

    return () => {
      typed.destroy();
    }
  }, [])

  const features = [
    {
      title: "Group Expense Splitting",
      desc: "Quickly divide expenses with friends, colleagues, or roommates. The app calculates everyone’s share instantly and logs it clearly. No more confusion over who paid what.",
      icon: <BanknoteArrowDown />
    },
    { 
      title: "UPI Integration", 
      desc: "Pay or receive money directly using trusted UPI apps. Share your UPI ID/QR or settle dues with one tap. Fast, secure, and hassle-free payments every time.",
      icon: <WalletCards />
    },
    { 
      title: "Personal Dashboard", 
      desc: "Track where your money goes with simple charts and reports. Spot spending patterns and stay on top of your budget. Make smarter financial decisions with ease.",
      icon: <LayoutDashboard />
    },
    { 
      title: "Reminders", 
      desc: "Never miss a due date again with smart reminders. Stay updated on pending expenses and payments. Keep your groups stress-free and fully accountable.",
      icon: <Bell />
    },
    { 
      title: "History", 
      desc: "Access a detailed history of every payment anytime. Eliminate disputes with clear records of who paid what. Build trust and maintain full transparency in groups.",
      icon: <History />
    },
    { 
      title: "Smart Assistant", 
      desc: "Receive personalized tips to save more and spend smarter. AI highlights trends, unnecessary costs, and better choices. Think of it as your own money advisor.",
      icon: <Brain />
    }
  ]
  

  return (
    <main className="bg-gray-50 text-gray-800">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 py-20 px-30 bg-gradient-to-r">
        <div className='flex flex-col gap-y-2 items-center md:items-start text-center md:text-left'>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Split Expenses easily and stress-free
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            <span ref={el} className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 font-extrabold text-3xl'></span><br/> with roommates, family and colleagues.
          </p>
          <button className="bg-white text-blue-600 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-blue-500 hover:text-white border transition duration-400">
            Get Started
          </button>
        </div>
        <div className='flex justify-center md:justify-end'>
          <img 
          src='https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg'
          className='w-full max-w-md md:max-w-lg'
          />
        </div>
      </section>

      {/* About Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center gap-20 py-30 px-30 bg-gray-100 text-center">
        <div className="relative w-72 h-96 mx-auto flex justify-center md:justify-end">
          <img 
            src="https://images.pexels.com/photos/4968385/pexels-photo-4968385.jpeg" 
            alt="img1" 
            className="w-60 h-72 object-cover rounded-xl shadow-lg absolute bottom-35 right-15 z-10"
          />
          <img 
            src="https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg" 
            alt="img2" 
            className="w-68 h-60 object-cover rounded-xl shadow-lg absolute top-30 left-40 z-9"
          />
          <img 
            src="https://images.pexels.com/photos/7111490/pexels-photo-7111490.jpeg" 
            alt="img3" 
            className="w-72 h-48 object-cover rounded-xl shadow-lg absolute top-55 right-25 z-8"
          />
        </div>
        <div className="flex flex-col gap-y-2 items-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">What is <span className='bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent'>Splits</span> about</h1>
          <p className="text-lg text-gray-700">
            Our mission is to make managing group expenses effortless. Whether you’re sharing rent with roommates, traveling with friends, or collaborating in a project, our platform ensures transparency and fairness in financial sharing. Keep tabs on your expenses, get your own curated expenses dashboard and much more!
          </p>
        </div>
        
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-6 mb-4">
          <span className="block text-gray-900">Experience the</span>
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300'>magic of Splits</span>
        </h2>
        <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-14'>
          Managing money with friends has never been simpler. Split, track, and settle in just a few taps.
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((f, i) => {
            const themes = [
              { 
                cardClass: 'hover:shadow-amber-100/50 ',
                gradientClass: 'bg-gradient-to-br from-amber-50 to-amber-100',
                iconClass: 'bg-amber-100 text-amber-600',
                borderClass: 'border-amber-200/50'
              },
              { 
                cardClass: 'hover:shadow-blue-100/50 ',
                gradientClass: 'bg-gradient-to-br from-blue-50 to-blue-100',
                iconClass: 'bg-blue-100 text-blue-600',
                borderClass: 'border-blue-200/50'
              },
              { 
                cardClass: 'hover:shadow-emerald-100/50',
                gradientClass: 'bg-gradient-to-br from-emerald-50 to-emerald-100',
                iconClass: 'bg-emerald-100 text-emerald-600',
                borderClass: 'border-emerald-200/50'
              },
              { 
                cardClass: 'hover:shadow-purple-100/50',
                gradientClass: 'bg-gradient-to-br from-purple-50 to-purple-100',
                iconClass: 'bg-purple-100 text-purple-600',
                borderClass: 'border-purple-200/50'
              },
              { 
                cardClass: 'hover:shadow-indigo-100/50',
                gradientClass: 'bg-gradient-to-br from-indigo-50 to-indigo-100',
                iconClass: 'bg-indigo-100 text-indigo-600',
                borderClass: 'border-indigo-200/50'
              },
              { 
                cardClass: 'hover:shadow-pink-100/50',
                gradientClass: 'bg-gradient-to-br from-pink-50 to-pink-100',
                iconClass: 'bg-pink-100 text-pink-600',
                borderClass: 'border-pink-200/50'
              }
            ]
            const theme = themes[i % themes.length]
            return (
            <div  
              className={`group relative rounded-3xl p-8 ${theme.gradientClass} border ${theme.borderClass} transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${theme.cardClass}`}
            >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl ${theme.iconClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                  >
                    {React.cloneElement(f.icon, { className: "h-6 w-6" })}
                  </div>

                  <div className='w-full flex items-center justify-center'>
                    <h3 className="text-xl font-bold   text-gray-900">
                    {f.title}
                    </h3>
                  </div>
                  
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {f.desc}
                </p>
            </div>
          )})}
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 px-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mt-6 mb-4">
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500 dark:from-blue-600 dark:to-cyan-400'>How It Works</span>
        </h2>
        <p className='text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-14'>
          Manage your finances and expenses in seconds! Completely hassle-free.
        </p>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { 
              title: "Create a Group", 
              desc: "Start by creating a group for your trip, rent, or project.",
              classes: {
                bgLight: "from-blue-100 to-blue-50",
                icon: "text-blue-600",
                blob: "bg-blue-500/10"
              },
              icon: Users
            },
            { 
              title: "Add Expenses", 
              desc: "Record expenses and select who participated.",
              classes: {
                bgLight: "from-purple-100 to-purple-50",
                icon: "text-purple-600",
                blob: "bg-purple-500/10"
              },
              icon: IndianRupee
            },
            {
              title: "Track Balances", 
              desc: "Automatically see who owes whom and how much.",
              classes: {
                bgLight: "from-amber-100 to-amber-50",
                icon: "text-amber-600",
                blob: "bg-amber-500/10"
              },
              icon: Scale
            },
            {
              title: "Settle Up", 
              desc: "Pay directly using UPI or cash and mark it as settled.",
              classes: {
                bgLight: "from-emerald-100 to-emerald-50",
                icon: "text-emerald-600",
                blob: "bg-emerald-500/10"
              },
              icon: HandCoins
            }
          ].map((s, i, arr) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/80  backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-2">
              <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full ${s.classes.blob} blur-xl`}></div>
              <div
                className={`w-14 h-14 rounded-xl bg-gradient-to-br ${s.classes.bgLight} flex items-center justify-center mb-5 shadow-inner group-hover:shadow-md transition-shadow`}
              >
                <s.icon
                  className={`h-7 w-7 ${s.classes.icon} group-hover:scale-110 transition-transform`}
                />
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-900 transition-colors">
                {s.title}
              </h3>
              <p className="text-gray-600 text-md mb-6 leading-relaxed group-hover:text-gray-700 transition-colors">
                {s.desc}
              </p>

              {/* {i < arr.length-1 && (
              <ArrowBigRight className='hidden md:block w-10 h-10 text-gray-400 flex-shrink-0' />
              )} */}
            </div>

            
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="pb-30 mt text-black text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to simplify your expenses?</h2>
        <button className="bg-white text-lg text-blue-600 font-semibold px-8 py-4 rounded-full shadow-lg hover:text-white hover:bg-blue-300 transition duration-400 outline-blue-500">
          Join Now
        </button>
      </section>
    </main>
  )
}

export default Landing