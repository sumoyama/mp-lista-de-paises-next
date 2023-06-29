import Image from "next/image";

export default function Header () {
    return (
      <nav className="w-full bg-white h-16 flex items-center justify-center">
        <section className="container flex items-center gap-3">
        <Image 
          width={48}
          height={48}
          src="/logo.svg" 
          alt="Logo da aplicação - globo da terra"
        />
        <h1 className="font-bold text-2xl">Lista de Países</h1>
        </section>
      </nav>
    );

  }
