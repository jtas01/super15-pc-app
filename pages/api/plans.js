import { razorpay } from "@/helper/backend.helper";

export default async function plans(req, res) {
  if (req.method === "OPTIONS") return res.status(200).json({});

  return new Promise(async (resolve) => {
    const response = await razorpay.plans.all();

    res.status(200).json(response?.items || []);
    resolve();
  });
}
