import { Form, Formik } from "formik";
import React from "react";
import { allocationCategoryFormSchema } from "../../../validation/incomeBreakdown";
import { AllocationCategoryForm } from "../../../validation/types";
import Button from "../../forms/Button";
import InputField from "../../forms/InputField";
import { getUnallocated } from "../utils";

interface allocationFormProps {
  allocations: number[];
  grossLimit: number;
  incomeBreakdown: Record<string, number>;
  setIncomeBreakdown: (ib: Record<string, number>) => void;
}

const AllocationForm: React.FC<allocationFormProps> = ({
  allocations,
  grossLimit,
  incomeBreakdown,
  setIncomeBreakdown,
}) => {
  const submitAllocation = (holding: AllocationCategoryForm, actions: any) => {
    const unallocated = getUnallocated(allocations, grossLimit);
    const ib = {
      [`${holding.allocationLabel}`]: parseFloat(
        (
          parseFloat(holding.allocationAmount) *
          parseFloat(holding.periodsPerYear)
        ).toFixed(2)
      ),
    };

    if (ib[`${holding.allocationLabel}`] > unallocated) {
      alert("Entered amount exceeds limits, please try again.");
    } else {
      setIncomeBreakdown({ ...incomeBreakdown, ...ib });
    }

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={
        {
          allocationLabel: "",
          allocationAmount: "",
          periodsPerYear: "",
        } as AllocationCategoryForm
      }
      validationSchema={allocationCategoryFormSchema}
      onSubmit={(values, actions) => submitAllocation(values, actions)}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6 col-lg-6">
              <InputField
                label="Allocation Label"
                name="allocationLabel"
                placeholder="Ex. Housing"
                type="text"
                value={values.allocationLabel}
                onChange={(e) =>
                  setFieldValue("allocationLabel", e.target.value)
                }
              />
              <InputField
                label="Periods per Year"
                name="periodsPerYear"
                placeholder="Ex. 12 (represents monthly investment)"
                type="text"
                value={values.periodsPerYear}
                onChange={(e) =>
                  setFieldValue("periodsPerYear", e.target.value)
                }
              />
            </div>

            {/* Right Column */}
            <div className="col-md-6 col-lg-6">
              <InputField
                label="Allocation Amount ($)"
                name="allocationAmount"
                placeholder="Ex. 3500"
                type="text"
                value={values.allocationAmount}
                onChange={(e) =>
                  setFieldValue("allocationAmount", e.target.value)
                }
              />
            </div>
            <div className="ml-3">
              <Button title="Add Category" />
              <Button title="Reset Fields" type="reset" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AllocationForm;
