import { useEffect, useMemo, useState } from "react";
import MYFIRSTCOMPONENT from "./MYFIRSTCOMPONENT.jsx";
import "./side.css";

export default function Side() {
  const [showModal, setShowModal] = useState(false);

  const [formInput, setFormInput] = useState({
    name: "",
    countryCode: "+1",
    phonenumber: "",
    age: "",
    employed: false,
    salaryrange: "",
    loanAmount: 1000,
  });

  const countries = [
    { name: "USA", code: "+1", flag: "🇺🇸" },
    { name: "UK", code: "+44", flag: "🇬🇧" },
    { name: "France", code: "+33", flag: "🇫🇷" },
    { name: "Germany", code: "+49", flag: "🇩🇪" },
    { name: "India", code: "+91", flag: "🇮🇳" },
    { name: "Algeria", code: "+213", flag: "🇩🇿" },
    { name: "Pakistan", code: "+92", flag: "🇵🇰" },
    { name: "UAE", code: "+971", flag: "🇦🇪" },
  ];

  const updateField = (field, value) => {
    setFormInput((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const phoneIsValid = /^\d{6,15}$/.test(formInput.phonenumber);

  const formProgress = useMemo(() => {
    let completed = 0;

    if (formInput.name.trim()) completed += 20;
    if (phoneIsValid) completed += 20;
    if (formInput.age) completed += 20;
    if (formInput.salaryrange) completed += 20;
    if (Number(formInput.loanAmount) > 0) completed += 20;

    return completed;
  }, [formInput, phoneIsValid]);

  const isDisabled =
    !formInput.name.trim() ||
    !phoneIsValid ||
    !formInput.age ||
    Number(formInput.age) < 18 ||
    Number(formInput.age) > 100;

  const interestRate = formInput.employed ? 5 : 8;

  const monthlyPayment = (
    (Number(formInput.loanAmount) * (1 + interestRate / 100)) /
    12
  ).toFixed(2);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (isDisabled) return;

    setShowModal(true);
  };

  return (
    <main className="loan-page">
      <section className="loan-card">

        {/* Header */}
        <header className="loan-header">
          <div>
            <span className="eyebrow">FINANCIAL SERVICES</span>

            <h1>Loan Request</h1>

            <p>
              Tell us a little about yourself and the loan you need.
            </p>
          </div>

          <div className="loan-icon" aria-hidden="true">
            $
          </div>
        </header>

        {/* Progress */}
        <div className="progress-section">
          <div className="progress-info">
            <span>Application progress</span>
            <strong>{formProgress}%</strong>
          </div>

          <div
            className="progress-bar"
            role="progressbar"
            aria-valuenow={formProgress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div
              className="progress-fill"
              style={{ width: `${formProgress}%` }}
            />
          </div>

          <span className="progress-hint">
            {formProgress === 100
              ? "Everything looks good!"
              : "Complete the required information to continue."}
          </span>
        </div>

        <form onSubmit={handleSubmit} className="loan-form">

          {/* Personal Information */}
          <section className="form-section">
            <div className="section-heading">
              <div className="section-number">01</div>

              <div>
                <h2>Personal information</h2>
                <p>Let's start with some basic details.</p>
              </div>
            </div>

            {/* Name */}
            <div className="field">
              <label htmlFor="name">
                Full Name <span>*</span>
              </label>

              <input
                id="name"
                type="text"
                value={formInput.name}
                onChange={(e) => updateField("name", e.target.value)}
                placeholder="e.g. John Smith"
                autoComplete="name"
              />
            </div>

            {/* Phone */}
            <div className="field">
              <label htmlFor="phone">
                Phone Number <span>*</span>
              </label>

              <div className="phone-input-group">
                <select
                  aria-label="Country code"
                  value={formInput.countryCode}
                  onChange={(e) =>
                    updateField("countryCode", e.target.value)
                  }
                >
                  {countries.map((country) => (
                    <option
                      key={country.code}
                      value={country.code}
                    >
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>

                <input
                  id="phone"
                  type="tel"
                  inputMode="numeric"
                  value={formInput.phonenumber}
                  onChange={(e) =>
                    updateField(
                      "phonenumber",
                      e.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Enter phone number"
                  autoComplete="tel"
                />
              </div>

              {formInput.phonenumber && !phoneIsValid && (
                <span className="error-text">
                  Please enter between 6 and 15 digits.
                </span>
              )}
            </div>

            {/* Age */}
            <div className="field">
              <label htmlFor="age">
                Age <span>*</span>
              </label>

              <input
                id="age"
                type="number"
                min="18"
                max="100"
                value={formInput.age}
                onChange={(e) => updateField("age", e.target.value)}
                placeholder="Enter your age"
              />

              {formInput.age &&
                (Number(formInput.age) < 18 ||
                  Number(formInput.age) > 100) && (
                  <span className="error-text">
                    Age must be between 18 and 100.
                  </span>
                )}
            </div>
          </section>

          {/* Employment */}
          <section className="form-section">
            <div className="section-heading">
              <div className="section-number">02</div>

              <div>
                <h2>Employment</h2>
                <p>This helps us estimate your interest rate.</p>
              </div>
            </div>

            <div className="employment-card">
              <div className="employment-content">
                <span className="employment-icon">💼</span>

                <div>
                  <strong>Are you currently employed?</strong>
                  <p>
                    {formInput.employed
                      ? "You'll receive our lower estimated rate."
                      : "Your standard estimated rate will apply."}
                  </p>
                </div>
              </div>

              <label className="switch">
                <input
                  type="checkbox"
                  checked={formInput.employed}
                  onChange={(e) =>
                    updateField("employed", e.target.checked)
                  }
                />

                <span className="slider" />
              </label>
            </div>

            <div className="field">
              <label htmlFor="salary">
                Salary Range
              </label>

              <select
                id="salary"
                value={formInput.salaryrange}
                onChange={(e) =>
                  updateField("salaryrange", e.target.value)
                }
              >
                <option value="">Select your salary range</option>
                <option value="less-500">Less than $500</option>
                <option value="500-1000">$500 – $1,000</option>
                <option value="more-1000">More than $1,000</option>
              </select>
            </div>
          </section>

          {/* Loan Details */}
          <section className="form-section">
            <div className="section-heading">
              <div className="section-number">03</div>

              <div>
                <h2>Loan details</h2>
                <p>Choose the amount you'd like to request.</p>
              </div>
            </div>

            <div className="amount-header">
              <div>
                <span>Requested amount</span>

                <strong>
                  ${Number(formInput.loanAmount).toLocaleString()}
                </strong>
              </div>

              <span className="rate-badge">
                {interestRate}% estimated rate
              </span>
            </div>

            <input
              className="loan-range"
              type="range"
              min="500"
              max="10000"
              step="500"
              value={formInput.loanAmount}
              onChange={(e) =>
                updateField("loanAmount", Number(e.target.value))
              }
            />

            <div className="range-labels">
              <span>$500</span>
              <span>$10,000</span>
            </div>

            {/* Loan summary */}
            <div className="loan-summary">
              <div className="summary-item">
                <span>Loan amount</span>
                <strong>
                  ${Number(formInput.loanAmount).toLocaleString()}
                </strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-item">
                <span>Interest rate</span>
                <strong>{interestRate}%</strong>
              </div>

              <div className="summary-divider" />

              <div className="summary-item highlight">
                <span>Est. monthly payment</span>
                <strong>${monthlyPayment}</strong>
              </div>
            </div>

            <p className="disclaimer">
              This is an estimate only. Your final rate and payment may
              vary depending on your application.
            </p>
          </section>

          {/* Submit */}
          <button
            type="submit"
            disabled={isDisabled}
            className="submit-button"
          >
            <span>
              {isDisabled ? "Complete required fields" : "Submit Request"}
            </span>

            {!isDisabled && <span className="arrow">→</span>}
          </button>

          <p className="secure-note">
            🔒 Your information is securely protected.
          </p>
        </form>
      </section>

      <MYFIRSTCOMPONENT
        isVisible={showModal}
        onClose={() => setShowModal(false)}
      />
    </main>
  );
}
