import React, { useRef, useState } from "react";
import "../../../styles/sb-admin-2.min.css";
import { Chart } from "react-google-charts";



const Piee = ({ data, options, title }) => {
  return (
    <div className="col-xl-6 col-lg-5">
      <div className="card shadow mb-4">
        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
          <h6 className="m-0 font-weight-bold text-primary">{title}</h6>
        </div>
        <div className="card-body">
          <div className="chart-pie pt-4 pb-2">
            <Chart
              chartType="PieChart"
              data={data}
              options={options}
              width={"100%"}
              height={"310px"}
            />
          </div>
          <div className="mt-4 text-center small">
            <span className="mr-2">
              <i className="fas fa-circle text-primary"></i> Direct
            </span>
            <span className="mr-2">
              <i className="fas fa-circle text-success"></i> Social
            </span>
            <span className="mr-2">
              <i className="fas fa-circle text-info"></i> Referral
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Piee;
