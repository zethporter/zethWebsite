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
            <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
              <span className="text-cyan-300 drop-shadow-md">Zeth</span>{" "}
              <span className="text-purple-300">Porter</span>
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <Link
                className="btn flex h-full max-w-xs flex-col justify-start gap-4 rounded-xl bg-white/10 p-4 text-left text-white hover:bg-white/20"
                href="/quixx"
              >
                <h3 className="text-2xl font-bold text-cyan-400">Quixx</h3>
                <div className="text-lg">
                  online free to use card for the dice game Quixx
                </div>
              </Link>
              <Link
                className="btn flex h-full max-w-xs flex-col justify-start gap-4 rounded-xl bg-white/10 p-4 text-left text-white hover:bg-white/20"
                href="/zoncore"
              >
                <h3 className="text-2xl font-bold text-violet-400">Zoncore</h3>
                <div className="text-lg">Zeth&apos;s version of Encore</div>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
