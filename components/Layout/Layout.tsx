import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--inter" });

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  return (
    <>
      <header className="flex w-screen items-center justify-between bg-stone-800 px-24 py-6">
        <Link href="/">
          <h1>
            <Image
              src="/assets/full.png"
              alt="Zippia"
              width={641 / 3}
              height={144 / 3}
            />
          </h1>
        </Link>
        <div>
          <Link
            href="/test/jobs"
            className="text-lg font-medium tracking-wide text-white active:underline"
          >
            JOBS
          </Link>
        </div>
      </header>
      <main
        className={`${inter.variable} min-w-screen min-h-screen bg-stone-100 px-6 py-6 font-sans`}
      >
        {props.children}
      </main>
    </>
  );
}
