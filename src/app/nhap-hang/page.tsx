import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import InputProduct from '@/components/InputProduct';

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const InputProductScreen = () => {
  return (
    <DefaultLayout>
      <InputProduct />
    </DefaultLayout>
  );
};

export default InputProductScreen;
