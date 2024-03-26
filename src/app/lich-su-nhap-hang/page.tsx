import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import TableImportHistory from '@/components/import-history';

export const metadata: Metadata = {
  title: "Next.js Calender | TailAdmin - Next.js Dashboard Template",
  description:
    "This is Next.js Calender page for TailAdmin  Tailwind CSS Admin Dashboard Template",
};

const ImportProductHistory = () => {
  return (
    <DefaultLayout>
      <TableImportHistory />
    </DefaultLayout>
  );
};

export default ImportProductHistory;
