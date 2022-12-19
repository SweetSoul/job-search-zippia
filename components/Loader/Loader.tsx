import Image from "next/image";

interface Props {
  fullPage?: boolean;
  isLoading?: boolean;
}

export default function Loader({ fullPage, isLoading }: Props) {
  // returning null so we don't render anything if we are not loading
  if (!isLoading) return null;

  return (
    <div
      className={`inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 ${
        fullPage ? "fixed h-screen w-screen" : "absolute h-full w-full"
      }`}
    >
      <Image
        src="/assets/loader.svg"
        width={50}
        height={50}
        alt="Loader"
        role="presentation"
      />
    </div>
  );
}
