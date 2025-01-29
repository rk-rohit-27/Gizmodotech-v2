import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Toc = ({ content }) => {
  const [toc, setToc] = useState([]);

  useEffect(() => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    
    // Select h2, h3, h4 elements for headings
    const headers = doc.querySelectorAll("h2");

    const tocItems = Array.from(headers).map((header, index) => {
      let id = header.id;
      if (!id) {
        // If the heading has no ID, generate a new one
        id = header.textContent.replace(/\s+/g, "-").toLowerCase() + `-${index}`;
        header.setAttribute("id", id); // Assign the generated ID to the heading
      }

      return {
        id,
        text: header.textContent,
        tagName: header.tagName.toLowerCase(),
      };
    });

    // Update the ToC state
    setToc(tocItems);
  }, [content]);

  const handleScrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="blog-content text-sm text-[#292929] my-4">
      <div id="toc-placeholder" />
      {toc.length > 0 && (
        <div className="transition-all duration-500 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="text-2xl font-semibold mb-4 text-[#292929] dark:text-white">
              Table of Contents
            </div>
          </div>

          <div className="border-t-4 border-[#0D8888] rounded-xl bg-white dark:bg-[#333146] py-6 shadow-sm">
            <ul className="toc-list my-2 ml-1 px-4">
              {toc.map((item) => (
                <li
                  key={item.id}
                  className="toc-headings text-sm font-normal list-disc ml-8 opacity-80 tracking-wide leading-6 dark:text-[#f0f0f0]"
                >
                  <a
                    className=""
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollTo(item.id);
                    }}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

Toc.propTypes = {
  content: PropTypes.string.isRequired,
};

export default Toc;
