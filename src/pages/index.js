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

const Page = ({ stats }) => {
  console.log({ stats });

  const topDappSignups = stats.topDapps.reduce((acc, d) => {
    return acc + +d.count;
  }, 0);

  const topDapps = stats.topDapps.map((d) => ({
    ...d,
    percentage: (d.count / topDappSignups) * 100,
  }));

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
              <OverviewBudget
                difference={12}
                positive
                sx={{ height: "100%" }}
                value={stats.dapps.total}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalCustomers
                difference={16}
                positive={false}
                sx={{ height: "100%" }}
                value={stats.users.total}
              />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTasksProgress sx={{ height: "100%" }} value={stats.users.total} />
            </Grid>
            <Grid xs={12} sm={6} lg={3}>
              <OverviewTotalProfit sx={{ height: "100%" }} value={`$${stats.amount.total}`} />
            </Grid>
            <Grid xs={12} lg={8}>
              <OverviewSales
                chartSeries={[
                  {
                    name: "This year",
                    data: [12, 16, 5, 8, 5, 14, 14, 16, 17, 15, 18, 20],
                  },
                ]}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewTraffic
                chartSeries={topDapps.map((d) => +d.percentage.toFixed(2))}
                labels={topDapps.map((d) => d.dapp_name)}
                sx={{ height: "100%" }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <OverviewLatestProducts topDapps={topDapps} sx={{ height: "100%" }} />
            </Grid>
            <Grid xs={12} md={12} lg={8}>
              <OverviewLatestOrders latestEmails={stats.latestEmails} sx={{ height: "100%" }} />
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
