function HomePage({ user }) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold">Welcome to Basetopia</h1>
        {!user && <p className="mt-4">Please sign in to access all features</p>}
      </div>
    );
  }
  
  export default HomePage;