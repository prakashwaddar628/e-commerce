import prisma from "@/libs/prismadb";
import moment from "moment";

export default async function getGraphData() {
  try {
    // get the start and end dates for the data range(7 days ago to today)

    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    // query the databse to get ordre data grouped by createdate
    const result = await prisma.order.groupBy({
      by: ["createDate"],
      where: {
        createDate: {
          gte: startDate.toISOString(),
          lte: endDate.toISOString(),
        },
        status: "complete",
      },
      _sum: {
        amount: true,
      },
    });

    // initialize on object to aggregate the data by day
    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    // create a clone of the start date to itrate over each day
    const currentDate = startDate.clone();

    // inerate over each day in the date range
    while (currentDate <= endDate) {
      // format the day as string
      const day = currentDate.format("dddd");
      console.log("day<<<", day, currentDate);

      // initialize the aggregated data for the day with the day date and totalAmount
      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      // move to the next day
      currentDate.add(1, "days");
    }

    // calculate the total amount for each day by asuming the order amounts
    result.forEach((entry) => {
      const day = moment(entry.createDate).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount += amount;
    });

    // convert the aggregated data object to an array and sort it by date
    const formattedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formattedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
