import React from "react";

function ReadMore() {
  return (
    <>
      <div >
        {/* You can open the modal using document.getElementById('ID').showModal() method */}
        <button
          className="btn"
          onClick={() => document.getElementById("my_modal_3").showModal()}
        >
          Read More<i class="fa-solid fa-arrow-right"></i>
        </button>
        <dialog id="my_modal_3" className="modal dark:bg-black dark:text-white">
          <div className="modal-box w-11/12 max-w-7xl text-black dark:bg-[#222] dark:text-stone-50">
            <div className="p-10 ">
              <h1 className="font-bold text-3xl">
                About Our Legal AI Services
              </h1>
              <p className="py-4">
                In the legal sector, handling large volumes of documents is a
                routine but essential task. Legal practitioners, researchers,
                and even clients frequently deal with extensive paperwork that
                demands careful review and analysis. However, this manual
                process is time-consuming, prone to errors, and can lead to
                inefficiencies within the legal workflow. Our solution aims to
                address these challenges through the power of Artificial
                Intelligence and Machine Learning.
              </p>
              <hr className="my-5"></hr>
              <h1 className="font-bold text-2xl">
                Automated Summarization and Classification of Legal Documents
              </h1>
              <p className="py-4">
                Our AI-based service specializes in summarizing and classifying
                legal documents to streamline legal processes. By leveraging
                advanced machine learning (ML) techniques, we have developed
                tools that assist legal professionals in managing information
                overload, improving accuracy, and enhancing workflow efficiency.
              </p>
              <hr className="my-5"></hr>
              <h1 className="font-bold text-2xl">
                Why Legal AI Solutions Matter
              </h1>
              <p className="py-4 ">
                The legal field often requires the review of complex documents
                filled with intricate legal language and terminology. Whether
                it's contracts, case law, or court proceedings, legal
                professionals must dedicate significant time and effort to
                manually analyze and organize these documents. However, this
                manual approach has several drawbacks:
              </p>
              <ul className="list-inside px-7 py-4">
                <li>
                  <span className="font-bold">
                    Time-Consuming Review Process:
                  </span>
                  &nbsp; Legal practitioners need to go through long, detailed
                  documents, which can take hours, if not days, to complete.
                </li>
                <li>
                  <span className="font-bold">
                    Manual Categorization Issues:
                  </span>
                  &nbsp; Organizing documents into relevant categories requires
                  a comprehensive understanding of the legal content, making it
                  a labor-intensive task
                </li>
                <li>
                  <span className="font-bold">Complex Terminology:</span>
                  &nbsp; Clients or individuals without a legal background often
                  struggle to comprehend legal statements, which can lead to
                  misunderstandings
                </li>
                <li>
                  <span className="font-bold">Prone to Errors:</span>
                  &nbsp; Manual processing can result in errors, and in the
                  legal field, such errors can have serious consequences. Our
                  AI-driven solutions are designed to address these issues and
                  improve the overall functioning of the legal system.
                </li>
              </ul>
              <hr className="my-5"></hr>
              <h1 className="font-bold text-2xl">Our Solutions</h1>
              <p className="py-4">
                We offer a suite of services that focus on making legal document
                processing more efficient and error-free:
                <br></br>
                <br></br>
                <h1 className="text-xl font-bold">
                  Automate Legal Document Summarization:
                </h1>
                <p className="py-4">
                  Our ML models generate accurate, concise summaries of legal
                  documents, drastically reducing the time required for manual
                  review. This allows legal professionals to focus on critical
                  tasks instead of sifting through lengthy texts. The
                  summarization process is customizable, offering flexibility to
                  suit different user needs, whether it’s for lawyers, judges,
                  researchers, or clients.
                </p>
                <h1 className="text-xl font-bold">
                  Classify Documents by Case Type:
                </h1>
                <p className="py-4">
                  We’ve developed systems that categorize legal documents into
                  relevant case types, such as civil, criminal, taxation, etc.
                  This improves the organization and retrieval of information,
                  making it easier for users to find what they need. The
                  classification model enhances searchability, allowing legal
                  practitioners to quickly locate case law, precedents, and
                  statutes based on legal issues or specific sections.
                </p>
              </p>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </>
  );
}

export default ReadMore;
