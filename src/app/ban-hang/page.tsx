import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import SellProduct from '@/components/Sell-product';

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const SellProductScreen = () => {
  return (
    <DefaultLayout>
      <SellProduct />
    </DefaultLayout>
  );
};

export default SellProductScreen;
