import clientPromise from "@/lib/mongodb";
import { Product } from "@/models/Product";


export default async function handler(req, res) {
  await clientPromise();
  
  if (req.method === 'GET') {
    try {
      // Fetch products from the database
      const products = await Product.find({}).lean();

      // Implement your recommendation logic here.
      // This example simply returns the first 3 products as recommendations.
      const recommendations = products.slice(0, 3);
      return res.status(200).json(recommendations);
    } catch (error) {
      console.error('Error fetching products:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    // Handle other HTTP methods or return an error
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
