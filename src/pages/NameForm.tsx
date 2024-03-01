'use client'
import { useState, FormEvent } from 'react';

export default function NameForm(): JSX.Element {
  const [name, setName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [gender, setGender] = useState<string>('');
  const [country, setCountry] = useState<string>('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const agifyResponse = await fetch(`https://api.agify.io?name=${name}`);
      const agifyData = await agifyResponse.json();

      const genderizeResponse = await fetch(`https://api.genderize.io?name=${name}`);
      const genderizeData = await genderizeResponse.json();

      const nationalizeResponse = await fetch(`https://api.nationalize.io?name=${name}`);
      const nationalizeData = await nationalizeResponse.json();

      setAge(agifyData.age);
      setGender(genderizeData.gender);

      if (nationalizeData.country.length > 0) {
        setCountry(nationalizeData.country[0].country_id);
      } else {
        setCountry('Unknown');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <div className='flex flex-col pt-20 items-center text-center text-white h-[100vh] flex-wrap px-4'>
      <h1 className='text-[1rem] md:text-[1.8rem] py-12 font-bold text-color font-heading'>Let's guess your Age, Gender and Country by your Name !!</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className='font-semibold gap-3 text-[14px] md:text-[1.5rem] w-[100%]'>
          Name:
          <input className="text-[14px] md:ml-4 md:text-lg text-center w-[100%] py-2 px-4 md:w-52 rounded-full border-0 bg-[rgba(25,15,26,1)] text-white shadow-md" type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <button className='text-[14px] md:text-lg my-5 p-2 w-[100%] md:w-58 rounded-full border-0 bg-[rgba(25,15,26,1)] text-white shadow-md hover:bg-[#74337a]' type="submit">Submit</button>
      </form>
      {age !== null && (
        <div className='text-[#c6c5c6] font-bold text-[1rem] md:text-[22px] flex flex-col gap-2'>
          <p className='text-[#923e92] text-[1.2rem] md:text-[24px] py-2'>Woohoo! I guessed...</p>
          <p>Age: {age}</p>
          <p>Gender: {capitalize(gender)}</p>
          <p>Country: {capitalize(country)}</p>
        </div>
      )}
    </div>
  );
}
