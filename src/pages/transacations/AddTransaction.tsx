import { useState } from "react";
import { ArrowLeft, Upload, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import createTransactionApi from "../../services/transaction.api";

const AddTransaction = () => {
  const navigate = useNavigate();

  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!text.trim()) return;

    try {
      setLoading(true);

      const result = await createTransactionApi.createTransaction({
        text,
        file,
      });

      console.log("Transaction created:", result);

      navigate("/dashboard");
    } catch (error) {
      console.error("Failed to create transaction:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen w-full bg-[#f3ffc1] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto w-full max-w-4xl">
        {/* Header */}
        <div className="mb-8 flex items-start gap-4">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#292727] text-white transition hover:bg-black"
          >
            <ArrowLeft size={19} />
          </button>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#526040]">
              Bookkeeping
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              Add Transaction
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#43506b]">
              Record a business transaction by describing it or uploading a bill
              or photo.
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-black bg-[#f3ffc1] p-5 sm:p-8"
        >
          {/* Transaction */}
          <div className="mb-8">
            <label
              htmlFor="transaction"
              className="mb-3 block text-sm font-bold text-[#292727]"
            >
              Transaction details
            </label>

            <textarea
              id="transaction"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Example: Bought 10 bags of rice from ABC Traders for ₹25,000"
              rows={7}
              required
              className="w-full resize-none rounded-2xl border border-black bg-[#f3ffc1] px-5 py-4 text-sm text-[#111827] outline-none placeholder:text-[#526040]/60 transition focus:border-[#292727] focus:ring-1 focus:ring-[#292727]"
            />

            <p className="mt-2 text-xs text-[#526040]">
              You can write naturally. AI will understand and categorize the
              transaction.
            </p>
          </div>

          {/* Attachment */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-bold text-[#292727]">
              Attachment
              <span className="ml-1 font-normal text-[#526040]">
                (optional)
              </span>
            </label>

            {!file ? (
              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-black/15 px-6 py-12 transition hover:border-[#292727] hover:bg-black/[0.02]">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#292727] text-white">
                  <Upload size={21} />
                </div>

                <p className="text-sm font-bold text-[#292727]">
                  Upload a bill or photo
                </p>

                <p className="mt-2 text-xs text-[#526040]">
                  PNG, JPG, JPEG or PDF
                </p>

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/jpg,application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-black/[0.03] p-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#292727] text-white">
                    <Upload size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-[#292727]">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-[#526040]">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="ml-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#526040] transition hover:bg-black/10 hover:text-black"
                >
                  <X size={18} />
                </button>
              </div>
            )}
          </div>

          {/* Submit */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="rounded-xl border border-black/15 px-6 py-3 text-sm font-semibold text-[#292727] transition hover:bg-black/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#292727] px-7 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Processing..." : "Submit Transaction"}
            </button>
          </div>
        </form>

        {/* AI Information */}
        <div className="mt-6 rounded-3xl bg-[#292727] p-6 text-white sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ffc1]">
            AI Bookkeeping
          </p>

          <h2 className="mt-3 text-xl font-bold">
            Just describe what happened.
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
            For example, write "Bought stationery for ₹2,500 from Raj Traders."
            AI can identify the transaction, amount, party and transaction type.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
