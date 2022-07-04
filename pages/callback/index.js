import Head from 'next/head'
import Image from 'next/image'
import queryString from 'querystring'
import React, { useEffect } from "react";
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'

function Callback() {

  const router = useRouter()

  useEffect(() => {
    const status = true;
    const parsed = queryString.parse(location.hash.slice(1));

    if(status){
      addAccessTokenToCookie(parsed.access_token)
      router.push("/result")
    }
  }, []);

  function addAccessTokenToCookie(accessToken){
    Cookies.set('access_token', accessToken, {
      expires: 1 / 24
    });
  }

  return (
    <>
      <Head>
        <title>Statify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen bg-slate-50 py-6 px-4 sm:p-6 md:py-10 md:px-8 flex justify-center flex-col items-center">
        <p className=" text-center mt-4 text-sm leading-6 col-start-1 sm:col-span-2 mb-8 lg:mt-2 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
          Please wait while we authenticate Spotify...
        </p>
      </main>
    </>
  )
}


export default Callback;
