import excuteQuery, { parseJson, razorpay } from "@/helper/backend.helper";
import { DB_TABLES, SUBSCRIBTION_STATUS } from "@/helper/constants.helper";

// https://www.freecodecamp.org/news/integrate-a-payment-gateway-in-next-js-and-react-with-razorpay-and-tailwindcss/

export default async function createSubscription(req, res) {
  // Initialize razorpay object

  if (req.method === "OPTIONS") return res.status(200).json({});
  const subscriptionData = parseJson(req.body);

  // Create a subscription -> generate the subscriptionID -> Send it to the Front-end
  const options = {
    // plan_id: subscriptionData?.planId,
    amount: subscriptionData?.amount,
    currency: "INR",
  };

  const validTill = new Date();
  validTill.setDate(validTill.getDate() + subscriptionData?.noOfDays);
  const endDate = validTill.getTime() / 1000;

  try {
    const response = await razorpay.orders.create(options);

    const result = await excuteQuery({
      query: `INSERT INTO ${DB_TABLES?.subscriptions} (subscriptionId, userId, planId, status, endDate) VALUES (?, ?, ?, ?, ?)`,
      values: [
        response?.id,
        subscriptionData?.userId,
        subscriptionData?.planId,
        SUBSCRIBTION_STATUS?.initailized,
        endDate,
      ],
    });

    if (result?.error)
      return res.status(400).json({ error: "Something went wrong" });

    res.status(200).json({
      id: response.id,
      planId: response.plan_id,
      status: response.status,
      endAt: endDate,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
}

// export default async function createSubscription(req, res) {
//   // Initialize razorpay object

//   if (req.method === "OPTIONS") return res.status(200).json({});
//   const subscriptionData = parseJson(req.body);

//   // Create a subscription -> generate the subscriptionID -> Send it to the Front-end
//   const options = {
//     plan_id: subscriptionData?.planId,
//     total_count: 12,
//     quantity: 1,
//   };

//   try {
//     const response = await razorpay.subscriptions.create(options);

//     const result = await excuteQuery({
//       query: `INSERT INTO ${DB_TABLES?.subscriptions} (subscriptionId, userId, planId, status) VALUES (?, ?, ?, ?)`,
//       values: [
//         response?.id,
//         subscriptionData?.userId,
//         subscriptionData?.planId,
//         SUBSCRIBTION_STATUS?.initailized,
//       ],
//     });

//     if (result?.error)
//       return res.status(400).json({ error: "Something went wrong" });

//     res.status(200).json({
//       id: response.id,
//       planId: response.plan_id,
//       status: response.status,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(400).json({ error: err });
//   }
// }
