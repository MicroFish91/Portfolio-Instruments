import { useState } from "react";
import CAGBar from "../../components/CAGBar";
import CAGForm from "../../components/CAGForm";
import { CagFormConverted } from "../../validation/types";

const CompoundAnnualGrowth = () => {
  const [growthSettings, setGrowthSettings] = useState(
    null as CagFormConverted | null
  );

  return (
    <div>
      <div className="card card-body p-6 about-con pabout">
        <h2 className="mb-4 font-weight-semibold">
          <u>General Information</u>
        </h2>
        <p className="leading-normal">
          In this section we provide you with a means to forecast the growth of
          your portfolio by entering in a small set of prediction parameters.
        </p>
        <p className="leading-normal">
          The variables used are: (1) the portofolio's principal or starting
          value, (2) the average annual inflation rate to expect moving forward,
          (3) the average annual absolute return rate expected for your
          portfolio moving forward, (4) the standard deviation related to the
          expected return of your portfolio [optional - may use 0], (5) number
          of years into the future to project, (6) how many times a year you
          will be adding money to the portfolio (e.g. monthly = 12), (7) amount
          of money you invest at each interval, (8) your estimated amount of
          money you currently require to maintain your standard of living (don't
          include what you're investing, only what you are using), and (9) your
          expected safe withdrawal rate in retirement [typically defaults to
          4%].
        </p>
        <p className="leading-normal">
          Using these parameters, we will compute your safe withdrawal rate
          adjusted for inflation. We also adjust your recurring investment
          amount each year. This means if you enter a 3% annual inflation rate,
          we will also increase your recurring investment amount by 3% each
          year.
        </p>
        <p className="leading-normal">
          If you provide a standard deviation, we will show the upper and lower
          boundaries of what your portfolio could produce over a given length of
          time. Note that these differences are compounded over time and can
          become quite large. Typically you want to focus on the blue average
          return. You can find rough estimates for your average return and
          standard deviation values on the{" "}
          <a href="https://portfoliocharts.com/" target="_blank">
            <u>Portfolio Charts</u>
          </a>{" "}
          (no affiliation) website.
        </p>
      </div>{" "}
      <br />
      <CAGForm setGrowthSettings={setGrowthSettings} />
      {growthSettings && <CAGBar growthSettings={growthSettings} />}
    </div>
  );
};

export default CompoundAnnualGrowth;
