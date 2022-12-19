import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRef, useState } from "react";
import { IJob } from "../../../@types/job.types";
import GenericBtn from "../../../components/Buttons/Generic/GenericBtn";
import JobCard from "../../../components/Cards/JobCard/JobCard";
import Layout from "../../../components/Layout/Layout";

type Data = { jobs: IJob[] };

export const getServerSideProps: GetServerSideProps<{ data: Data }> = async ({
  res,
}) => {
  // Set the cache control to the HTTP header,
  // so the page is cached for 30 seconds and if the cache is stale,
  // it will be revalidated in the background for another 360 seconds
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=30, stale-while-revalidate=360"
  );
  const response = await fetch("https://www.zippia.com/api/jobs/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companySkills: true,
      dismissedListingHashes: [],
      fetchJobDesc: true,
      jobTitle: "Business Analyst",
      locations: [],
      numJobs: 20,
      previousListingHashes: [],
    }),
  });

  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};

export interface IProps {
  data: {
    jobs: IJob[];
  };
}

/**
 * Job Listing Page
 * @param props Those props are coming from the getServerSideProps
 * @returns {JSX.Element}
 */
export default function JobListingPage(props: IProps) {
  const [jobs, setJobs] = useState<IJob[]>(props?.data?.jobs || []);
  const [filtered, setFiltered] = useState(false);
  const [sorted, setSorted] = useState(false);

  //Ideally we would sort this using the API
  /**
   * If sorted is true, then setJobs to the props data jobs, setSorted to false, and setFiltered to
   * false.
   * If sorted is false, then sort the jobs by company name, setJobs to the sorted jobs, and setSorted
   * to true
   */
  function handleSortByCompanyName() {
    if (sorted) {
      setJobs(props?.data?.jobs || []);
      setSorted(false);
      setFiltered(false);
      return;
    }
    const sortedJobs = [...jobs].sort((a, b) => {
      if (a.companyName < b.companyName) {
        return -1;
      }
      if (a.companyName > b.companyName) {
        return 1;
      }
      return 0;
    });
    setJobs(sortedJobs);
    setSorted(true);
  }

  //Ideally we would filter this using the API
  /**
   * If the filtered state is true, then set the jobs state to the props data jobs or an empty array,
   * set the sorted state to false, set the filtered state to false, and return.
   *
   * If the filtered state is false, then set the filteredJobs state to a copy of the jobs state,
   * filter the filteredJobs state by the difference between today's date and the job's posting date,
   * and set the jobs state to the filteredJobs state.
   */
  function handleFilterByLastWeek() {
    if (filtered) {
      setJobs(props?.data?.jobs || []);
      setSorted(false);
      setFiltered(false);
      return;
    }
    const filteredJobs = [...jobs].filter((job) => {
      const today = new Date();
      const jobDate = new Date(job.postingDate);
      const diffTime = Math.abs(today.getTime() - jobDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 7;
    });
    setJobs(filteredJobs);
    setFiltered(true);
  }

  return (
    <>
      <Head>
        <title>Job Listing</title>
        <meta name="description" content="Test of Job Listing to Zippia" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/assets/favicon.ico" />
      </Head>
      <Layout>
        <h2 className="mb-5 text-center font-sans text-2xl font-medium">
          Jobs available
        </h2>
        <div className="mb-5 flex justify-center gap-3">
          <GenericBtn
            onClick={handleSortByCompanyName}
            color="bg-violet-200 text-stone-800"
          >
            <span>{sorted ? "Remove sorting" : "Sort by company name"}</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M839.6 433.8L749 150.5a9.24 9.24 0 0 0-8.9-6.5h-77.4c-4.1 0-7.6 2.6-8.9 6.5l-91.3 283.3c-.3.9-.5 1.9-.5 2.9 0 5.1 4.2 9.3 9.3 9.3h56.4c4.2 0 7.8-2.8 9-6.8l17.5-61.6h89l17.3 61.5c1.1 4 4.8 6.8 9 6.8h61.2c1 0 1.9-.1 2.8-.4 2.4-.8 4.3-2.4 5.5-4.6 1.1-2.2 1.3-4.7.6-7.1zM663.3 325.5l32.8-116.9h6.3l32.1 116.9h-71.2zm143.5 492.9H677.2v-.4l132.6-188.9c1.1-1.6 1.7-3.4 1.7-5.4v-36.4c0-5.1-4.2-9.3-9.3-9.3h-204c-5.1 0-9.3 4.2-9.3 9.3v43c0 5.1 4.2 9.3 9.3 9.3h122.6v.4L587.7 828.9a9.35 9.35 0 0 0-1.7 5.4v36.4c0 5.1 4.2 9.3 9.3 9.3h211.4c5.1 0 9.3-4.2 9.3-9.3v-43a9.2 9.2 0 0 0-9.2-9.3zM416 702h-76V172c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v530h-76c-6.7 0-10.5 7.8-6.3 13l112 141.9a8 8 0 0 0 12.6 0l112-141.9c4.1-5.2.4-13-6.3-13z"></path>
            </svg>
          </GenericBtn>
          <GenericBtn
            onClick={handleFilterByLastWeek}
            color="bg-violet-200 text-stone-800"
          >
            <span>{filtered ? "Show all" : "Show only from 7 days"}</span>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
            </svg>
          </GenericBtn>
        </div>
        <div className="relative grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {!!jobs.length &&
            jobs.map((job) => {
              return <JobCard key={job.jobId} job={job} />;
            })}
        </div>
      </Layout>
    </>
  );
}
