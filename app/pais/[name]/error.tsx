"use client"
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-4">Oops! Ocorreu um erro ao exbir o país!.</h1>
        <Link href='/' className="flex items-center">
        <Image src= '/arrow.svg' alt='Icone de seta de voltar' width={24} height={24}/>
        Voltar
      </Link>
    </div>
  );
};

export default ErrorPage;
