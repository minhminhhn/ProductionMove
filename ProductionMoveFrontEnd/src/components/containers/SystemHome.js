import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../js/sb-admin-2.min";
import "../../vendor/jquery/jquery.min";
import "../../vendor/bootstrap/js/bootstrap.bundle.min";
import "../../styles/sb-admin-2.min.css";
import "../../styles/font.css";
import "../../styles/HomeSystem.css";
import Chart from "../sub_components/homesystem/chart/Chart";
import Piee from "../sub_components/homesystem/PieChart";
import { roles } from "../../untils/constant";
import { useEffect } from "react";
import useCallApi from "../../untils/fetch";
import { apiUrls } from "../../untils/constant";
import { motion } from "framer-motion";
import { parseMonths, parseModels, statisAgency } from "../../untils/parseData";

const AgencyStatistic = () => {
  const account = useSelector((state) => state.user.account);
  const [purchases, setPurchases] = useState([]);
  const [models, setModels] = useState([["Model", "Total"]]);

  const options = {
    title: "Productlines",
  };

  useEffect(async () => {
    const purchasesRes = await useCallApi(apiUrls.GET_PRODUCTS_BY_QUERY, {
      associates: {
        purchase: {
          customer: true,
          dealer: true,
        },
        model: true,
      },
    })
      .then(({ data }) => {
        const products = data.rows;
        const productsFilter = products.filter((product) => {
          return product?.purchase && product.purchase.dealer.id === account.id;
        });
        // console.log(productsFilter)
        setPurchases(parseMonths(productsFilter));
        setModels(parseModels(productsFilter));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row">
        <Chart data={purchases} />
      </div>
      <div className="row">
        <Piee data={models} title={"Productlines"} />
      </div>
    </>
  );
};

const AdminStatistic = () => {
  const account = useSelector((state) => state.user.account);
  const [purchases, setPurchases] = useState([]);
  const [models, setModels] = useState([["Model", "Total"]]);
  const [agencies, setAgencies] = useState([["Agency", "Total"]]);

  const options = {
    title: "Productlines",
  };

  useEffect(async () => {
    const purchasesRes = await useCallApi(apiUrls.GET_PRODUCTS_BY_QUERY, {
      associates: {
        purchase: {
          customer: true,
          dealer: true,
        },
        model: true,
      },
    })
      .then(({ data }) => {
        const products = data.rows;
        const productsFilter = products.filter((product) => {
          return product?.purchase;
        });
        // console.log(productsFilter)
        setPurchases(parseMonths(productsFilter));
        setModels(parseModels(productsFilter));
        setAgencies(statisAgency(productsFilter));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="row">
        <Chart data={purchases} />
      </div>
      <div className="row">
        <Piee data={models} title={"Productlines"} />
        <Piee data={agencies} title={"Agencies"} />
      </div>
    </>
  );
};

const OtherStatic = () => {
  const paths = [lightning, hand, plane, heart, note, star, lightning];
  const colors = [
    "#00cc88",
    "#0099ff",
    "#8855ff",
    "#ff0055",
    "#ee4444",
    "#ffcc00",
    "#00cc88",
  ];

  const [pathIndex, setPathIndex] = useState(0);
  const progress = useMotionValue(pathIndex);
  const fill = useTransform(progress, paths.map(getIndex), colors);
  const path = useFlubber(progress, paths);

  React.useEffect(() => {
    const animation = animate(progress, pathIndex, {
      duration: 0.8,
      ease: "easeInOut",
      onComplete: () => {
        if (pathIndex === paths.length - 1) {
          progress.set(0);
          setPathIndex(1);
        } else {
          setPathIndex(pathIndex + 1);
        }
      }
    });

    return () => animation.stop();
  }, [pathIndex]);
  const [move, setMove] = useState(false);
  return (
    <div className="example-container">
      <motion.div
        animate={{
          rotate: [0, 360, 360, 0, -360, -360, 0],
          scale: [1, 2, 2, 1, 1],
          borderRadius: ["20%", "20%", "50%", "50%", "20%"],
        }}
        transition={{ repeat: Infinity, duration: 1 }}
      >
        {" "}
      </motion.div>
    </div>
  );
};

const SystemHome = () => {
  const subLang = useSelector((state) => state.lang.SystemHome);
  const account = useSelector((state) => state.user.account);
  return (
    <div className="container-fluid">
      {account.role === roles.AGENCY && <AgencyStatistic />}
      {account.role === roles.ADMIN && <AdminStatistic />}
      {account.role === roles.FACTORY && <OtherStatic />}
      {account.role === roles.MAINTERNANCE && <OtherStatic />}
    </div>
  );
};

export default SystemHome;
