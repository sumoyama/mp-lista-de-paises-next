import Image from "next/image";
import Link from "next/link";
import { Country } from "@/app/types/country";
import CountryCards from "@/components/country-card";

async function getContries () : Promise<Country[]> {
  const response = await fetch("https://restcountries.com/v3.1/all");
  return response.json();
}
export default async function Home() {
  const countries = await getContries();
  return (
    <section className="grid grid-cols-5 w-full container gap-2 mt-16 ">
       { countries.map((country)=> (
          <CountryCards 
            key={country.name.common}
            name = {country.name.common}
            ptName= {country.translations.por.common}
            flag= {country.flags.svg}
            flagAlt={country.flags.alt}
          />
       ))}
    </section>
  )
}
