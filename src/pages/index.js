import { useEffect, useState } from "react";
import Head from "next/head";
import { subDays, subHours } from "date-fns";
import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { OverviewBudget } from "src/sections/overview/overview-budget";
import { OverviewLatestOrders } from "src/sections/overview/overview-latest-orders";
import { OverviewLatestProducts } from "src/sections/overview/overview-latest-products";
import { OverviewSales } from "src/sections/overview/overview-sales";
import { OverviewTasksProgress } from "src/sections/overview/overview-tasks-progress";
import { OverviewTotalCustomers } from "src/sections/overview/overview-total-customers";
import { OverviewTotalProfit } from "src/sections/overview/overview-total-profit";
import { OverviewTraffic } from "src/sections/overview/overview-traffic";
import { api } from "src/utils/axios";
import moment from "moment";

const now = new Date();

const Page = ({ stats }) => {
  const [dapps, setDapps] = useState(0);
  const [users, setUsers] = useState(0);
  const [amount, setAmount] = useState(0);
  const [topDapps, setTopDapps] = useState([]);
  const [latestEmails, setLatestEmails] = useState([]);
  const [lineChartDateTime, setLineChartDateTime] = useState([]);
  const [lineChartRequest, setLineChartRequest] = useState([]);
  useEffect(() => {
    getStats();
  }, []);

  const getStats = async () => {
    setDapps(stats.dapps.total);
    setUsers(stats.users.total);
    setAmount(stats.amount.total);
    setLatestEmails(stats.latestEmails);
    setTopDapps(stats.topDapps);

    let _lineChartDateTime = [],
      _lineChartRequest = [];

    stats.latestEmails.map((email) => {
      let email_Date = email.created_at.split("T")[0];
      let email_hour = email.created_at.split("T")[1].split(":")[0];

      if (_lineChartDateTime.length > 0) {
        _lineChartDateTime.map((linedatetime, index) => {
          let linedatetime_Date = linedatetime.split("T")[0];
          let linedatetime_hour = linedatetime.split("T")[1].split(":")[0];

          if (email_Date === linedatetime_Date && email_hour === linedatetime_hour) {
            _lineChartRequest[index] += 1;
          } else {
            _lineChartRequest.push(0);
            _lineChartDateTime.push(email.created_at);
          }
        });
      } else {
        _lineChartRequest.push(0);
        _lineChartDateTime.push(email.created_at);
      }
    });
    setLineChartDateTime(_lineChartDateTime);
    setLineChartRequest(_lineChartRequest);
  };
  return (
    <>
      <Head>
        <title>Overview | Kresus</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={3}>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewBudget difference={12} positive sx={{ height: "100%" }} value={dapps} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={users}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={amount} />
            </Grid>
            {/* <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
            </Grid> */}
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This hour",
                    data: lineChartRequest,
                  },
                  {
                    name: "",
                    data: [],
                  },
                ]}
                sx={{ height: "100%" }}
                chartData={lineChartDateTime}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={topDapps.map((x) => {
                  return +x.count;
                })}
                labels={topDapps.map((x) => {
                  return x.dapp_name;
                })}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={3}>
              <OverviewLatestProducts products={topDapps} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={9}>
              <OverviewLatestOrders orders={latestEmails} sx={{ height: "100%" }} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

export const getServerSideProps = async () => {
  try {
    const { data } = await api.get("/dapp/stats");

    return {
      props: {
        stats: data,
      },
    };
  } catch (err) {
    console.error(err);
    return {
      notFound: true,
    };
  }
};
