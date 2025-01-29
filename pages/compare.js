import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { useCompare } from "../context/compareContext"; // Context API hook
import { debounce } from "lodash";
import Comparecard from "../components/Comparecard";
import Head from "next/head";
import Image from "next/image"; // Import Image from next/image for proper optimization

const Compare = () => {
  const {
    posts,
    searchResults,
    deviceDetails,
    fetchPosts,
    searchPosts,
    fetchDeviceDetails: fetchDeviceDetailsFromContext,
    setDeviceDetails,
  } = useCompare(); // Access the context
  const router = useRouter();
  const { device1, device2, device3, compare } = router.query;

  const [searchQuery1, setSearchQuery1] = useState("");
  const [searchQuery2, setSearchQuery2] = useState("");
  const [searchQuery3, setSearchQuery3] = useState("");
  const [fetchedDevices, setFetchedDevices] = useState({});

  const [selectedDevice1, setSelectedDevice1] = useState(null);
  const [selectedDevice2, setSelectedDevice2] = useState(null);
  const [selectedDevice3, setSelectedDevice3] = useState(null);

  // Fetch posts on initial load (Only once, by passing an empty dependency array)
  useEffect(() => {
    
    fetchPosts();
  }, []); // <-- The empty dependency array ensures this effect runs only once on mount

  // Automatically select devices if slugs are passed in the URL
  useEffect(() => {
  

    // Check each device and fetch details if a device is selected via URL
    if (device1 && !selectedDevice1) {
      handleSelectDevice(device1, 1); // Pass the slug directly to fetch details
    }

    if (device2 && !selectedDevice2) {
      handleSelectDevice(device2, 2); // Pass the slug directly to fetch details
    }

    if (device3 && !selectedDevice3) {
      handleSelectDevice(device3, 3); // Pass the slug directly to fetch details
    }
  }, [device1, device2, device3, selectedDevice1, selectedDevice2, selectedDevice3]);

  const fetchDeviceDetails = useCallback(
    (deviceSlug, index) => {
      if (fetchedDevices[deviceSlug]) {
       
        return;
      }

      

      fetchDeviceDetailsFromContext(deviceSlug, index).then((post) => {
       

        if (post) {
          setFetchedDevices((prev) => ({ ...prev, [deviceSlug]: post }));

          setDeviceDetails((prevState) => ({
            ...prevState,
            [`device${index}`]: post,
          }));

          if (index === 1) {
            setSelectedDevice1(post);
          } else if (index === 2) {
            setSelectedDevice2(post);
          } else if (index === 3) {
            setSelectedDevice3(post);
          }
        } else {
          console.error(`No details found for ${deviceSlug}`);
        }
      }).catch((err) => {
        console.error(`Error fetching details for ${deviceSlug}:`, err);
      });
    },
    [fetchedDevices, fetchDeviceDetailsFromContext, setDeviceDetails]
  );

  // Debounced search handler
  const handleSearch = (query) => {
   
    if (query) {
      searchPosts(query);
    } else {
      searchPosts(""); // Reset search results
    }
  };

  const debouncedSearch = useCallback(
    debounce((query) => handleSearch(query), 500),
    []
  );

  useEffect(() => {
   
    debouncedSearch(searchQuery1);
  }, [searchQuery1, debouncedSearch]);

  useEffect(() => {
   
    debouncedSearch(searchQuery2);
  }, [searchQuery2, debouncedSearch]);

  useEffect(() => {
    
    debouncedSearch(searchQuery3);
  }, [searchQuery3, debouncedSearch]);

  // Render search results for each device
  const renderSearchResults = (query, index) => {
    
    const results = searchResults.length ? searchResults : posts || [];
    const filteredResults = results.filter((device) =>
      device.title.toLowerCase().includes(query.toLowerCase())
    );

    return filteredResults.map((device) => (
      <div
        key={device.id}
        onClick={() => handleSelectDevice(device, index)}
        className="flex items-center gap-2 bg-white dark:bg-[#1d1c2a] dark:border-[#333146] border rounded-md p-2 my-1 cursor-pointer"
      >
        <Image
          className="w-10 h-10"
          src={device.featuredImage?.node?.sourceUrl || "/placeholder.jpg"} // Adding a fallback image
          alt={device.title || "Device image"}
          width={40}
          height={40}
        />
        <p className="text-wrap text-sm">{device.title}</p>
      </div>
    ));
  };

  const handleSelectDevice = (deviceSlug, index) => {
    

    // Ensure the deviceSlug is a string and not an object
    const slug = typeof deviceSlug === 'object' ? deviceSlug.slug : deviceSlug;

    // Fetch details using the slug
    fetchDeviceDetails(slug, index);

    // Update the selectedDevices state with the correct device based on index
    if (index === 1) {
      setSelectedDevice1({ slug }); // Ensure you set full device details here, not just slug
      setSearchQuery1(""); // Clear the search input when device is selected
    } else if (index === 2) {
      setSelectedDevice2({ slug });
      setSearchQuery2(""); // Clear the search input when device is selected
    } else if (index === 3) {
      setSelectedDevice3({ slug });
      setSearchQuery3(""); // Clear the search input when device is selected
    }

    // Update the URL with the selected device slug
    const newQuery = { ...router.query };
    newQuery[`device${index}`] = slug;
    
    router.push({
      pathname: router.pathname,
      query: newQuery,
    });
  };

  const cleanHTMLContent = (content) => {
    const div = document.createElement("div");
    div.innerHTML = content;
    const links = div.querySelectorAll("a");
    links.forEach((link) => {
      link.replaceWith(link.innerText);
    });

    const superscripts = div.querySelectorAll("sup");
    superscripts.forEach((sup) => {
      sup.replaceWith(sup.innerText);
    });

    return div.innerText.trim();
  };

  const extractSpecifications = (content) => {
    const regex =
      /<h4 class="wp-block-heading">(.+?)<\/h4>\s*<figure class="wp-block-table"><table class="has-fixed-layout">([\s\S]+?)<\/table><\/figure>/g;
    let matches;
    const specifications = {};

    while ((matches = regex.exec(content)) !== null) {
      const category = matches[1].trim();
      const tableData = matches[2];

      const rows = Array.from(
        tableData.matchAll(/<tr><td>(.*?)<\/td><td>(.*?)<\/td><\/tr>/g)
      );

      const categoryDetails = rows.map((row) => ({
        specification: cleanHTMLContent(row[1]),
        value: cleanHTMLContent(row[2]),
      }));

      specifications[category] = categoryDetails;
    }

    return specifications;
  };

  const renderComparisonTable = () => {
   
    const categories = [
      "General",
      "Display",
      "Hardware",
      "Camera",
      "Software",
      "Connectivity",
      "Sensors",
      "Battery",
    ];

    const device1Specs = selectedDevice1
      ? extractSpecifications(deviceDetails.device1?.content || "")
      : {};
    const device2Specs = selectedDevice2
      ? extractSpecifications(deviceDetails.device2?.content || "")
      : {};
    const device3Specs = selectedDevice3
      ? extractSpecifications(deviceDetails.device3?.content || "")
      : {};

    return (
      <div className="w-full overflow-x-auto">
        {categories.map((category) => {
          const device1CategorySpecs = device1Specs[category] || [];
          const device2CategorySpecs = device2Specs[category] || [];
          const device3CategorySpecs = device3Specs[category] || [];

          return (
            <div className="table-2" key={category}>
              <h4 className="text-lg font-bold mt-6 mb-3 dark:text-[#b3b3b6]">
                {category}
              </h4>
              <table className="tb-min">
                <thead>
                  <tr>
                    <th className="">Specifications</th>
                    <th className="">{selectedDevice1?.title || "Device 1"}</th>
                    <th className="">{selectedDevice2?.title || "Device 2"}</th>
                    <th className="">{selectedDevice3?.title || "Device 3"}</th>
                  </tr>
                </thead>
                <tbody>
                  {device1CategorySpecs.map((spec, idx) => (
                    <tr key={idx}>
                      <td>{spec.specification}</td>
                      <td>{spec.value || "N/A"}</td>
                      <td>{device2CategorySpecs[idx]?.value || "N/A"}</td>
                      <td>{device3CategorySpecs[idx]?.value || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="max-w-[1200px] mx-auto p-6">
      <Head>
        <title>Device Comparison - Compare Phones, Tablets & More</title>
        <meta
          name="description"
          content="Compare the best phones, tablets, and other devices. Explore detailed specifications and make informed purchasing decisions."
        />
      </Head>

      <div className="flex mb-6 w-full">
        <div className="compare-candidates mb-10 relative w-full">
          <div className="candidate-search">
            <form>
              <div className="flex w-full overflow-x-auto flex-nowrap whitespace-nowrap scrollbar-hidden">
                {[1, 2, 3].map((index) => (
                  <div
                    key={index}
                    className="min-w-[280px] w-full relative flex flex-col m-4"
                  >
                    <input
                      type="text"
                      className="st-input-cmp w-full p-3 border dark:bg-[#1d1c2a] focus:outline-none border-gray-300 dark:border-[#333146] rounded-md"
                      value={
                        index === 1
                          ? searchQuery1
                          : index === 2
                            ? searchQuery2
                            : searchQuery3
                      }
                      onChange={(e) => {
                       
                        if (index === 1) setSearchQuery1(e.target.value);
                        else if (index === 2) setSearchQuery2(e.target.value);
                        else setSearchQuery3(e.target.value);
                      }}
                      autoComplete="off"
                      placeholder={`Search Device ${index}`}
                    />
                    {/* Only render search results if device is not selected */}
                    {((index === 1 && !selectedDevice1) ||
                      (index === 2 && !selectedDevice2) ||
                      (index === 3 && !selectedDevice3)) &&
                      (index === 1
                        ? searchQuery1
                        : index === 2
                          ? searchQuery2
                          : searchQuery3) &&
                      renderSearchResults(
                        index === 1 ? searchQuery1 : index === 2 ? searchQuery2 : searchQuery3,
                        index
                      )}
                    {selectedDevice1 && deviceDetails.device1 && index === 1 && (
                      <Comparecard device={selectedDevice1} specifications={deviceDetails.device1} />
                    )}
                    {selectedDevice2 && deviceDetails.device2 && index === 2 && (
                      <Comparecard device={selectedDevice2} specifications={deviceDetails.device2} />
                    )}
                    {selectedDevice3 && deviceDetails.device3 && index === 3 && (
                      <Comparecard device={selectedDevice3} specifications={deviceDetails.device3} />
                    )}


                  </div>
                ))}
              </div>
            </form>
          </div>
        </div>
      </div>
      {renderComparisonTable()}
    </div>
  );
};

export default Compare;
