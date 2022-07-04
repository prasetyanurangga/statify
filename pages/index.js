import Head from 'next/head'
import Image from 'next/image'
import querystring from 'querystring'

function Home() {

  return (
    <>
      <Head>
        <title>Statify</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen bg-slate-50 py-6 px-4 sm:p-6 md:py-10 md:px-8 flex justify-center flex-col items-center">
        <h1 className="mt-1 text-lg font-semibold text-white sm:text-slate-900 md:text-2xl dark:sm:text-white">Statify</h1>
        <p className=" text-center mt-4 text-sm leading-6 col-start-1 sm:col-span-2 mb-8 lg:mt-2 lg:row-start-4 lg:col-span-1 dark:text-slate-400">
          This sunny and spacious room is for those traveling light and looking for a comfy and cosy place
        </p>
        <button type="button" onClick={handleLoginSpotify} className="drop-shadow-lg bg-white text-black font-semibold text-sm leading-6 py-2 px-3 rounded-full lg:w-1/4 w-full">
        🎶  Login with Spotify
        </button>
      </main>
    </>
  )
}

async function handleLoginSpotify()  {
  console.log(process.env)
  const client_id = process.env.CLIENT_ID_SPOTIFY;
  const scope = "user-top-read playlist-read-private";
  const redirect_uri = process.env.BASE_URI+'callback';
  const state = process.env.STATE;
  const url = 'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'token',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      code_challenge: state,
      code_challenge_method: "S256"
    });

  window.location.href = url;
}

export default Home;