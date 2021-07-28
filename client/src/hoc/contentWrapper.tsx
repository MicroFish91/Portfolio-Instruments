import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import DashboardLayout from "../layouts/DashboardLayout";
import WithAuth from "./withAuth";

interface ContentWrapperProps {
  fallback: React.ComponentType<any>;
  children?: any;
}

const errorHandler = (error: Error, errorInfo: { componentStack: string }) => {
  console.log("Logging", error, errorInfo);
};

const ContentWrapper: React.FC<ContentWrapperProps> = (props) => {
  return (
    <WithAuth>
      <DashboardLayout>
        <ErrorBoundary
          FallbackComponent={props.fallback}
          onError={errorHandler}
        >
          {props.children}
        </ErrorBoundary>
      </DashboardLayout>
    </WithAuth>
  );
};

export default ContentWrapper;
