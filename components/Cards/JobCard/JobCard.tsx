import Link from "next/link";
import { IJob } from "../../../@types/job.types";
import { sanitize } from "isomorphic-dompurify";
import { formatString } from "../../../utils/formatString";
import { useEffect, useRef, useState } from "react";
import { sanitizeUrl } from "../../../utils/sanitizeUrl";
import GenericBtn from "../../Buttons/Generic/GenericBtn";

interface IProps {
  job: IJob;
  className?: string;
}

type InnerHTML = { __html: string };

/**
 * Job card component
 * @param {IJob} job Job Object containing all the information for the card
 * @param {string} className Optional classnames to add to the card
 * @returns {JSX.Element}
 */
export default function JobCard({ job, className }: IProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [jobDescSanitized, setJobDescSanitized] = useState<InnerHTML>({
    __html: "",
  });
  const wrapperRef = useRef<HTMLDivElement>(null);
  const windowScrollY = useRef(0);
  const isExternal = !sanitizeUrl(job.OBJurl).includes("zippia.com");
  const compCoordinates = wrapperRef.current?.getBoundingClientRect();

  // translating to create the effect (animation) of the card expanding
  const expandedStyles = {
    transform: `translateX(-${compCoordinates?.left! - 24}px)`,
  };

  //This handles the toggle of expansion making sure to scroll to the top of the card
  // when the user closes the card, so it can continue reading the other cards
  function handleExpand() {
    if (!isExpanded) {
      windowScrollY.current = window.scrollY;
    } else {
      window.scrollTo(0, windowScrollY.current);
    }
    setIsExpanded(!isExpanded);
  }

  //Doing this trick so we can ensure to sanitize the URL
  //while still being able to use server side rendering
  useEffect(() => {
    if (isExpanded) {
      setJobDescSanitized({ __html: sanitize(job.jobDescription) });
    } else {
      setJobDescSanitized({ __html: formatString(job.jobDescription, 300) });
    }
  }, [isExpanded, job.jobDescription]);

  return (
    <div ref={wrapperRef} className={className}>
      <div
        hidden={!isExpanded}
        onClick={handleExpand}
        className="absolute top-0 left-0 z-40 h-full w-full rounded-xl bg-black bg-opacity-60 backdrop-blur"
      />
      <div
        style={isExpanded ? expandedStyles : {}}
        className={
          "translate-0 flex flex-col justify-between rounded-xl border border-stone-800 bg-white p-5 text-stone-800 transition-all duration-300 ease-in-out " +
          (isExpanded ? "absolute z-50 h-fit w-full" : "h-full")
        }
      >
        <div>
          <h2 className="font-sans text-lg font-bold">{job.jobTitle}</h2>
          <h4 className="mb-4 font-sans text-sm font-light">
            {job.companyName} - {job.postedDate}
          </h4>
          <p
            className="font-sans text-base font-normal"
            dangerouslySetInnerHTML={jobDescSanitized}
          />
        </div>
        <div className="mt-5 flex justify-center gap-4">
          <GenericBtn>
            <Link
              href={sanitizeUrl(job.jobURL)}
              referrerPolicy="no-referrer"
              target="_blank"
              className="flex items-center gap-2"
            >
              <span>Apply Now</span>
              {isExternal && (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 12 16"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M11 10h1v3c0 .55-.45 1-1 1H1c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1h3v1H1v10h10v-3zM6 2l2.25 2.25L5 7.5 6.5 9l3.25-3.25L12 8V2H6z"
                  ></path>
                </svg>
              )}
            </Link>
          </GenericBtn>
          <GenericBtn onClick={handleExpand}>
            {isExpanded ? "Show Less" : "Read More"}
          </GenericBtn>
        </div>
      </div>
    </div>
  );
}
