import React from "react";

interface TitleProps {
  majorTitle: string;
  minorTitle: string;
}

const Title: React.FC<TitleProps> = ({ majorTitle, minorTitle }) => {
  return (
    <div>
      <div className="page-header">
        <h4 className="page-title">{majorTitle}</h4>

        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">{minorTitle}</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {majorTitle}
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Title;
