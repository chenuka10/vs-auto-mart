"use client";

import { useState, useTransition } from "react";
import {
  sellerInfoSchema,
  vehicleInfoSchema,
  vehicleDetailsSchema,
  photosSchema,
} from "@/lib/validation/sell-car";
import { submitSellCarForm } from "@/lib/sell-car/submit";
import StepIndicator from "./StepIndicator";
import SellerInformationStep from "./steps/SellerInformationStep";
import VehicleInformationStep from "./steps/VehicleInformationStep";
import VehicleDetailsStep from "./steps/VehicleDetailsStep";
import PhotoUploadStep from "./steps/PhotoUploadStep";
import ReviewStep from "./steps/ReviewStep";
import SubmissionSuccess from "./SubmissionSuccess";
import { ZodError } from "zod";

export interface SellCarFormState {
  seller_name: string;
  seller_phone: string;
  seller_whatsapp: string;
  seller_email: string;

  vehicle_make: string;
  vehicle_model: string;
  vehicle_year: string;
  registration_number: string;
  mileage: string;
  fuel_type: "" | "petrol" | "diesel" | "hybrid" | "electric" | "other";
  transmission: "" | "automatic" | "manual" | "amt" | "cvt" | "other";

  colour: string;
  engine_capacity: string;
  owners_count: string;
  condition: "" | "excellent" | "good" | "fair" | "needs_repairs";
  asking_price: string;
  description: string;

  photo_urls: string[];
}

const EMPTY_STATE: SellCarFormState = {
  seller_name: "",
  seller_phone: "",
  seller_whatsapp: "",
  seller_email: "",
  vehicle_make: "",
  vehicle_model: "",
  vehicle_year: "",
  registration_number: "",
  mileage: "",
  fuel_type: "",
  transmission: "",
  colour: "",
  engine_capacity: "",
  owners_count: "",
  condition: "",
  asking_price: "",
  description: "",
  photo_urls: [],
};

const TOTAL_STEPS = 5;


function collectZodErrors(error: ZodError) {
  const errors: Record<string, string> = {};

  for (const issue of error.issues) {
    const key = issue.path[0]?.toString() ?? "form";

    if (!errors[key]) {
      errors[key] = issue.message;
    }
  }

  return errors;
}

export default function SellCarForm() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<SellCarFormState>(EMPTY_STATE);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [referenceNumber, setReferenceNumber] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function patch(update: Partial<SellCarFormState>) {
    setData((prev) => ({ ...prev, ...update }));
  }

  function validateStep(currentStep: number): boolean {
    let result;
    if (currentStep === 1) {
      result = sellerInfoSchema.safeParse(data);
    } else if (currentStep === 2) {
      result = vehicleInfoSchema.safeParse(data);
    } else if (currentStep === 3) {
      result = vehicleDetailsSchema.safeParse(data);
    } else if (currentStep === 4) {
      result = photosSchema.safeParse(data.photo_urls);
      if (!result.success) {
        setErrors({ photo_urls: result.error.issues[0]?.message ?? "Add at least one photo." });
        return false;
      }
      setErrors({});
      return true;
    } else {
      return true;
    }

    if (!result.success) {
      setErrors(collectZodErrors(result.error));
      return false;
    }
    setErrors({});
    return true;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function goBack() {
    setErrors({});
    setStep((s) => Math.max(1, s - 1));
  }

  function handleSubmit() {
    setFormError(null);
    if (!consent) {
      setErrors({ consent_given: "You must agree before submitting." });
      return;
    }

    startTransition(async () => {
      const result = await submitSellCarForm({ ...data, consent_given: consent });
      if (result.success && result.referenceNumber) {
        setReferenceNumber(result.referenceNumber);
      } else {
        if (result.fieldErrors) setErrors(result.fieldErrors);
        setFormError(result.formError ?? "We couldn't submit your request. Please try again.");
      }
    });
  }

  if (referenceNumber) {
    return <SubmissionSuccess referenceNumber={referenceNumber} />;
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="sticky top-16 z-10 -mx-6 border-b border-graphite-700/20 bg-graphite-950/90 px-6 py-4 backdrop-blur-xl sm:static sm:mx-0 sm:border-none sm:bg-transparent sm:p-0 sm:pb-6">
        <StepIndicator current={step} />
      </div>

      <div className="glass-panel mt-6 rounded-[20px] p-5 sm:p-6">
        {step === 1 && <SellerInformationStep data={data} errors={errors} onChange={patch} />}
        {step === 2 && <VehicleInformationStep data={data} errors={errors} onChange={patch} />}
        {step === 3 && <VehicleDetailsStep data={data} errors={errors} onChange={patch} />}
        {step === 4 && <PhotoUploadStep data={data} errors={errors} onChange={patch} />}
        {step === 5 && (
          <ReviewStep
            data={data}
            consent={consent}
            onConsentChange={setConsent}
            consentError={errors.consent_given}
          />
        )}
      </div>

      {formError && (
        <p className="mt-4 rounded-plate border border-rose-500/20 bg-rose-500/10 px-4 py-3 text-sm font-medium text-rose-300">
          {formError}
        </p>
      )}

      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 1 || isPending}
          className="rounded-plate border border-graphite-700/40 px-5 py-2.5 text-sm font-semibold text-graphite-200 transition-colors hover:bg-graphite-800/50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Back
        </button>

        {step < TOTAL_STEPS ? (
          <button
            type="button"
            onClick={goNext}
            className="rounded-plate bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="rounded-plate bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-graphite-950 transition-all hover:shadow-glow-gold hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? "Submitting…" : "Submit Vehicle"}
          </button>
        )}
      </div>
    </div>
  );
}
