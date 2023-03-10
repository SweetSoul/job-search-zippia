import Head from "next/head";
import Link from "next/link";
import GenericBtn from "../components/Buttons/Generic/GenericBtn";
import Layout from "../components/Layout/Layout";

export default function Home() {
  return (
    <>
      <Head>
        <title>Zippia</title>
        <meta name="description" content="Job listing test" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <Layout>
        <div>
          <div className="grid place-items-center">
            <Link href="/test/jobs">
              <GenericBtn>Check out the jobs available</GenericBtn>
            </Link>
          </div>
        </div>
      </Layout>
    </>
  );
}
