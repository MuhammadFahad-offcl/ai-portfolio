"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buildWhatsAppLink, packages, siteContent } from "@/content/site";

const formatPKR = (value: number) =>
  new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency: "PKR",
    maximumFractionDigits: 0,
  }).format(value);

function AnimatedCurrency({ value }: { value: number }) {
  const formattedValue = formatPKR(value);
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      key={formattedValue}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      {formattedValue}
    </motion.span>
  );
}

export default function RoiCalculator() {
  const [hoursPerWeek, setHoursPerWeek] = useState(40);
  const [hourlyWage, setHourlyWage] = useState(500);
  const [clientUrl, setClientUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const annualWastedCost = hoursPerWeek * hourlyWage * 52;
  const estimatedAiSavings = annualWastedCost * siteContent.roi.savingsMultiplier;
  const parsePrice = (value: string | undefined) =>
    !value || value.includes("{{")
      ? Number.NaN
      : Number(value.replace(/[^\d.]/g, ""));
  const growthPackage = packages.find((packageItem) => packageItem.id === "growth");
  const growthSetup = parsePrice(growthPackage?.setupFee);
  const growthMonthly = parsePrice(growthPackage?.monthlyFee);
  const weeklyNetSavings = estimatedAiSavings / 52 - (growthMonthly * 12) / 52;
  const paybackWeeks =
    Number.isFinite(growthSetup) &&
    Number.isFinite(growthMonthly) &&
    weeklyNetSavings > 0
      ? Math.ceil(growthSetup / weeklyNetSavings)
      : null;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSuccess(false);
    setSubmitError("");

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(clientUrl.trim());
      if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
        throw new Error(siteContent.roi.errorProtocol);
      }
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message === siteContent.roi.errorProtocol
          ? error.message
          : siteContent.roi.errorRequired,
      );
      return;
    }

    setIsSubmitting(true);
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
      if (!webhookUrl) {
        throw new Error(siteContent.roi.errorWebhook);
      }

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: parsedUrl.toString(),
          currentWastedCost: annualWastedCost,
          potentialSavings: estimatedAiSavings,
        }),
      });

      if (!response.ok) {
        throw new Error(`The audit request could not be sent (HTTP ${response.status}).`);
      }

      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : siteContent.roi.errorResponse,
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 text-slate-900 sm:p-7 md:p-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
          {siteContent.roi.eyebrow}
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-slate-900 sm:text-2xl">
          {siteContent.roi.calculatorTitle}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {siteContent.roi.calculatorDescription}
        </p>
      </div>

      <p className="mt-2 text-xs text-slate-500">
        {siteContent.roi.assumption}
      </p>

      <div className="mt-6 space-y-6">
        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="hours-per-week" className="text-sm font-medium text-slate-700">
              {siteContent.roi.hoursLabel}
            </label>
            <span className="text-sm font-semibold tabular-nums text-blue-700">
              {hoursPerWeek} {siteContent.roi.hoursUnit}
            </span>
          </div>
          <input
            id="hours-per-week"
            type="range"
            min={5}
            max={200}
            step={1}
            value={hoursPerWeek}
            onChange={(event) => setHoursPerWeek(Number(event.target.value))}
            className="w-full cursor-pointer accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-400">
            <span>{siteContent.roi.minHours}</span>
            <span>{siteContent.roi.maxHours}</span>
          </div>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between gap-4">
            <label htmlFor="hourly-wage" className="text-sm font-medium text-slate-700">
              {siteContent.roi.wageLabel}
            </label>
            <span className="text-sm font-semibold tabular-nums text-blue-700">
              {formatPKR(hourlyWage)}/hr
            </span>
          </div>
          <input
            id="hourly-wage"
            type="range"
            min={100}
            max={5000}
            step={50}
            value={hourlyWage}
            onChange={(event) => setHourlyWage(Number(event.target.value))}
            className="w-full cursor-pointer accent-blue-700"
          />
          <div className="mt-1 flex justify-between text-xs text-slate-400">
            <span>{siteContent.roi.minWage}</span>
            <span>{siteContent.roi.maxWage}</span>
          </div>
        </div>
      </div>

      <div
        aria-live="polite"
        className="mt-6 grid grid-cols-1 gap-4 rounded-xl bg-slate-50 p-4 sm:grid-cols-2 sm:p-5"
      >
        <div className="rounded-lg bg-white p-3.5 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
          <p className="text-xs font-medium leading-5 text-slate-500">
            {siteContent.roi.wastedCostLabel}
          </p>
          <p className="mt-1 break-words text-xl font-bold tracking-tight text-blue-900 sm:text-2xl lg:text-3xl">
            <AnimatedCurrency value={annualWastedCost} />
          </p>
        </div>
        <div className="rounded-lg bg-white p-3.5 shadow-sm sm:bg-transparent sm:p-0 sm:shadow-none">
          <p className="text-xs font-medium leading-5 text-slate-500">
            {siteContent.roi.savingsLabel}
          </p>
          <p className="mt-1 break-words text-xl font-bold tracking-tight text-emerald-700 sm:text-2xl lg:text-3xl">
            <AnimatedCurrency value={estimatedAiSavings} />
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6" noValidate>
        <label htmlFor="website-url" className="sr-only">
          {siteContent.roi.websiteLabel}
        </label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <input
            id="website-url"
            type="url"
            required
            value={clientUrl}
            aria-invalid={Boolean(submitError)}
            aria-describedby={submitError ? "website-url-error" : undefined}
            onChange={(event) => {
              setClientUrl(event.target.value);
              setSubmitError("");
              setIsSuccess(false);
            }}
            placeholder={siteContent.roi.websitePlaceholder}
            className="min-h-12 w-full min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          />
          <button
            type="submit"
            disabled={isSubmitting || isSuccess}
            className={`min-h-12 w-full shrink-0 rounded-lg px-6 text-sm font-semibold text-white transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed sm:w-auto ${
              isSuccess
                ? "bg-blue-800"
                : "bg-blue-900 hover:bg-blue-800 disabled:opacity-70"
            }`}
          >
            {isSubmitting
              ? siteContent.roi.submittingLabel
              : isSuccess
                ? siteContent.roi.successLabel
                : siteContent.roi.submitLabel}
          </button>
        </div>
        {submitError && (
          <p id="website-url-error" role="alert" className="mt-3 text-sm text-red-700">
            {submitError}
          </p>
        )}
        {isSuccess && (
          <div role="status" className="mt-3 space-y-3 text-sm text-blue-800">
            <p>{siteContent.roi.successLabel}. {siteContent.roi.successDescription}</p>
            <a
              href={buildWhatsAppLink(
                siteContent.whatsapp.messages.roi
                  .replace("{{WEBSITE_URL}}", parsedUrlSafe(clientUrl))
                  .replace("{{WASTED_COST}}", formatPKR(annualWastedCost))
                  .replace("{{POTENTIAL_SAVINGS}}", formatPKR(estimatedAiSavings)),
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-green-600 px-4 font-semibold text-white hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800 sm:w-auto"
            >
              {siteContent.roi.whatsappFollowup}
            </a>
          </div>
        )}
        {paybackWeeks !== null ? (
          <p className="mt-4 text-xs text-slate-500">{siteContent.roi.paybackLabel.replace("{{N}}", String(paybackWeeks))}</p>
        ) : (
          <p className="mt-4 text-xs text-slate-500">{siteContent.roi.paybackUnavailable}</p>
        )}
      </form>
    </div>
  );
}

function parsedUrlSafe(value: string) {
  try {
    return new URL(value.trim()).toString();
  } catch {
    return value.trim();
  }
}
