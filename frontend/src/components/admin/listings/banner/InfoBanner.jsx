// src/components/listings/Banner/InfoBanner.jsx

import { Play, ChevronRight } from "lucide-react";

import { infoBanner } from "../listingsData";

const InfoBanner = () => {
  return (
    <section className="mt-4">
      <div
        className="
          flex
          flex-col
          gap-4
          rounded-xl
          border
          border-[#9BE3B1]
          bg-[#EDF9EF]
          px-4
          py-3

          lg:flex-row
          lg:items-center
          lg:justify-between
        "
      >
        <div className="flex items-start gap-4">
          <div
            className="
              mt-0.5
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded
              border
              border-[#2E8B57]
              bg-white
            "
          >
            <Play
              size={16}
              className="fill-[#2E8B57] text-[#2E8B57] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="
                  rounded
                  bg-[#00BFA5]
                  px-2
                  py-1
                  text-[11px]
                  font-semibold
                  uppercase
                  tracking-wide
                  text-white
                "
              >
                New
              </span>

              <p className="text-[14px] font-medium text-gray-800">
                {infoBanner.title}
              </p>
            </div>

            <p className="mt-1 text-[13px] text-gray-500">
              {infoBanner.description}
            </p>
          </div>
        </div>

        <button
          className="
            flex
            items-center
             cursor-pointer
            gap-1
            self-start
            text-[14px]
            font-semibold
            text-[#2874F0]
            transition-colors
            hover:text-[#0F5BD3]

            lg:self-auto
          "
        >
          {infoBanner.actionText}

          <ChevronRight size={16} />
        </button>
      </div>
    </section>
  );
};

export default InfoBanner;
