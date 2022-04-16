import { useState } from "react";
import IncomeAllocator from "../../components/IncomeAllocator";
import IncomeTaxForm from "../../components/IncomeTaxForm";
import { IncomeTaxFormConverted } from "../../validation/types";

const IncomeBreakdownCalculator = () => {
  const [taxBreakdown, setTaxBreakdown] = useState(
    null as IncomeTaxFormConverted | null
  );

  return (
    <div>
      <div className="card card-body p-6 about-con pabout">
        <h2 className="mb-4 font-weight-semibold">
          <u>General Information</u>
        </h2>
        <p className="leading-normal">
          In this section we provide you with a means to breakdown where your
          income is flowing.
        </p>
        <p className="leading-normal">
          For the gross pay and tax field breakdown form below, you can consult
          the{" "}
          <a
            href="https://www.adp.com/resources/tools/calculators/salary-paycheck-calculator.aspx"
            target="_blank"
          >
            <u>ADP paycheck calculator</u>
          </a>{" "}
          . Set the Gross Pay Method and Pay Frequency to "annual(ly)". We also
          recommend setting your Federal Allowances to "1". Run the calculations
          on the ADP page and copy the results into the tax breakdown form
          below.
        </p>
        <p className="leading-normal">
          Once you've set the tax breakdown, a chart will appear. You will
          likely have some unallocated funds still (appearing in green). Use the
          adjacent income allocator form to allocate the rest of your funds.
          Click on the different checkboxes to toggle between viewing your funds
          from an annual, monthly, or biweekly basis.
        </p>
      </div>{" "}
      <br />
      <br />
      <IncomeTaxForm setTaxBreakdown={setTaxBreakdown} />
      {taxBreakdown && (
        <IncomeAllocator
          taxBreakdown={taxBreakdown}
          setTaxBreakdown={setTaxBreakdown}
        />
      )}
    </div>
  );
};

export default IncomeBreakdownCalculator;
