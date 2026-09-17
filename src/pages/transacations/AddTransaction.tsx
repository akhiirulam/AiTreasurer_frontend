import { useState } from "react";
import {
  ArrowLeft,
  Upload,
  X,
  Sparkles,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import createTransactionApi from "../../services/transaction.api";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) return;

    setFile(selectedFile);
    setError("");
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!text.trim()) {
      setError("Please describe the transaction.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const result = await createTransactionApi.createTransaction({
        text: text.trim(),
        file,
      });

      console.log("Transaction created:", result);

      navigate("/owner/dashboard");
    } catch (error) {
      console.error("Failed to create transaction:", error);

      setError(
        "Unable to process the transaction. Please check your details and try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return <Upload size={19} />;

    if (file.type === "application/pdf") {
      return <FileText size={19} />;
    }

    return <ImageIcon size={19} />;
  };

  return (
    <div className="min-h-screen w-full bg-[#f5f7f2] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#dce5da] bg-white text-[#173f35] transition hover:bg-[#e4f2de]"
            aria-label="Go back"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#238636]">
              Bookkeeping
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#17231f] sm:text-4xl">
              Add Transaction
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#68736c]">
              Describe what happened in your business and let AI turn it into an
              accounting transaction.
            </p>
          </div>
        </div>

        {/* Main Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-[#dce5da] bg-white p-5 shadow-sm sm:p-8"
        >
          {/* Transaction Details */}
          <div>
            <div className="mb-3 flex items-center justify-between gap-4">
              <label
                htmlFor="transaction"
                className="text-sm font-semibold text-[#17231f]"
              >
                Transaction details
              </label>

              <span className="rounded-full bg-[#e4f2de] px-3 py-1 text-[11px] font-semibold text-[#173f35]">
                AI Powered
              </span>
            </div>

            <textarea
              id="transaction"
              value={text}
              onChange={(e) => {
                setText(e.target.value);
                if (error) setError("");
              }}
              placeholder="Example: Bought 10 bags of rice from ABC Traders for ₹25,000"
              rows={7}
              required
              className="w-full resize-none rounded-2xl border border-[#dce5da] bg-[#f9fbf7] px-5 py-4 text-sm leading-6 text-[#17231f] outline-none transition placeholder:text-[#68736c]/70 focus:border-[#79c267] focus:bg-white focus:ring-4 focus:ring-[#e4f2de]"
            />

            <div className="mt-3 flex flex-col gap-2 text-xs text-[#68736c] sm:flex-row sm:items-center sm:justify-between">
              <p>Write naturally. You don't need to know accounting terms.</p>

              <p className="font-technical">{text.length} characters</p>
            </div>
          </div>

          {/* Attachment */}
          <div className="mt-8">
            <label className="mb-3 block text-sm font-semibold text-[#17231f]">
              Attachment{" "}
              <span className="font-normal text-[#68736c]">(optional)</span>
            </label>

            {!file ? (
              <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#dce5da] bg-[#f9fbf7] px-6 py-12 transition hover:border-[#79c267] hover:bg-[#e4f2de]/40">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#173f35] text-white transition group-hover:scale-105">
                  <Upload size={20} />
                </div>

                <p className="text-sm font-semibold text-[#173f35]">
                  Upload a bill or photo
                </p>

                <p className="mt-2 text-xs text-[#68736c]">
                  PNG, JPG, JPEG or PDF
                </p>

                <p className="mt-1 text-[11px] text-[#68736c]">
                  One attachment per transaction
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between rounded-2xl border border-[#dce5da] bg-[#f9fbf7] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
                    {getFileIcon()}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#17231f]">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-[#68736c]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#68736c] transition hover:bg-[#fbe7e7] hover:text-[#c43d3d]"
                  aria-label="Remove attachment"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="mt-6 rounded-xl border border-[#f0caca] bg-[#fbe7e7] px-4 py-3 text-sm text-[#c43d3d]">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#dce5da] pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              disabled={loading}
              className="rounded-xl border border-[#dce5da] bg-white px-6 py-3 text-sm font-semibold text-[#173f35] transition hover:bg-[#f5f7f2] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#173f35] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#102e27] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Sparkles size={17} />

              {loading ? "Processing..." : "Process Transaction"}
            </button>
          </div>
        </form>

        {/* AI Information */}
        <div className="mt-6 overflow-hidden rounded-3xl bg-[#173f35] p-6 text-white sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e4f2de] text-[#173f35]">
              <Sparkles size={20} />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#79c267]">
                AI Bookkeeping
              </p>

              <h2 className="mt-2 text-xl font-bold">
                Just describe what happened.
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/65">
                For example, write “Bought stationery for ₹2,500 from Raj
                Traders.” AI can identify the transaction type, amount, customer
                or supplier, and appropriate accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
