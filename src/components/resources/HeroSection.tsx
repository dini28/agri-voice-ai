const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&auto=format"
          alt="Agricultural resources background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 drop-shadow-lg">
            Agricultural Resources
          </h1>
          <p className="text-2xl md:text-3xl text-white/90 mb-6 drop-shadow-md">
            Knowledge Hub for Farmers
          </p>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-3xl mx-auto drop-shadow-md mb-8">
            Complete collection of essential information, guides, videos and live data for farmers.
            All the resources you need for successful agriculture in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
