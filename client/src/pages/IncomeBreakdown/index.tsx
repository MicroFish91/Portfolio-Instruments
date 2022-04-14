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
      <IncomeTaxForm setTaxBreakdown={setTaxBreakdown} />
      {taxBreakdown && <IncomeAllocator />}
    </div>
  );
};

export default IncomeBreakdownCalculator;
