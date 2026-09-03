import { X } from "lucide-react";
import { useEffect, useState } from "react";

type InformationModalProps = {
  onClose: () => void;
};

export default function InformationModal({ onClose }: InformationModalProps) {
  const [activeTab, setActiveTab] = useState<"about" | "contact">("about");

  useEffect(() => {
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-dvrpc-gray-1/45 p-4"
      role="presentation"
      onMouseDown={onClose}
    >
      <section
        id="site-information"
        role="dialog"
        aria-modal="true"
        aria-labelledby="information-title"
        className="w-full max-w-4xl overflow-hidden rounded-md border border-dvrpc-gray-6 bg-white text-dvrpc-gray-1 shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-dvrpc-gray-7 px-5 py-4">
          <h2
            id="information-title"
            className="text-lg font-bold text-dvrpc-blue-1"
          >
            Permanent Bicycle and Pedestrian Counters
          </h2>
          <button
            type="button"
            className="rounded p-1 text-dvrpc-gray-2 hover:bg-dvrpc-gray-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dvrpc-blue-3"
            onClick={onClose}
            aria-label="Close information dialog"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <div
          className="flex border-b border-dvrpc-gray-7 px-5"
          role="tablist"
          aria-label="Information sections"
        >
          {(["about", "contact"] as const).map((tab) => (
            <button
              key={tab}
              id={`${tab}-tab`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab}-panel`}
              className={`border-b-3 px-4 py-3 text-sm font-semibold capitalize transition-colors ${
                activeTab === tab
                  ? "border-dvrpc-blue-3 text-dvrpc-blue-3"
                  : "border-transparent text-dvrpc-gray-3 hover:text-dvrpc-blue-3"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="px-5 py-5 text-sm leading-6">
          {activeTab === "about" ? (
            <div id="about-panel" role="tabpanel" aria-labelledby="about-tab">
              <p>
                DVRPC uses permanently-installed counters to document use of the
                region’s Circuit Trails network as well as on-road bicycle
                facilities. This interactive map provides a snapshot of this
                data in a simple, user-friendly format allowing users to explore
                counts from throughout the region. DVRPC also takes
                short-duration bicycle and pedestrian counts. View the data from
                these counts in the{" "}
                <a
                  href="https://www.dvrpc.org/webmaps/trafficcounts/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Traffic Count Webmap
                </a>
              </p>
              <br />
              <p>
                DVRPC personnel installed and maintain the equipment on an
                ongoing basis. Additional funding for acquisition of the
                counters was provided by the{" "}
                <a
                  href="https://www.williampennfoundation.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  William Penn Foundation
                </a>
                ,{" "}
                <a
                  href="https://pecpa.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Pennsylvania Environmental Council
                </a>
                , and{" "}
                <a
                  href="https://www.schuylkillbanks.org/about"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Schuylkill River Development Corporation
                </a>
                . While every effort is made on the part of DVRPC to provide
                valid and current information, DVRPC makes no representation nor
                warranties, express or implied, about the validity of this
                information and is not to be held responsible for errors in data
                obtained from this website.
              </p>
              <br />
              <div className="p-2 bg-dvrpc-blue-7 rounded-md shadow-sm">
                <p>
                  This web page is a public resource of general information. The
                  Delaware Valley Regional Planning Commission (DVRPC) makes no
                  warranty, representation, or guarantee as to the content,
                  sequence, accuracy, timeliness, or completeness of any of the
                  spatial data or database information provided herein. DVRPC
                  and partner state, local, and other agencies shall assume no
                  liability for errors, omissions, or inaccuracies in the
                  information provided regardless of how caused; or any decision
                  made or action taken or not taken by any person relying on any
                  information or data furnished within.
                </p>
                <br />
                <p>
                  For more information, view{" "}
                  <a
                    href="https://www.dvrpc.org/Policies/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://www.dvrpc.org/Policies/
                  </a>
                </p>
              </div>
            </div>
          ) : (
            <div
              id="contact-panel"
              role="tabpanel"
              aria-labelledby="contact-tab"
              className="space-y-5"
            >
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-base font-bold text-dvrpc-gray-1">
                    Office of Travel Monitoring
                  </h3>

                  <div className="space-y-3 pl-1">
                    <div>
                      <p>Josh Rocks, Manager</p>
                      <p>(215) 238-2854</p>
                      <a
                        className="text-dvrpc-blue-3 underline underline-offset-2"
                        href="mailto:jrocks@dvrpc.org"
                      >
                        jrocks@dvrpc.org
                      </a>
                    </div>

                    <div>
                      <p>Jonathan Ferullo, Associate Manager</p>
                      <p>(215) 238-2883</p>
                      <a
                        className="text-dvrpc-blue-3 underline underline-offset-2"
                        href="mailto:jferullo@dvrpc.org"
                      >
                        jferullo@dvrpc.org
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-base font-bold text-dvrpc-gray-1">
                    Office of Environmental Planning
                  </h3>

                  <div className="pl-1">
                    <p>
                      Shawn Megill Legendre, Manager, Regional Trails Program
                    </p>
                    <p>(215) 238-2934</p>
                    <a
                      className="text-dvrpc-blue-3 underline underline-offset-2"
                      href="mailto:slegendre@dvrpc.org"
                    >
                      slegendre@dvrpc.org
                    </a>
                  </div>
                </div>

                <div>
                  <h3 className="mb-2 text-base font-bold text-dvrpc-gray-1">
                    Office of Transit, Bicycle, and Pedestrian Planning
                  </h3>

                  <div className="pl-1">
                    <p>
                      Cassidy Boulan, AICP, Assistant Manager, Bicycle Programs
                    </p>
                    <p>(215) 238-2832</p>
                    <a
                      className="text-dvrpc-blue-3 underline underline-offset-2"
                      href="mailto:cboulane@dvrpc.org"
                    >
                      cboulane@dvrpc.org
                    </a>
                  </div>
                </div>

                <div className="pt-1">
                  <p className="font-semibold text-dvrpc-gray-1">
                    DVRPC Main Number:{" "}
                    <span className="font-normal">(215) 592-1800</span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
