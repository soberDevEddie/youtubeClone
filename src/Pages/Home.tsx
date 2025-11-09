import Card from '../Components/Card';

function Home() {
  return (
    <div className='row row-cols-3 w-[95%] mx-auto mt-6'>
      {[...Array(12)].map((item) => (
        <Card />
      ))}
    </div>
  );
}

export default Home;
