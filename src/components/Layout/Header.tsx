import { Info } from "lucide-react";
import { useState } from "react";
import DVRPCMini from "@/assets/dvrpc-mini.svg?react";
import InformationModal from "./InformationModal";

export default function Header() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <header className="relative z-30 flex min-h-15 items-center gap-4 border-b border-dvrpc-gray-7 py-1 pl-5 pr-4 text-dvrpc-blue-3 sm:pl-8">
      <a
        href="https://www.dvrpc.org/"
        target="_blank"
        rel="noreferrer"
        aria-label="DVRPC Main Website"
      >
        <DVRPCMini className="h-12 mt-3 w-auto" />
      </a>
      <h1 className="min-w-0 border-l-3 pl-4 text-xl font-bold sm:text-3xl">
        Permanent Bicycle and Pedestrian Counters
      </h1>
      <div className="ml-auto shrink-0">
        <button
          type="button"
          className="flex items-center gap-2 rounded border border-dvrpc-blue-3 px-3 py-2 text-sm font-semibold transition-colors hover:bg-dvrpc-blue-3 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dvrpc-blue-3"
          aria-expanded={isInfoOpen}
          aria-controls="site-information"
          aria-label="About this map"
          onClick={() => setIsInfoOpen((isOpen) => !isOpen)}
        >
          <Info size={18} aria-hidden="true" />
          <span className="hidden sm:inline">About</span>
        </button>

      </div>
      {isInfoOpen && <InformationModal onClose={() => setIsInfoOpen(false)} />}
    </header>
  );
}
