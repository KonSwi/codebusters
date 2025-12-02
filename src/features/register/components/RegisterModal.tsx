"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/shared/components/Button";

type Props = {
  email: string;
  onClose: () => void;
};

export const RegisterModal: React.FC<Props> = ({ email, onClose }) => {
  const t = useTranslations("register.modal");

  return (
    <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-dark/80">
      <div onClick={(e) => e.stopPropagation()} className="flex flex-col bg-gray text-center shadow-[0_0_10px_0_#00000099] w-175 h-69.5 rounded-lg p-8 gap-8 opacity-100 items-center">
        <h2 className="text-articleBigFont font-extralight">{t("title")}</h2>
        <p className="text-formFont font-medium">{t("body", { email })}</p>
        <p className="text-formFont font-medium">{t("failure")}</p>
        <Button variant="blue" className="px-6 py-2 w-80" disabled>{t("resend")}</Button>
      </div>
    </div>
  );
};
