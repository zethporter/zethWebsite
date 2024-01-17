import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>zeth</title>
        <meta name="description" content="Zeth Porter Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gradient-to-r from-emerald-950/50 to-fuchsia-950/50">
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-cyan-950/50 to-purple-950/50">
          <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
            <h1 className="bg-gradient-to-r from-cyan-400 via-purple-300 to-purple-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-[5rem]">
              {/* <span className="text-cyan-300 drop-shadow-md">Zeth</span>{" "}
              <span className="text-purple-300">Porter</span> */}
              Zeth Porter
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <Link
                className="btn card glass flex h-full w-96 bg-white/10 p-4 text-left text-white hover:bg-white/20"
                href="/quixx"
              >
                <h3 className="text-2xl font-bold text-emerald-400">Quixx</h3>
              </Link>
              <Link
                className="btn card glass flex h-full w-96 bg-white/10 p-4 text-left text-white hover:bg-white/20"
                href="/pinochle"
              >
                <h3 className="text-2xl font-bold text-blue-400">Pinochle</h3>
              </Link>
              <Link
                className="btn card glass flex h-full w-96 bg-white/10 p-4 text-left text-white hover:bg-white/20"
                href="/skull-king"
              >
                <h3 className="text-2xl font-bold text-yellow-400">
                  Skull King
                </h3>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
