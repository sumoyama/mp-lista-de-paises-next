import { Country } from "@/app/types/country";
import CountryCards from "@/components/country-card";
import Image from "next/image";
import Link from "next/link";

async function getCountryByName(name:string): Promise<Country> {
  //com cash do fetch
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();
  return countries.find((country: Country)=> country.name.common == name)!;
}

async function getCountryByBordersName (name: string){
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries: Country[] = await response.json();
  const country = countries.find((country: Country)=> country.name.common == name)!;
  return country.borders?.map((border)=> {
    const borderCountry = countries.find(country => country.cca3 === border)!;
    return {
      name: borderCountry.name.common,
      ptName: borderCountry.translations.por.common,
      flag: borderCountry.flags.svg,
      flagAlt: borderCountry.flags.alt,
    }
  })
}
export default async function CountryPage(
  {params: {name}
} : {
  params: {name: string}
}){
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getCountryByBordersName(decodeURI(name));
  const formatter = Intl.NumberFormat("en", {notation:"compact"});
  return(
    <section className="flex flex-col container ">
       <h1 className="text-5xl text-center font-bold text-gray-800 mt-16 ">
        {country.translations.por.common}
      </h1> 
      <Link href='/' className="flex items-center">
        <Image src= '/arrow.svg' alt='Icone de seta de voltar' width={24} height={24}/>
        Voltar
      </Link>
      <article className="flex flex-row justify-between min-w-full p-10 bg-white rounded-xl mt-2">
          <section>
            {country.capital && (
              <h2 className="text-xl text-gray-800">
                <strong>🏙️ Capital: </strong> 
                {country.capital}
              </h2>
            )}
            <h2 className="text-xl text-gray-800">
              <strong> 🗺️ Conteinente: </strong>
              {country.region} {country.subregion && `- ${country.subregion}` }
            </h2>
            <h2 className="text-xl text-gray-800">
              <strong> 👨‍👩‍👧‍👦 População: </strong>
              {formatter.format(country.population)}
            </h2>
            {country.languages && (
              <h2 className="text-xl text-gray-800">
                <strong>🗣️ Idiomas Falados:  </strong>
                <br/>
                  {Object.values(country.languages).map((language)=> (
                    <span key={language} className="inline-block px-2 bg-indigo-700 mr-2 text-white rounded-full text-sm">
                      {language}
                  </span>
                  ))}
              </h2>
            )}
          </section>
          <div className="relative h-auto w-72 shadow-md">
            <Image
              src={country.flags.svg}
              alt={country.flags.alt}
              fill
              className="object-cover"
            />
          </div>
      </article>
      <section>
          <h3 className="mt-12 text-2xl font-semibold text-gray-800">Países que fazem fronteira</h3>
          {
            borderCountries?.length ? (
              <div className="grid grid-cols-5 w-full">
                {
                  borderCountries?.map((border)=> (
                    <CountryCards
                      key={border.name}
                      {...border}
                    />
                  ))
                }
              </div>
            ): (
              <h4 className="font-xl font-semibold text-red-400 mt-2">Não há nenhum país que faça fronteira</h4>
            )
          }
      </section>
    </section>
  ) 
}